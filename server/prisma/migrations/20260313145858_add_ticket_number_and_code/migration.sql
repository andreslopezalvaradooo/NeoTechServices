/*
  Warnings:

  - A unique constraint covering the columns `[ticketNumber]` on the table `Repair` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ticketCode]` on the table `Repair` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticketCode` to the `Repair` table without a default value. This is not possible if the table is not empty.

*/
-- -- AlterTable
-- ALTER TABLE "Repair" ADD COLUMN     "ticketCode" TEXT NOT NULL,
-- ADD COLUMN     "ticketNumber" SERIAL NOT NULL;

-- -- CreateIndex
-- CREATE UNIQUE INDEX "Repair_ticketNumber_key" ON "Repair"("ticketNumber");

-- -- CreateIndex
-- CREATE UNIQUE INDEX "Repair_ticketCode_key" ON "Repair"("ticketCode");

-- Agrega ticketNumber como sequence
ALTER TABLE "Repair"
ADD COLUMN "ticketNumber" SERIAL;

-- Agrega ticketCode como columna generada
ALTER TABLE "Repair"
ADD COLUMN "ticketCode" TEXT GENERATED ALWAYS AS
  ('REP-' || LPAD("ticketNumber"::text, 6, '0')) STORED;

-- Constraints de unicidad
ALTER TABLE "Repair"
ADD CONSTRAINT "Repair_ticketNumber_key" UNIQUE ("ticketNumber");

ALTER TABLE "Repair"
ADD CONSTRAINT "Repair_ticketCode_key" UNIQUE ("ticketCode");