-- CreateEnum
CREATE TYPE "ConsultingStatus" AS ENUM ('pending', 'in_progress', 'completed');

-- CreateTable
CREATE TABLE "ConsultingEvent" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "consultingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsultingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulting" (
    "id" TEXT NOT NULL,
    "ticketNumber" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "status" "ConsultingStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Consulting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConsultingEvent_consultingId_idx" ON "ConsultingEvent"("consultingId");

-- CreateIndex
CREATE UNIQUE INDEX "Consulting_ticketNumber_key" ON "Consulting"("ticketNumber");

-- AddForeignKey
ALTER TABLE "ConsultingEvent" ADD CONSTRAINT "ConsultingEvent_consultingId_fkey" FOREIGN KEY ("consultingId") REFERENCES "Consulting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulting" ADD CONSTRAINT "Consulting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
