"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function registerTenant(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const adminName = formData.get("adminName") as string;
  const complexName = formData.get("complexName") as string;

  // 1. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 2. Create tenant and user in one transaction
  try {
    const newTenant = await prisma.tenant.create({
      data: {
        name: complexName,
        slug: complexName.toLowerCase().replace(/\s+/g, "-"), //Generates names with dash
        users: {
          create: {
            email,
            password: hashedPassword,
            name: adminName,
            role: "ADMIN",
          },
        },
      },
    });

    return {
      success: true,
      tenantId: newTenant.id,
      message: "Creado con éxito",
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al crear el registro" };
  }
}

export async function validateUser(email: string, pass: string) {
  // 1. Search for the user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  // 2. Check password
  const match = await bcrypt.compare(pass, user.password);
  
  // 3. Return user if password matches
  return match ? user : null;
}