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

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const page = Math.max(1, Number(params.get("page") ?? 1));
  const pageSize = Math.min(100, Math.max(1, Number(params.get("pageSize") ?? 50)));
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
  const body = await request.json();

  if (!body.username) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }

  const values: Record<string, unknown> = { updatedAt: new Date().toISOString() };

  if (body.username !== undefined) values.username = body.username;
  if (body.platform !== undefined) values.platform = body.platform;
  if (body.current_slot !== undefined) values.currentSlot = body.current_slot;
  if (body.level !== undefined) values.level = body.level;
  if (body.gold !== undefined) values.gold = body.gold;
  if (body.gems !== undefined) values.gems = body.gems;
  if (body.prestige !== undefined) values.prestige = body.prestige;
  if (body.xp !== undefined) values.xp = body.xp;
  if (body.spins !== undefined) values.spins = body.spins;
  if (body.inventory_count !== undefined) values.inventoryCount = body.inventory_count;
  if (body.perks_count !== undefined) values.perksCount = body.perks_count;
  if (body.inventory !== undefined) values.inventory = typeof body.inventory === "string" ? body.inventory : JSON.stringify(body.inventory);
  if (body.perks !== undefined) values.perks = typeof body.perks === "string" ? body.perks : JSON.stringify(body.perks);
  if (body.note_tag !== undefined) values.noteTag = body.note_tag;
  if (body.is_online !== undefined) values.isOnline = body.is_online;
  if (body.last_seen !== undefined) values.lastSeen = body.last_seen;
  if (body.customised !== undefined) values.customised = body.customised;
  if (body.spins_used !== undefined) values.spinsUsed = body.spins_used;
  if (body.bought_spins !== undefined) values.boughtSpins = body.bought_spins;
  if (body.status !== undefined) values.status = body.status;
  if (body.family !== undefined) values.family = body.family;
  if (body.tutorial !== undefined) values.tutorial = body.tutorial;
  if (body.created !== undefined) values.createdAt = body.created;

  const existing = db
    .select({ username: accounts.username })
    .from(accounts)
    .where(eq(accounts.username, body.username))
    .get();

  if (existing) {
    db.update(accounts)
      .set(values)
      .where(eq(accounts.username, body.username))
      .run();
  } else {
    db.insert(accounts)
      .values({ ...values, createdAt: values.createdAt ?? new Date().toISOString() } as never)
      .run();
  }

  return NextResponse.json({ success: true, username: body.username });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  if (body.all === true) {
    const result = db.delete(accounts).run();
    return NextResponse.json({ deleted: result.changes });
  }

  if (Array.isArray(body.ids) && body.ids.length > 0) {
    const result = db
      .delete(accounts)
      .where(inArray(accounts.id, body.ids))
      .run();
    return NextResponse.json({ deleted: result.changes });
  }

  return NextResponse.json(
    { error: 'Send {"ids": [1,2,3]} to delete specific accounts or {"all": true} to delete all' },
    { status: 400 }
  );
}
