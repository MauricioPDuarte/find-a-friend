/*
  Warnings:

  - Added the required column `independence_level` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "independence_level" TEXT NOT NULL;
