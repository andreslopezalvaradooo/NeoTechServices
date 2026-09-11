-- CreateIndex
CREATE INDEX "Discount_isActive_idx" ON "Discount"("isActive");

-- CreateIndex
CREATE INDEX "Discount_startsAt_endsAt_idx" ON "Discount"("startsAt", "endsAt");
