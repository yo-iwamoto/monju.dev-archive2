/*
  Warnings:

  - A unique constraint covering the columns `[user_id,event_id]` on the table `draft_event_admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,event_id]` on the table `event_admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,event_id]` on the table `event_participations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `draft_event_admins_user_id_event_id_key` ON `draft_event_admins`(`user_id`, `event_id`);

-- CreateIndex
CREATE UNIQUE INDEX `event_admins_user_id_event_id_key` ON `event_admins`(`user_id`, `event_id`);

-- CreateIndex
CREATE UNIQUE INDEX `event_participations_user_id_event_id_key` ON `event_participations`(`user_id`, `event_id`);
