import { Prisma, PrismaClient, Role, Tenant } from "@prisma/client";
import bcrypt from "bcrypt";

type SeedUser = {
  email: string;
  name: string;
  role: Role;
};

export async function seedUsers(prisma: PrismaClient, tenants: Tenant[]) {
  const password = await bcrypt.hash("123456", 10);

  for (const tenant of tenants) {
    const users: SeedUser[] = [
      {
        email: `admin@${tenant.slug}.com`,
        name: "Admin",
        role: Role.ADMIN,
      },
      {
        email: `guard1@${tenant.slug}.com`,
        name: "Guardia 1",
        role: Role.GUARD,
      },
      {
        email: `guard2@${tenant.slug}.com`,
        name: "Guardia 2",
        role: Role.GUARD,
      },
      {
        email: `resident1@${tenant.slug}.com`,
        name: "Residente 1",
        role: Role.RESIDENT,
      },
      {
        email: `resident2@${tenant.slug}.com`,
        name: "Residente 2",
        role: Role.RESIDENT,
      },
      {
        email: `resident3@${tenant.slug}.com`,
        name: "Residente 3",
        role: Role.RESIDENT,
      },
    ];

    for (const user of users) {
      await prisma.user.create({
        data: {
          email: user.email,
          password: password,
          name: user.name,
          active: true,
          role: user.role,
          tenantId: tenant.id,
        },
      });
    }
  }

  await prisma.user.create({
    data: {
      email: "potus@usa.com",
      password: password,
      name: "POTUS",
      active: true,
      role: "SUPER_ADMIN",
    },
  });
}
