/*
  Warnings:

  - You are about to drop the column `rentPricePerDay` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RentInterval" AS ENUM ('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "rentPricePerDay",
ADD COLUMN     "rentInterval" "RentInterval" DEFAULT 'DAILY',
ADD COLUMN     "rentPrice" DECIMAL(12,2);
