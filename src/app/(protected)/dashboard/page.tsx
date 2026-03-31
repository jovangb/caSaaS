import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "SUPER_ADMIN") {
    redirect("/super/dashboard");
  }

  redirect("/admin/dashboard");
}
