/*
  Warnings:

  - A unique constraint covering the columns `[refresh_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reset_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `reset_token` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_refresh_token_key` ON `User`(`refresh_token`);

-- CreateIndex
CREATE UNIQUE INDEX `User_reset_token_key` ON `User`(`reset_token`);
