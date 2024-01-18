/*
  Warnings:

  - Added the required column `description` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Stance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` ADD COLUMN `description` VARCHAR(50000) NOT NULL;

-- AlterTable
ALTER TABLE `stance` ADD COLUMN `description` VARCHAR(50000) NOT NULL;
