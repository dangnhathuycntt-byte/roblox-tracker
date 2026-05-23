import { db } from "./index";
import { accounts, type NewAccount, type InventoryItem, type PerkItem } from "./schema";

const FIRST_NAMES = [
  "Dominic", "Dan", "Danny", "Deirdre", "Colin", "Hikaru", "Gang", "Asuka",
  "Owen", "Philip", "Marcus", "Elena", "Yuki", "Kaito", "Sakura", "Ryker",
  "Nova", "Atlas", "Luna", "Zion", "Aria", "Kai", "Milo", "Sage", "Axel",
  "Leo", "Finn", "Ivy", "Jade", "Rex", "Nora", "Hugo", "Vera", "Clay",
  "Ruby", "Nash", "Isla", "Jace", "Cora", "Beau", "Wren", "Knox", "Lila",
];

const LAST_NAMES = [
  "Adam", "Dalton", "Aaron", "Cody", "Calvin", "Elsa", "Isabel", "Chris",
  "Faith", "Lewis", "Stone", "Beck", "West", "Park", "Chen", "Kim",
  "Patel", "Cruz", "Reyes", "Hayes", "Gray", "Fox", "Cole", "Reed",
  "Shaw", "Ward", "Hunt", "Ross", "Hart", "Webb", "Kent", "Pope",
];

const RARITY_ITEMS: Record<string, InventoryItem["rarity"][]> = {
  "Grimmjow's Mask": ["Legendary"],
  "Hardened Shield": ["Legendary"],
  "Kitsune Mask": ["Legendary"],
  "Regiment Cloak (Black)": ["Legendary"],
  "Shogun's Helm": ["Legendary"],
  "Warrior's Medallion": ["Legendary"],
  "Emperor's Key": ["Epic"],
  "Kitsune Ribbon": ["Epic"],
  "Blood Vial": ["Epic"],
  "Bowler Hat (White)": ["Epic"],
  "Mushroom Hat": ["Epic"],
  "Altar Chains": ["Rare"],
  "Bowler Hat (Black)": ["Rare"],
  "Memory Scroll": ["Rare"],
  "Midnight Mask": ["Rare"],
  "Recon Visor": ["Rare"],
  "Wizard Hat": ["Rare"],
  "Angel's Halo": ["Mythic"],
  "Armored Serum": ["Mythic"],
  "Attack Serum": ["Mythic"],
  "Female Serum": ["Mythic"],
  "Anime All-Stars [5]": ["Uncommon"],
};

const PERK_NAMES = [
  "Titan Strength", "ODM Mastery", "Blade Edge", "Thunder Spears",
  "Hardening", "Colossal Roar", "Beast Form", "War Hammer",
  "Scout Speed", "Ackerman Blood",
];

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateInventory(): InventoryItem[] {
  const items: InventoryItem[] = [];
  const itemNames = Object.keys(RARITY_ITEMS);
  const count = rand(5, 15);
  const used = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name: string;
    do {
      name = pick(itemNames);
    } while (used.has(name));
    used.add(name);

    items.push({
      name,
      quantity: rand(1, 2000),
      rarity: pick(RARITY_ITEMS[name]),
    });
  }
  return items;
}

function generatePerks(): PerkItem[] {
  const count = rand(2, 6);
  const used = new Set<string>();
  const perks: PerkItem[] = [];

  for (let i = 0; i < count; i++) {
    let name: string;
    do {
      name = pick(PERK_NAMES);
    } while (used.has(name));
    used.add(name);

    perks.push({ name, level: rand(1, 10) });
  }
  return perks;
}

function seed() {
  console.log("Seeding 600 accounts...");

  const existing = db.select({ count: accounts.id }).from(accounts).all();
  if (existing.length > 0 && existing[0].count > 0) {
    console.log("Already seeded. Skipping.");
    return;
  }

  const data: NewAccount[] = [];

  for (let i = 0; i < 600; i++) {
    const firstName = pick(FIRST_NAMES);
    const lastName = pick(LAST_NAMES);
    const year = rand(2000, 2025);
    const username = `${firstName}${lastName}${year}`;

    const inventory = generateInventory();
    const perks = generatePerks();
    const isOnline = Math.random() < 0.15;
    const daysAgo = rand(0, 30);

    data.push({
      username: `${username}_${i}`,
      platform: pick(["Pc", "Mobile", "Xbox", "PS"]),
      currentSlot: pick(["A", "B", "C", "D", "E"]),
      level: rand(1, 100),
      gold: rand(100_000, 100_000_000_000),
      gems: rand(1_000, 100_000),
      prestige: rand(0, 10),
      xp: rand(1_000, 60_000),
      spins: rand(0, 50),
      inventoryCount: inventory.reduce((sum, item) => sum + item.quantity, 0),
      perksCount: perks.reduce((sum, p) => sum + p.level, 0),
      inventory: JSON.stringify(inventory),
      perks: JSON.stringify(perks),
      isOnline,
      lastSeen: new Date(Date.now() - daysAgo * 86400000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  db.insert(accounts).values(data).run();
  console.log("Seeded 600 accounts.");
}

seed();
