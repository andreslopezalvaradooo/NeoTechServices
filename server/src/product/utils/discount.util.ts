import { Decimal } from '../../generated/prisma/internal/prismaNamespace.js';

type ActiveDiscount = {
  type: 'PERCENTAGE' | 'FIXED_AMOUNT';
  value: Decimal;
  endsAt: Date | null;
  startsAt: Date | null;
  isActive: boolean;
};

export function resolveEffectivePrice(
  basePrice: Decimal,
  discounts: ActiveDiscount[],
): { effectivePrice: Decimal; discountApplied: ActiveDiscount | null } {
  const now = new Date();

  const active =
    discounts
      .filter(
        (d) =>
          d.isActive &&
          (!d.startsAt || d.startsAt <= now) &&
          (!d.endsAt || d.endsAt > now),
      )
      .sort((a, b) => {
        const toPercent = (d: ActiveDiscount) =>
          d.type === 'PERCENTAGE'
            ? d.value.toNumber()
            : d.value.div(basePrice).mul(100).toNumber();
        return toPercent(b) - toPercent(a);
      })[0] ?? null;

  if (!active) return { effectivePrice: basePrice, discountApplied: null };

  let effectivePrice: Decimal;

  if (active.type === 'PERCENTAGE') {
    const multiplier = new Decimal(1).sub(active.value.div(100));
    effectivePrice = basePrice.mul(multiplier).toDecimalPlaces(2);
  } else
    effectivePrice = Decimal.max(basePrice.sub(active.value), new Decimal(0));

  return { effectivePrice, discountApplied: active };
}
