import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, DiscountType } from '../src/generated/prisma/client.js';
import { faker } from '@faker-js/faker';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  {
    name: 'Computers and Laptops',
    slug: 'computers-laptops',
    description: 'Laptops, desktops and computing equipment',
    image: 'https://picsum.photos/id/0/300/200',
  },
  {
    name: 'PC Components',
    slug: 'pc-components',
    description: 'Processors, graphics cards, RAM, hard drives',
    image: 'https://picsum.photos/id/1/300/200',
  },
  {
    name: 'Peripherals',
    slug: 'peripherals',
    description: 'Keyboards, mice, monitors, headphones',
    image: 'https://picsum.photos/id/2/300/200',
  },
  {
    name: 'Networking and Connectivity',
    slug: 'networking-connectivity',
    description: 'Routers, switches, cables, adapters',
    image: 'https://picsum.photos/id/3/300/200',
  },
  {
    name: 'Storage',
    slug: 'storage',
    description: 'SSD, HDD, USB, external drives',
    image: 'https://picsum.photos/id/4/300/200',
  },
  {
    name: 'Audio and Video',
    slug: 'audio-video',
    description: 'Speakers, microphones, webcams',
    image: 'https://picsum.photos/id/5/300/200',
  },
];

const DISCOUNTS = [
  {
    name: 'Summer Sale',
    type: DiscountType.PERCENTAGE,
    value: 10,
    isActive: true,
    startsAt: new Date(),
    endsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
  },
  {
    name: 'Flash Deal',
    type: DiscountType.PERCENTAGE,
    value: 25,
    isActive: true,
    startsAt: new Date(),
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
  },
  {
    name: 'Fixed Discount $20',
    type: DiscountType.FIXED_AMOUNT,
    value: 20,
    isActive: true,
    startsAt: null,
    endsAt: null,
  },
  {
    name: 'Inactive Promo',
    type: DiscountType.PERCENTAGE,
    value: 50,
    isActive: false,
    startsAt: null,
    endsAt: null,
  },
];

function generateProduct(categoryId: string, index: number) {
  const productName = faker.commerce.productName();

  return {
    name: productName,
    slug: `${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}`,
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 50, max: 3000 })),
    stock: faker.number.int({ min: 0, max: 100 }),
    images: [
      `https://picsum.photos/id/${faker.number.int({ min: 10, max: 200 })}/500/500`,
      `https://picsum.photos/id/${faker.number.int({ min: 10, max: 200 })}/500/500`,
    ],
    isActive: true,
    categoryId,
    features: {
      // ← NUEVO
      Brand: faker.company.name(),
      Model: faker.vehicle.model(),
      Processor: faker.helpers.arrayElement([
        'Intel Core i5-13600K',
        'Intel Core i7-13700K',
        'AMD Ryzen 5 7600X',
        'AMD Ryzen 9 7900X',
      ]),
      RAM: faker.helpers.arrayElement(['8GB', '16GB', '32GB', '64GB']),
      Storage: faker.helpers.arrayElement([
        '256GB SSD',
        '512GB SSD',
        '1TB SSD',
        '2TB HDD',
      ]),
      'Graphics Card': faker.helpers.arrayElement([
        'NVIDIA RTX 4060',
        'NVIDIA RTX 4070',
        'AMD RX 7600',
        'Intel Arc A770',
      ]),
      'Operating System': faker.helpers.arrayElement([
        'Windows 11 Home',
        'Windows 11 Pro',
        'Ubuntu 24.04',
        'No OS',
      ]),
      Warranty: faker.helpers.arrayElement(['6 months', '1 year', '2 years']),
    },
  };
}

async function clean() {
  console.log('🧹 Cleaning existing data...');

  const tables = [
    { name: 'review', label: 'reviews' },
    { name: 'productDiscount', label: 'productDiscounts' },
    { name: 'categoryDiscount', label: 'categoryDiscounts' },
    { name: 'discount', label: 'discounts' },
    { name: 'cartItem', label: 'cartItems' },
    { name: 'orderItem', label: 'orderItems' },
    { name: 'payment', label: 'payments' },
    { name: 'order', label: 'orders' },
    { name: 'cart', label: 'carts' },
    { name: 'product', label: 'products' },
    { name: 'category', label: 'categories' },
  ] as const;

  for (const table of tables) {
    try {
      await (prisma[table.name] as any).deleteMany();
      console.log(`   ✓ Cleaned ${table.label}`);
    } catch {
      console.log(`   ⚠️ ${table.label} not found or empty`);
    }
  }
}

async function seedCategories() {
  console.log('\n📁 Creating categories...');

  const created: Array<Awaited<ReturnType<typeof prisma.category.create>>> = [];
  for (const cat of CATEGORIES) {
    const category = await prisma.category.create({ data: cat });
    created.push(category);
    console.log(`   ✅ ${category.name}`);
  }
  return created;
}

