/*
  Warnings:

  - Added the required column `adopted_at` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "adopted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "adopted_by" TEXT,
ADD COLUMN     "contact_answerable" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
