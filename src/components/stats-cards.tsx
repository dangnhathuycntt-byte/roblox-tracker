"use client";

import { motion } from "framer-motion";
import { formatNumber } from "@/lib/format";
import type { AccountsResponse } from "@/hooks/use-accounts";
import {
  Users,
  Coins,
  Award,
  Gem,
  RotateCw,
  Zap,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatsCardsProps = {
  stats: AccountsResponse["stats"] | undefined;
  isLoading: boolean;
};

type StatCardData = {
  label: string;
  value: string;
  sub?: string;
  color: string;
  iconBg: string;
  icon: LucideIcon;
  highlight?: boolean;
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export function StatsCards({ stats, isLoading }: StatsCardsProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-surface border border-border p-4 animate-pulse h-[88px]"
          />
        ))}
      </div>
    );
  }

  const pct =
    stats.totalAccounts > 0
      ? ((stats.onlineCount / stats.totalAccounts) * 100).toFixed(1)
      : "0.0";

  const cards: StatCardData[] = [
    {
      label: "ONLINE / TOTAL",
      value: `${stats.onlineCount} / ${stats.totalAccounts}`,
      sub: `${pct}%`,
      color: "text-success",
      iconBg: "bg-success/10",
      icon: Users,
      highlight: true,
    },
    {
      label: "GOLD",
      value: formatNumber(stats.totalGold),
      color: "text-muted",
      iconBg: "bg-muted/10",
      icon: Coins,
    },
    {
      label: "PRESTIGE",
      value: formatNumber(stats.totalPrestige),
      color: "text-muted",
      iconBg: "bg-muted/10",
      icon: Award,
    },
    {
      label: "GEMS",
      value: formatNumber(stats.totalGems),
      color: "text-muted",
      iconBg: "bg-muted/10",
      icon: Gem,
    },
    {
      label: "SPINS",
      value: formatNumber(stats.totalSpins),
      color: "text-muted",
      iconBg: "bg-muted/10",
      icon: RotateCw,
    },
    {
      label: "PERKS",
      value: formatNumber(stats.totalPerks),
      color: "text-muted",
      iconBg: "bg-muted/10",
      icon: Zap,
    },
    {
      label: "INVENTORY",
      value: formatNumber(stats.totalInventory),
      color: "text-muted",
      iconBg: "bg-muted/10",
      icon: Package,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.015, y: -1 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1], delay: i * 0.03 }}
            className={`relative rounded-lg p-4 flex flex-col gap-3 cursor-default transition-all duration-150 ${
              card.highlight
                ? "bg-success/[0.04]"
                : "bg-transparent hover:bg-surface/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-7 w-7 rounded-md ${card.iconBg} flex items-center justify-center`}>
                  <Icon className={`h-3.5 w-3.5 ${card.color} opacity-70`} />
                </div>
                <span className="text-[10.24px] font-bold text-muted uppercase tracking-[0.08em]">
                  {card.label}
                </span>
              </div>
              {card.sub && (
                <span className="text-[10.24px] font-semibold tabular-nums text-success">
                  {card.sub}
                </span>
              )}
            </div>
            <span className="text-xl font-bold tracking-tight tabular-nums text-fg">
              {card.value}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