async function seedDiscounts() {
  console.log('\n🏷️  Creating discounts...');

  const created: Array<Awaited<ReturnType<typeof prisma.discount.create>>> = [];
  for (const discount of DISCOUNTS) {
    const created_ = await prisma.discount.create({ data: discount });
    created.push(created_);
    console.log(
      `   ✅ ${created_.name} (${created_.type} - ${created_.value})`,
    );
  }
  return created;
}

async function seedProducts(
  categories: Awaited<ReturnType<typeof prisma.category.create>>[],
  discounts: Awaited<ReturnType<typeof prisma.discount.create>>[],
) {
  console.log('\n📦 Creating products...');
  const PRODUCTS_PER_CATEGORY = 20;
  const activeDiscounts = discounts.filter((d) => d.isActive);
  const allProducts: Awaited<ReturnType<typeof prisma.product.create>>[] = []; // ← NUEVO

  for (const category of categories) {
    console.log(`   Generating products for ${category.name}...`);

    for (let i = 0; i < PRODUCTS_PER_CATEGORY; i++) {
      const product = await prisma.product.create({
        data: generateProduct(category.id, i),
      });

      allProducts.push(product); // ← NUEVO

      if (i % 3 === 0 && activeDiscounts.length > 0) {
        const discount = faker.helpers.arrayElement(activeDiscounts);
        await prisma.productDiscount.create({
          data: { productId: product.id, discountId: discount.id },
        });
      }
    }

    console.log(`   ✅ ${PRODUCTS_PER_CATEGORY} products in ${category.name}`);
  }

  return allProducts; // ← NUEVO
}

async function seedCategoryDiscounts(
  categories: Awaited<ReturnType<typeof prisma.category.create>>[],
  discounts: Awaited<ReturnType<typeof prisma.discount.create>>[],
) {
  console.log('\n🔗 Assigning discounts to categories...');

  const activeDiscounts = discounts.filter((d) => d.isActive);
  if (activeDiscounts.length === 0) return;

  // Una categoría aleatoria con descuento de categoría
  const category = faker.helpers.arrayElement(categories);
  const discount = faker.helpers.arrayElement(activeDiscounts);

  await prisma.categoryDiscount.create({
    data: { categoryId: category.id, discountId: discount.id },
  });

  console.log(
    `   ✅ Discount "${discount.name}" → category "${category.name}"`,
  );
}

async function seedReviews(
  products: Awaited<ReturnType<typeof prisma.product.create>>[],
) {
  console.log('\n⭐ Creating reviews...');

  const REVIEWS_PER_PRODUCT = 5;

  for (const product of products) {
    // No todos los productos tienen reviews (~70%)
    if (faker.number.int({ min: 1, max: 10 }) > 7) continue;

    for (let i = 0; i < REVIEWS_PER_PRODUCT; i++) {
      await prisma.review.create({
        data: {
          productId: product.id,
          rating: faker.number.int({ min: 1, max: 5 }),
          title: faker.helpers.arrayElement([
            'Great product!',
            'Worth every penny',
            'Exceeded my expectations',
            'Good but could be better',
            'Not what I expected',
            'Amazing quality',
            'Fast delivery, great product',
            'Solid purchase',
          ]),
          body: faker.lorem.sentences({ min: 2, max: 4 }),
          author: faker.person.fullName(),
        },
      });
    }
  }

  console.log('   ✅ Reviews created');
}

async function seedCart() {
  console.log('\n🛒 Creating example cart...');

  const existingUser = await prisma.user.findFirst();
  if (!existingUser) {
    console.log('   ⚠️ No users found. Skipping cart.');
    return;
  }

  const cart = await prisma.cart.upsert({
    where: { userId: existingUser.id },
    update: {},
    create: { userId: existingUser.id },
  });

  const sampleProducts = await prisma.product.findMany({ take: 3 });

  for (const product of sampleProducts) {
    try {
      await prisma.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId: product.id } },
        update: { quantity: { increment: 1 } },
        create: {
          cartId: cart.id,
          productId: product.id,
          quantity: faker.number.int({ min: 1, max: 3 }),
          priceSnapshot: product.price,
        },
      });
    } catch {
      console.log(`   ⚠️ Could not create cartItem for ${product.name}`);
    }
  }

  console.log(`   ✅ Cart created for ${existingUser.email}`);
}

async function main() {
  console.log('🌱 Starting database seeding...');

  await clean();
  const categories = await seedCategories();
  const discounts = await seedDiscounts();
  const products = await seedProducts(categories, discounts); // ← recibe products
  await seedCategoryDiscounts(categories, discounts);
  await seedReviews(products); // ← NUEVO
  await seedCart();

  const [productCount, categoryCount, discountCount, reviewCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.discount.count(),
      prisma.review.count(), // ← NUEVO
    ]);

  console.log('\n✨ Seeding completed successfully!');
  console.log(`   📊 ${categoryCount} categories`);
  console.log(`   📊 ${productCount} products`);
  console.log(`   📊 ${discountCount} discounts`);
  console.log(`   📊 ${reviewCount} reviews`); // ← NUEVO
  console.log('\n💡 Run "npx prisma studio" to view the data');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
