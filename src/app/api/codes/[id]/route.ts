import { db } from "@/db";
import { redeemCodes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  const values: Partial<typeof redeemCodes.$inferInsert> = {
    updatedAt: new Date().toISOString(),
  };

  if (typeof body.code === "string") values.code = body.code;
  if (typeof body.description === "string") values.description = body.description;
  if (typeof body.isActive === "boolean") values.isActive = body.isActive;

  try {
    const result = db.update(redeemCodes).set(values).where(eq(redeemCodes.id, id)).returning().get();
    if (!result) return NextResponse.json({ error: "not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return NextResponse.json({ error: "code already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "failed to update code" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (isNaN(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const result = db.delete(redeemCodes).where(eq(redeemCodes.id, id)).returning().get();
  if (!result) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
