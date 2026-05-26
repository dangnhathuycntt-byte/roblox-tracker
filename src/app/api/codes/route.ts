import { db } from "@/db";
import { redeemCodes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const activeOnly = params.get("active") === "true";

  const conditions = [];
  if (activeOnly) {
    conditions.push(eq(redeemCodes.isActive, true));
  }

  const codes = db
    .select()
    .from(redeemCodes)
    .where(conditions.length > 0 ? conditions[0] : undefined)
    .orderBy(desc(redeemCodes.createdAt))
    .all();
    
  return NextResponse.json({ data: codes });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  if (!body.code || typeof body.code !== "string") {
    return NextResponse.json({ error: "code is required and must be a string" }, { status: 400 });
  }

  const values = {
    code: body.code,
    description: typeof body.description === "string" ? body.description : "",
    isActive: typeof body.isActive === "boolean" ? body.isActive : true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const result = db.insert(redeemCodes).values(values).returning().get();
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return NextResponse.json({ error: "code already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "failed to create code" }, { status: 500 });
  }
}
