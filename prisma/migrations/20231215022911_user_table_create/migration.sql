/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `profile` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN', 'EDITOR') NOT NULL DEFAULT 'USER',
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `profile`;
