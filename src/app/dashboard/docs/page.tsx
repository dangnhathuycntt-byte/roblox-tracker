"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TOKEN_GROUPS = [
  {
    title: "Surfaces",
    tokens: [
      { name: "--bg", value: "#08090a", desc: "Marketing black — page canvas" },
      { name: "--surface", value: "#191a1b", desc: "Elevated surface — cards, dropdowns" },
      { name: "--surface-warm", value: "#191a1b", desc: "Warm surface alias (dark)" },
    ],
  },
  {
    title: "Foreground",
    tokens: [
      { name: "--fg", value: "#f7f8f8", desc: "Near-white primary text" },
      { name: "--fg-2", value: "#d0d6e0", desc: "Silver-gray body / secondary" },
      { name: "--muted", value: "#8a8f98", desc: "Tertiary — placeholders, metadata" },
      { name: "--meta", value: "#62666d", desc: "Quaternary — timestamps, disabled" },
    ],
  },
  {
    title: "Borders",
    tokens: [
      { name: "--border", value: "rgba(255,255,255,0.08)", desc: "Standard semi-transparent" },
      { name: "--border-soft", value: "rgba(255,255,255,0.05)", desc: "Ultra-subtle divider" },
    ],
  },
  {
    title: "Accent",
    tokens: [
      { name: "--accent", value: "#5e6ad2", desc: "Brand indigo — CTAs" },
      { name: "--accent-hover", value: "#828fff", desc: "Lighter hover" },
      { name: "--accent-active", value: "#4752c4", desc: "Darker pressed" },
      { name: "--accent-on", value: "#ffffff", desc: "Text on accent" },
    ],
  },
  {
    title: "Semantic",
    tokens: [
      { name: "--success", value: "#27a644", desc: "Success green" },
      { name: "--warn", value: "#eab308", desc: "Warning amber" },
      { name: "--danger", value: "#dc2626", desc: "Destructive red" },
    ],
  },
  {
    title: "Typography",
    tokens: [
      { name: "--font-display", value: "Inter Variable", desc: "Headings" },
      { name: "--font-body", value: "Inter Variable", desc: "Body" },
      { name: "--font-mono", value: "Geist Mono", desc: "Code" },
      { name: "--text-xs → --text-4xl", value: "12px → 72px", desc: "Type scale" },
    ],
  },
  {
    title: "Spacing (4px grid)",
    tokens: [
      { name: "--space-1 → --space-12", value: "4px → 48px", desc: "Linear scale" },
    ],
  },
  {
    title: "Radius",
    tokens: [
      { name: "--radius-sm", value: "6px", desc: "Buttons / inputs" },
      { name: "--radius-md", value: "8px", desc: "Cards" },
      { name: "--radius-lg", value: "12px", desc: "Panels" },
      { name: "--radius-pill", value: "9999px", desc: "Pills" },
    ],
  },
  {
    title: "Motion",
    tokens: [
      { name: "--motion-fast", value: "150ms", desc: "Micro-interactions" },
      { name: "--motion-base", value: "200ms", desc: "Standard" },
      { name: "--ease-standard", value: "cubic-bezier(0.2,0,0,1)", desc: "Default easing" },
    ],
  },
  {
    title: "Layout",
    tokens: [
      { name: "--container-max", value: "1200px", desc: "Max content width" },
      { name: "--section-y-desktop", value: "80px", desc: "Section padding" },
    ],
  },
];

const COLORS = [
  { name: "bg", hex: "#08090a", className: "bg-[#08090a]" },
  { name: "surface", hex: "#191a1b", className: "bg-[#191a1b]" },
  { name: "fg", hex: "#f7f8f8", className: "bg-[#f7f8f8]" },
  { name: "fg-2", hex: "#d0d6e0", className: "bg-[#d0d6e0]" },
  { name: "muted", hex: "#8a8f98", className: "bg-[#8a8f98]" },
  { name: "meta", hex: "#62666d", className: "bg-[#62666d]" },
  { name: "accent", hex: "#5e6ad2", className: "bg-[#5e6ad2]" },
  { name: "accent-hover", hex: "#828fff", className: "bg-[#828fff]" },
  { name: "success", hex: "#27a644", className: "bg-[#27a644]" },
  { name: "warn", hex: "#eab308", className: "bg-[#eab308]" },
  { name: "danger", hex: "#dc2626", className: "bg-[#dc2626]" },
];

