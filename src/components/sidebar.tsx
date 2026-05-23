"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import {
  Swords,
  Cherry,
  Crown,
  PawPrint,
  Dog,
  Fish,
  Sparkles,
  Sprout,
  Skull,
  Bug,
  Dice5,
  BarChart3,
  Bell,
  LineChart,
  Share2,
} from "lucide-react";

const GAMES = [
  { name: "Attack On Titan Revolution", icon: Swords, active: true },
  { name: "Blox Fruits", icon: Cherry },
  { name: "King Legacy", icon: Crown },
  { name: "Pet Simulator 99", icon: PawPrint },
  { name: "Pets Go", icon: Dog },
  { name: "Fisch", icon: Fish },
  { name: "Bubble Gum Simulator", icon: Sparkles },
  { name: "Grow A Garden", icon: Sprout },
  { name: "Grand Piece Online", icon: Skull },
  { name: "Bee Swarm Simulator", icon: Bug },
  { name: "Slime RNG", icon: Dice5 },
];

const NAV_ITEMS = [
  { name: "Game Insights", icon: BarChart3 },
  { name: "Alert Center", icon: Bell },
  { name: "Chart", icon: LineChart },
  { name: "Share", icon: Share2 },
];

export function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r border-border-soft bg-surface/50 backdrop-blur-xl flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="h-8 w-8 rounded-md bg-accent/15 flex items-center justify-center">
          <Swords className="h-4 w-4 text-accent" />
        </div>
        <span className="font-semibold text-[15px] tracking-tight text-fg">
          Roblox Tracker
        </span>
      </div>

      <ScrollArea className="flex-1 px-3">
        <p className="text-[10px] font-semibold text-muted uppercase tracking-[0.15em] px-3 mb-2 mt-2">
          Games
        </p>
        <div className="flex flex-col gap-0.5">
          {GAMES.map((game) => {
            const Icon = game.icon;
            return (
              <motion.button
                key={game.name}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] text-left transition-all duration-200",
                  game.active
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-muted hover:text-fg hover:bg-white/[0.04]"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{game.name}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="my-4 mx-3 h-px bg-border-soft" />

        <div className="flex flex-col gap-0.5 pb-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.name}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] text-muted hover:text-fg hover:bg-white/[0.04] transition-all duration-200"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </motion.button>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}
