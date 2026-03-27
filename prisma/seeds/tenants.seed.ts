import { PrismaClient } from "@prisma/client";

export async function seedTenants(prisma: PrismaClient) {
  await prisma.tenant.createMany({
    data: [
      {
        name: "Residencial Punta Azul",
        slug: "punta-azul",
        address: "Cancún",
      },
      {
        name: "Residencial Bosque Real",
        slug: "bosque-real",
        address: "CDMX",
      },
    ],
  });

  return prisma.tenant.findMany();
}
