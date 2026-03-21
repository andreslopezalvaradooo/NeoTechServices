-- CreateEnum
CREATE TYPE "RepairStatus" AS ENUM ('pending', 'in_progress', 'waiting_parts', 'completed');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('assigned', 'completed', 'waiting', 'approval', 'created');

-- AlterTable
ALTER TABLE "Repair" ADD COLUMN     "status" "RepairStatus" NOT NULL DEFAULT 'pending';

-- CreateTable
CREATE TABLE "RepairEvent" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "repairId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RepairEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RepairEvent_repairId_idx" ON "RepairEvent"("repairId");

-- AddForeignKey
ALTER TABLE "RepairEvent" ADD CONSTRAINT "RepairEvent_repairId_fkey" FOREIGN KEY ("repairId") REFERENCES "Repair"("id") ON DELETE CASCADE ON UPDATE CASCADE;
