CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text(64) NOT NULL,
	`platform` text(16) DEFAULT 'Pc' NOT NULL,
	`current_slot` text DEFAULT 'A' NOT NULL,
	`level` integer DEFAULT 0 NOT NULL,
	`gold` integer DEFAULT 0 NOT NULL,
	`gems` integer DEFAULT 0 NOT NULL,
	`prestige` integer DEFAULT 0 NOT NULL,
	`xp` integer DEFAULT 0 NOT NULL,
	`spins` integer DEFAULT 0 NOT NULL,
	`inventory_count` integer DEFAULT 0 NOT NULL,
	`perks_count` integer DEFAULT 0 NOT NULL,
	`inventory` text DEFAULT '[]' NOT NULL,
	`perks` text DEFAULT '[]' NOT NULL,
	`note_tag` text(128),
	`is_online` integer DEFAULT false NOT NULL,
	`last_seen` text,
	`customised` integer DEFAULT false NOT NULL,
	`spins_used` integer DEFAULT false NOT NULL,
	`bought_spins` integer DEFAULT false NOT NULL,
	`status` text(32),
	`family` text(64),
	`tutorial` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_username_unique` ON `accounts` (`username`);