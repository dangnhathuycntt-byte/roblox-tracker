import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export type InventoryItem = {
  name: string;
  quantity: number;
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary" | "Mythic";
  imageUrl?: string;
};

export type PerkItem = {
  name: string;
  level: number;
};

export const accounts = sqliteTable("accounts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username", { length: 64 }).notNull().unique(),
  platform: text("platform", { length: 16 }).default("Pc").notNull(),
  currentSlot: text("current_slot", { enum: ["A", "B", "C", "D", "E"] })
    .default("A")
    .notNull(),
  level: integer("level").default(0).notNull(),
  gold: integer("gold").default(0).notNull(),
  gems: integer("gems").default(0).notNull(),
  prestige: integer("prestige").default(0).notNull(),
  xp: integer("xp").default(0).notNull(),
  spins: integer("spins").default(0).notNull(),
  inventoryCount: integer("inventory_count").default(0).notNull(),
  perksCount: integer("perks_count").default(0).notNull(),
  inventory: text("inventory").default("[]").notNull(),
  perks: text("perks").default("[]").notNull(),
  noteTag: text("note_tag", { length: 128 }),
  isOnline: integer("is_online", { mode: "boolean" }).default(false).notNull(),
  lastSeen: text("last_seen"),
  customised: integer("customised", { mode: "boolean" }).default(false).notNull(),
  spinsUsed: integer("spins_used", { mode: "boolean" }).default(false).notNull(),
  boughtSpins: integer("bought_spins", { mode: "boolean" }).default(false).notNull(),
  status: text("status", { length: 32 }),
  family: text("family", { length: 64 }),
  tutorial: integer("tutorial", { mode: "boolean" }).default(false).notNull(),
  redeemCode: text("redeem_code").default('[]').notNull(),
  createdAt: text("created_at").default("").notNull(),
  updatedAt: text("updated_at").default("").notNull(),
});

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export const redeemCodes = sqliteTable("redeem_codes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  code: text("code", { length: 64 }).notNull().unique(),
  description: text("description", { length: 256 }),
  isActive: integer("is_active", { mode: "boolean" }).default(true).notNull(),
  createdAt: text("created_at").default("").notNull(),
  updatedAt: text("updated_at").default("").notNull(),
});

export type RedeemCode = typeof redeemCodes.$inferSelect;
export type NewRedeemCode = typeof redeemCodes.$inferInsert;