export default function DocsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 p-8 max-w-[1200px] mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[var(--text-2xl)] font-semibold tracking-tight text-fg">
          Documentation
        </h1>
        <p className="text-fg-2 text-[15px] leading-relaxed max-w-2xl">
          API endpoint reference, design system tokens, and component guide for the Roblox Tracker dashboard.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <a href="#api" className="text-xs font-medium text-accent hover:text-accent-hover transition-colors">API Endpoints</a>
          <span className="text-meta">|</span>
          <a href="#design" className="text-xs font-medium text-accent hover:text-accent-hover transition-colors">Design System</a>
        </div>
      </div>

      {/* ═══════════ API ENDPOINTS ═══════════ */}
      <section className="flex flex-col gap-4" id="api">
        <h2 className="text-[var(--text-xl)] font-semibold tracking-tight text-fg">
          API Endpoints
        </h2>

        {/* GET */}
        <div className="rounded-md border border-border bg-surface/50 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border-soft bg-surface">
            <span className="text-[10px] font-bold uppercase tracking-wider text-success bg-success/15 px-2 py-0.5 rounded-[4px]">GET</span>
            <code className="text-sm text-fg">/api/accounts</code>
            <span className="text-xs text-muted ml-auto">Paginated account list + aggregated stats</span>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Query Parameters</p>
              <div className="rounded-[4px] border border-border-soft overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-soft">
                      <th className="text-left px-3 py-2 text-[11px] font-semibold text-muted uppercase tracking-wider">Name</th>
                      <th className="text-left px-3 py-2 text-[11px] font-semibold text-muted uppercase tracking-wider">Type</th>
                      <th className="text-left px-3 py-2 text-[11px] font-semibold text-muted uppercase tracking-wider">Default</th>
                      <th className="text-left px-3 py-2 text-[11px] font-semibold text-muted uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["page", "number", "1", "Page number (min 1)"],
                      ["pageSize", "number", "50", "Rows per page (max 100)"],
                      ["sort", "string", "username", "Column: username, level, gold, gems, prestige, xp, spins, currentSlot, inventoryCount, perksCount"],
                      ["order", "asc | desc", "asc", "Sort direction"],
                      ["search", "string", "", "Case-insensitive username search"],
                      ["status", "online | offline", "(all)", "Filter by online status. Omit for all."],
                      ["family", "string", "", "Exact match on family name (e.g. Pikale)"],
                    ].map(([name, type, def, desc]) => (
                      <tr key={name} className="border-b border-border-soft last:border-0">
                        <td className="px-3 py-2 text-xs font-mono text-accent whitespace-nowrap">{name}</td>
                        <td className="px-3 py-2 text-xs text-fg-2">{type}</td>
                        <td className="px-3 py-2 text-xs text-meta">{def}</td>
                        <td className="px-3 py-2 text-xs text-muted">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Response <code className="text-accent text-[11px]">200 OK</code></p>
              <pre className="text-xs font-mono text-fg-2 bg-bg rounded-[4px] p-3 overflow-x-auto border border-border-soft leading-relaxed max-h-96">
{`{
  "data": [{
    "id": 1,
    "username": "dn2754berG4merGG9440",
    "platform": "Pc",
    "currentSlot": "A",
    "level": 42,
    "gold": 1500000000,
    "gems": 50000,
    "prestige": 3,
    "xp": 25000,
    "spins": 12,
    "inventoryCount": 847,
    "perksCount": 24,
    "inventory": "[{\\"name\\":\\"Kitsune Mask\\",\\"quantity\\":5}]",
    "perks": "[{\\"name\\":\\"Titan Strength\\",\\"level\\":8}]",
    "noteTag": null,
    "isOnline": true,
    "lastSeen": "2026-05-24T00:04:21.000Z",
    "customised": true,
    "spinsUsed": true,
    "boughtSpins": true,
    "status": "done",
    "family": "Pikale",
    "tutorial": true,
    "createdAt": "2026-05-24T00:04:21.000Z",
    "updatedAt": "2026-05-24T00:06:05.000Z"
  }, ...],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 600,
    "totalPages": 12
  },
  "stats": {
    "totalAccounts": 600,
    "onlineCount": 90,
    "totalGold": 28500000000000,
    "totalGems": 32000000,
    "totalPrestige": 1800,
    "totalXp": 15000000,
    "totalSpins": 7200,
    "totalPerks": 14400,
    "totalInventory": 508200
  }
}`}</pre>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Examples</p>
              <div className="flex flex-col gap-1.5">
                {[
                  { desc: "Default — page 1, 50 rows, sorted by username ASC", cmd: "GET /api/accounts" },
                  { desc: "Sorted by gold descending, page 3", cmd: "GET /api/accounts?page=3&pageSize=25&sort=gold&order=desc" },
                  { desc: "Search username + filter online only", cmd: "GET /api/accounts?search=philip&status=online" },
                ].map((ex) => (
                  <div key={ex.cmd} className="flex flex-col gap-1 p-2.5 rounded-[4px] bg-bg border border-border-soft">
                    <span className="text-xs text-muted">{ex.desc}</span>
                    <code className="text-xs font-mono text-accent">{ex.cmd}</code>
                  </div>
                ))}
                {[
                  { desc: "Filter by family", cmd: "GET /api/accounts?family=Pikale" },
                ].map((ex) => (
                  <div key={ex.cmd} className="flex flex-col gap-1 p-2.5 rounded-[4px] bg-bg border border-border-soft">
                    <span className="text-xs text-muted">{ex.desc}</span>
                    <code className="text-xs font-mono text-accent">{ex.cmd}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GET by username */}
        <div className="rounded-md border border-border bg-surface/50 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border-soft bg-surface">
            <span className="text-[10px] font-bold uppercase tracking-wider text-success bg-success/15 px-2 py-0.5 rounded-[4px]">GET</span>
            <code className="text-sm text-fg">/api/accounts/:username</code>
            <span className="text-xs text-muted ml-auto">Get single account by username</span>
          </div>
          <div className="p-4 flex flex-col gap-3">
            <p className="text-xs text-muted">Returns the full account object. <code className="text-accent">404</code> if username not found.</p>
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Example</p>
              <code className="text-xs font-mono text-accent block p-2.5 rounded-[4px] bg-bg border border-border-soft">
                GET /api/accounts/dn2754berG4merGG9440
              </code>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Response <code className="text-accent text-[11px]">200 OK</code></p>
              <pre className="text-xs font-mono text-fg-2 bg-bg rounded-[4px] p-3 border border-border-soft leading-relaxed max-h-72 overflow-x-auto">
{`{
  "id": 1,
  "username": "dn2754berG4merGG9440",
  "platform": "Pc",
  "currentSlot": "A",
  "level": 42,
  "gold": 1500000000,
  "gems": 50000,
  "prestige": 3,
  "xp": 25000,
  "spins": 12,
  "inventoryCount": 847,
  "perksCount": 24,
  "inventory": "[...]",
  "perks": "[...]",
  "isOnline": true,
  "lastSeen": "2026-05-24T00:04:21.000Z",
  "customised": true,
  "spinsUsed": true,
  "boughtSpins": true,
  "status": "done",
  "family": "Pikale",
  "tutorial": true,
  "createdAt": "2026-05-24T00:04:21.000Z",
  "updatedAt": "2026-05-24T00:06:05.000Z"
}`}</pre>
            </div>
          </div>
        </div>

        {/* DELETE */}
        <div className="rounded-md border border-border bg-surface/50 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border-soft bg-surface">
            <span className="text-[10px] font-bold uppercase tracking-wider text-danger bg-danger/15 px-2 py-0.5 rounded-[4px]">DELETE</span>
            <code className="text-sm text-fg">/api/accounts</code>
            <span className="text-xs text-muted ml-auto">Delete accounts by id list or all</span>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Request Body (JSON)</p>
              <p className="text-xs text-muted mb-2">
                Send <code className="text-accent">{"{\"ids\": [1, 2, 3]}"}</code> to delete specific accounts,
                or <code className="text-accent">{"{\"all\": true, \"confirm\": \"yes-delete-all\"}"}</code> to delete everything (confirmation required).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                {[
                  ["ids", "number[]", "Array of account IDs to delete"],
                  ["all", "boolean", "If true, deletes ALL accounts"],
                  ["confirm", "string", 'Must be "yes-delete-all" when all=true'],
                ].map(([field, type, desc]) => (
                  <div key={field} className="flex items-start gap-2 p-2 rounded-[4px] bg-bg border border-border-soft">
                    <code className="text-xs text-accent shrink-0">{field}</code>
                    <div>
                      <span className="text-[10px] font-semibold text-meta uppercase block">{type}</span>
                      <span className="text-xs text-muted">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Delete selected</p>
                <pre className="text-xs font-mono text-fg-2 bg-bg rounded-[4px] p-3 border border-border-soft leading-relaxed">
{`DELETE /api/accounts
Content-Type: application/json

{"ids": [1, 5, 42]}`}</pre>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Delete all</p>
                <pre className="text-xs font-mono text-fg-2 bg-bg rounded-[4px] p-3 border border-border-soft leading-relaxed">
{`DELETE /api/accounts
Content-Type: application/json

{"all": true, "confirm": "yes-delete-all"}`}</pre>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Response <code className="text-accent text-[11px]">200 OK</code></p>
              <pre className="text-xs font-mono text-fg-2 bg-bg rounded-[4px] p-3 border border-border-soft leading-relaxed">
{`{"deleted": 3}`}</pre>
            </div>
          </div>
        </div>

        {/* POST */}
        <div className="rounded-md border border-border bg-surface/50 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border-soft bg-surface">
            <span className="text-[10px] font-bold uppercase tracking-wider text-accent-on bg-accent px-2 py-0.5 rounded-[4px]">POST</span>
            <code className="text-sm text-fg">/api/accounts</code>
            <span className="text-xs text-muted ml-auto">Upsert account (insert or update by username)</span>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Behavior</p>
              <div className="flex flex-col gap-1.5">
                <p className="text-xs text-fg-2">
                  <span className="text-danger font-semibold">username is required</span> — all other fields are optional.
                </p>
                <p className="text-xs text-muted">• If username <strong>exists</strong> → updates only the provided fields (partial update).</p>
                <p className="text-xs text-muted">• If username <strong>does not exist</strong> → inserts a new row with defaults for missing fields.</p>
                <p className="text-xs text-muted">• <code className="text-accent">inventory</code> and <code className="text-accent">perks</code> are auto-serialized to JSON strings if passed as objects.</p>
                <p className="text-xs text-muted">• <code className="text-accent">updatedAt</code> is always set to <code className="text-fg-2">new Date()</code> on every POST.</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Request Body (fields)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  ["username *", "string", "Unique account key for upsert"],
                  ["platform", "string", '"Pc", "Mobile", "Xbox", "PS"'],
                  ["current_slot", "string", '"A", "B", "C", "D", "E"'],
                  ["level", "number", "Account level"],
                  ["gold", "number", "Gold amount"],
                  ["gems", "number", "Gems amount"],
                  ["prestige", "number", "Prestige level"],
                  ["xp", "number", "Experience points"],
                  ["spins", "number", "Spins count"],
                  ["inventory_count", "number", "Total inventory items count"],
                  ["perks_count", "number", "Total perk levels"],
                  ["inventory", "object[] | string", "Auto-serialized to JSON"],
                  ["perks", "object[] | string", "Auto-serialized to JSON"],
                  ["note_tag", "string", "Optional tag (max 128)"],
                  ["is_online", "boolean", "Online status"],
                  ["last_seen", "string", "ISO 8601 timestamp"],
                  ["customised", "boolean", "Character customised"],
                  ["spins_used", "boolean", "Spins feature used"],
                  ["bought_spins", "boolean", "Purchased spins"],
                  ["redeemCode", "object[] | string", "Auto-serialized to JSON"],
                  ["status", "string", 'e.g. "done", "pending"'],
                  ["family", "string", 'Family name (e.g. "Pikale")'],
                  ["tutorial", "boolean", "Tutorial completed"],
                  ["created", "string", "ISO 8601 — insert only"],
                  ["updated", "string", "ISO 8601 — auto-overwritten"],
                ].map(([field, type, desc]) => (
                  <div key={field} className="flex items-start gap-2 p-2 rounded-[4px] bg-bg border border-border-soft">
                    <code className={`text-xs shrink-0 ${field.includes("*") ? "text-danger" : "text-accent"}`}>{field}</code>
                    <div>
                      <span className="text-[10px] font-semibold text-meta uppercase block">{type}</span>
                      <span className="text-xs text-muted">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Example Payload</p>
                <pre className="text-xs font-mono text-fg-2 bg-bg rounded-[4px] p-3 overflow-x-auto border border-border-soft leading-relaxed">
{`{
  "username": "dn2754berG4merGG9440",
  "customised": true,
  "spins_used": true,
  "bought_spins": true,
  "redeemCode": ["VISITS900M","TERRA70K","LIKES1M250K"],
  "status": "done",
  "family": "Pikale",
  "tutorial": true,
  "created": "2026-05-24 00:04:21",
  "updated": "2026-05-24 00:06:05"
}`}</pre>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Success <code className="text-success text-[11px]">200 OK</code></p>
                  <pre className="text-xs font-mono text-fg-2 bg-bg rounded-[4px] p-3 border border-border-soft leading-relaxed">
{`{"success": true, "username": "dn2754berG4merGG9440"}`}</pre>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Error <code className="text-danger text-[11px]">400 Bad Request</code></p>
                  <pre className="text-xs font-mono text-fg-2 bg-bg rounded-[4px] p-3 border border-border-soft leading-relaxed">
{`{"error": "username is required"}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ DESIGN SYSTEM ═══════════ */}
      <section className="flex flex-col gap-4" id="design">
        <h2 className="text-[var(--text-xl)] font-semibold tracking-tight text-fg">
          Design System
        </h2>
        <p className="text-fg-2 text-[15px] leading-relaxed max-w-2xl">
          Linear-inspired dark-native token system. Near-black canvas with indigo-violet accent.
          Luminance-stepping for depth — no opaque drop shadows on dark surfaces.
          Semi-transparent white borders throughout.
        </p>

        {/* Color Palette */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-fg">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {COLORS.map((c) => (
              <div key={c.name} className="flex flex-col gap-2 p-3 rounded-md bg-surface border border-border">
                <div
                  className={`h-12 rounded-[4px] ${c.className}`}
                  style={{
                    border: ["fg", "fg-2", "muted", "meta", "bg"].includes(c.name)
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
                  }}
                />
                <div>
                  <p className="text-xs font-medium text-fg">{c.name}</p>
                  <p className="text-xs text-muted font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {TOKEN_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-fg">{group.title}</h3>
              <div className="rounded-md border border-border bg-surface/50 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border-soft">
                      <th className="text-left px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Token</th>
                      <th className="text-left px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Value</th>
                      <th className="text-left px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted hidden md:table-cell">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.tokens.map((t) => (
                      <tr key={t.name} className="border-b border-border-soft last:border-0">
                        <td className="px-3 py-2 text-xs font-mono text-accent whitespace-nowrap">{t.name}</td>
                        <td className="px-3 py-2 text-xs font-mono text-fg-2 whitespace-nowrap">{t.value}</td>
                        <td className="px-3 py-2 text-xs text-muted hidden md:table-cell">{t.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Elevation */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-fg">Elevation</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {[
              { label: "Flat (Level 0)", desc: "No shadow, deepest canvas. Page background.", className: "bg-bg border-border-soft" },
              { label: "Surface (Level 2)", desc: "1px border, slightly lighter bg. Cards, inputs.", className: "bg-surface border-border" },
              { label: "Elevated (Level 4)", desc: "Drop shadow + ring. Dropdowns, popovers.", className: "bg-surface border-border shadow-lg" },
              { label: "Focus Ring", desc: "Accent ring. Keyboard focus indicator.", className: "bg-surface border-accent/30 shadow-[0_0_0_2px_rgba(94,106,210,0.3)]" },
            ].map((el) => (
              <div key={el.label} className={`flex flex-col gap-3 p-4 rounded-md border ${el.className}`}>
                <p className="text-xs text-muted uppercase tracking-wider font-semibold">{el.label}</p>
                <p className="text-xs text-meta">{el.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Type Scale */}
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-fg">Type Scale</h3>
          <div className="rounded-md border border-border bg-surface/50 p-6 flex flex-col gap-3">
            <p className="text-[72px] font-medium leading-[1.0] tracking-[-0.022em] text-fg">Display XL 72px</p>
            <p className="text-[48px] font-medium leading-[1.0] tracking-[-0.022em] text-fg">Display 48px</p>
            <p className="text-[32px] font-semibold leading-tight text-fg">Heading 1 — 32px</p>
            <p className="text-[24px] font-semibold text-fg">Heading 2 — 24px</p>
            <p className="text-[18px] font-medium text-fg">Body Large — 18px</p>
            <p className="text-[16px] text-fg-2">Body — 16px. Standard reading text with comfortable line-height 1.5.</p>
            <p className="text-[14px] text-muted">Caption — 14px. Metadata, secondary descriptions.</p>
            <p className="text-[12px] text-meta uppercase tracking-[0.1em] font-semibold">Label — 12px. Micro labels, overline text.</p>
          </div>
        </div>

        {/* Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-fg text-sm">Darkness as Space</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted text-xs">On the dark canvas, empty space is absence — not white. Content emerges through calibrated luminance steps.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-fg text-sm">Luminance Stepping</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted text-xs">Elevation via opacity shifts (0.02 → 0.04 → 0.05), not shadow darkness. Semi-transparent white borders throughout.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-fg text-sm">Single Accent</CardTitle></CardHeader>
            <CardContent>
              <p className="text-muted text-xs">Indigo-violet (#5e6ad2) is the only chromatic color. Reserved for CTAs and active states only.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </motion.div>
  );
}
