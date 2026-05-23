import { db } from "@/db";
import { accounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const account = db
    .select()
    .from(accounts)
    .where(eq(accounts.username, username))
    .get();

  if (!account) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(account);
}
