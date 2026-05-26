"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
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
  BookOpen,
  Gamepad2,
  Gift,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GAMES = [
  { name: "Attack On Titan Revolution", icon: Swords, href: "/dashboard" },
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
] as const;

const NAV_ITEMS = [
  { name: "Redeem Codes", icon: Gift, href: "/dashboard/codes" },
  { name: "API Docs", icon: BookOpen, href: "/dashboard/docs" },
];

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

function ActiveIndicator() {
  return (
    <motion.span
      layoutId="sidebar-active-indicator"
      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-accent"
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    />
  );
}

function ActiveBg() {
  return (
    <motion.span
      layoutId="sidebar-active-bg"
      className="absolute inset-0 rounded-md bg-accent/10"
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    />
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <aside
        className={cn(
          "w-56 shrink-0 bg-transparent flex flex-col h-full border-r border-border/40",
          "fixed inset-y-0 left-0 z-50 lg:static lg:z-auto",
          "transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center gap-2.5 px-4 py-4">
          <motion.div
            className="h-7 w-7 rounded-md bg-accent/10 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <Gamepad2 className="h-3.5 w-3.5 text-accent" />
          </motion.div>
          <span className="font-semibold text-sm tracking-tight text-fg">
            Roblox Tracker
          </span>
        </div>

        <ScrollArea className="flex-1 px-2">
          <p className="text-[10.24px] font-bold text-meta uppercase tracking-[0.1em] px-3 mb-1.5 mt-2">
            Games
          </p>
          <div className="flex flex-col gap-0.5">
            {GAMES.map((game) => {
              const Icon = game.icon;
              const hasHref = "href" in game;
              const isActive = hasHref && pathname === (game as { href: string }).href;
              const isDisabled = !hasHref;

              if (isDisabled) {
                return (
                  <div
                    key={game.name}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] text-left text-meta cursor-default relative"
                    title="Coming soon"
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-40" />
                    <span className="truncate opacity-40">{game.name}</span>
                  </div>
                );
              }

              return (
                <motion.div
                  key={game.name}
                  whileHover={{ x: 1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1, ease: [0.2, 0, 0, 1] }}
                >
                  <Link
                    href={(game as { href: string }).href}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] text-left transition-colors duration-150 relative",
                      isActive
                        ? "text-accent font-medium"
                        : "text-muted hover:text-fg hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                    )}
                    onClick={onClose}
                  >
                    {isActive && <ActiveIndicator />}
                    {isActive && <ActiveBg />}
                    <Icon className="h-4 w-4 shrink-0 relative z-10" />
                    <span className="truncate relative z-10">{game.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="my-3 mx-3 h-px bg-border-soft" />

          <div className="flex flex-col gap-0.5 pb-4">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1, ease: [0.2, 0, 0, 1] }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] transition-colors duration-150 relative",
                      isActive
                        ? "text-accent font-medium"
                        : "text-muted hover:text-fg hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                    )}
                    onClick={onClose}
                  >
                    {isActive && <ActiveIndicator />}
                    {isActive && <ActiveBg />}
                    <Icon className="h-4 w-4 shrink-0 relative z-10" />
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
