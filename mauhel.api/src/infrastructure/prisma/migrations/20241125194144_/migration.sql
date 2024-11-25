/*
  Warnings:

  - A unique constraint covering the columns `[idClientStripe]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idClientStripe" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_idClientStripe_key" ON "User"("idClientStripe");
