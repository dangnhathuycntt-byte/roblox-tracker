CREATE TABLE `redeem_codes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`code` text(64) NOT NULL,
	`description` text(256),
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `redeem_codes_code_unique` ON `redeem_codes` (`code`);--> statement-breakpoint
ALTER TABLE `accounts` DROP COLUMN `redeem_code`;