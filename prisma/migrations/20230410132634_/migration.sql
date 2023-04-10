/*
  Warnings:

  - Made the column `title` on table `draft_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `draft_events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `capacity` on table `draft_events` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `draft_events` MODIFY `title` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `description` TEXT NOT NULL,
    MODIFY `capacity` INTEGER NOT NULL DEFAULT 10;
