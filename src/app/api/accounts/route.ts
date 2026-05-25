import { db } from "@/db";
import { accounts } from "@/db/schema";
import { count, sum, sql, like, eq, inArray, asc, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const SORTABLE_COLUMNS = {
  username: accounts.username,
  currentSlot: accounts.currentSlot,
  level: accounts.level,
  gold: accounts.gold,
  gems: accounts.gems,
  prestige: accounts.prestige,
  xp: accounts.xp,
  spins: accounts.spins,
  inventoryCount: accounts.inventoryCount,
  perksCount: accounts.perksCount,
} as const;

type SortKey = keyof typeof SORTABLE_COLUMNS;

function parseJson(input: unknown): string {
  if (typeof input === "string") return input;
  return JSON.stringify(input);
}

const SAFE_FIELDS = new Set([
  "username", "platform", "current_slot", "level", "gold", "gems",
  "prestige", "xp", "spins", "inventory_count", "perks_count",
  "inventory", "perks", "note_tag", "is_online", "last_seen",
  "customised", "spins_used", "bought_spins", "status", "family",
  "tutorial", "created",
]);

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const page = Math.max(1, Number(params.get("page") ?? 1));
  const pageSize = Math.min(10000, Math.max(1, Number(params.get("pageSize") ?? 50)));
  const sortBy = (params.get("sort") ?? "username") as SortKey;
  const order = params.get("order") === "desc" ? "desc" : "asc";
  const search = params.get("search") ?? "";
  const status = params.get("status");
  const family = params.get("family");

  const conditions = [];

  if (search) {
    conditions.push(like(accounts.username, `%${search}%`));
  }

  if (status === "online") {
    conditions.push(eq(accounts.isOnline, true));
  } else if (status === "offline") {
    conditions.push(eq(accounts.isOnline, false));
  }

  if (family) {
    conditions.push(eq(accounts.family, family));
  }

  const where = conditions.length > 0 ? sql`${sql.join(conditions, sql` AND `)}` : undefined;

  const sortColumn = SORTABLE_COLUMNS[sortBy] ?? accounts.username;
  const orderFn = order === "desc" ? desc(sortColumn) : asc(sortColumn);

  const data = db
    .select()
    .from(accounts)
    .where(where)
    .orderBy(orderFn)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .all();

  const totalRow = db
    .select({ total: count() })
    .from(accounts)
    .where(where)
    .get();

  const stats = db
    .select({
      totalAccounts: count(),
      onlineCount: count(sql`CASE WHEN ${accounts.isOnline} = 1 THEN 1 END`),
      totalGold: sum(accounts.gold),
      totalGems: sum(accounts.gems),
      totalPrestige: sum(accounts.prestige),
      totalXp: sum(accounts.xp),
      totalSpins: sum(accounts.spins),
      totalPerks: sum(accounts.perksCount),
      totalInventory: sum(accounts.inventoryCount),
    })
    .from(accounts)
    .get()!;

  return NextResponse.json({
    data,
    pagination: {
      page,
      pageSize,
      total: totalRow!.total,
      totalPages: Math.ceil(totalRow!.total / pageSize),
    },
    stats: {
      totalAccounts: stats.totalAccounts,
      onlineCount: stats.onlineCount,
      totalGold: Number(stats.totalGold ?? 0),
      totalGems: Number(stats.totalGems ?? 0),
      totalPrestige: Number(stats.totalPrestige ?? 0),
      totalXp: Number(stats.totalXp ?? 0),
      totalSpins: Number(stats.totalSpins ?? 0),
      totalPerks: Number(stats.totalPerks ?? 0),
      totalInventory: Number(stats.totalInventory ?? 0),
    },
  });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  if (!body.username || typeof body.username !== "string") {
    return NextResponse.json({ error: "username is required and must be a string" }, { status: 400 });
  }

  const values: Record<string, unknown> = { updatedAt: new Date().toISOString() };

  for (const [key, val] of Object.entries(body)) {
    if (!SAFE_FIELDS.has(key)) continue;

    switch (key) {
      case "inventory":
      case "perks":
        values[key === "inventory" ? "inventory" : "perks"] = parseJson(val);
        break;
      case "created":
        values.createdAt = val;
        break;
      case "current_slot":
        values.currentSlot = val;
        break;
      case "inventory_count":
        values.inventoryCount = val;
        break;
      case "perks_count":
        values.perksCount = val;
        break;
      case "note_tag":
        values.noteTag = val;
        break;
      case "is_online":
        values.isOnline = val;
        break;
      case "last_seen":
        values.lastSeen = val;
        break;
      case "spins_used":
        values.spinsUsed = val;
        break;
      case "bought_spins":
        values.boughtSpins = val;
        break;
      default:
        values[key] = val;
    }
  }

  const existing = db
    .select({ id: accounts.id })
    .from(accounts)
    .where(eq(accounts.username, body.username as string))
    .get();

  if (existing) {
    db.update(accounts)
      .set(values)
      .where(eq(accounts.username, body.username as string))
      .run();
  } else {
    values.createdAt = values.createdAt ?? new Date().toISOString();
    db.insert(accounts).values(values as never).run();
  }

  return NextResponse.json({ success: true, username: body.username });
}

export async function DELETE(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  if (body.all === true) {
    if (body.confirm !== "yes-delete-all") {
      return NextResponse.json(
        { error: 'must send {"all": true, "confirm": "yes-delete-all"} to delete all accounts' },
        { status: 400 }
      );
    }
    const result = db.delete(accounts).run();
    return NextResponse.json({ deleted: result.changes });
  }

  if (Array.isArray(body.ids) && body.ids.length > 0) {
    const ids = body.ids.filter((id): id is number => typeof id === "number" && Number.isFinite(id));
    if (ids.length === 0) {
      return NextResponse.json({ error: "ids must be an array of valid numbers" }, { status: 400 });
    }
    const result = db
      .delete(accounts)
      .where(inArray(accounts.id, ids))
      .run();
    return NextResponse.json({ deleted: result.changes });
  }

  return NextResponse.json(
    { error: 'Send {"ids": [1,2,3]} to delete specific accounts or {"all": true, "confirm": "yes-delete-all"} to delete all' },
    { status: 400 }
  );
}
