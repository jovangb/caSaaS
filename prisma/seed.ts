import { PrismaClient } from "@prisma/client";
import { seedTenants } from "./seeds/tenants.seed";
import { seedUsers } from "./seeds/users.seed";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const tenants = await seedTenants(prisma);
  await seedUsers(prisma, tenants);
}

main()
  .then(() => {
    console.log("Seed completed");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
