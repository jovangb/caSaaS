"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    await signIn("credentials", { email, password, callbackUrl: "/dashboard", redirect: true, });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-10 shadow-lg rounded-xl space-y-4">
        <h1 className="text-xl font-bold">Casaas Login</h1>
        <input name="email" type="email" placeholder="Email" className="block w-full border p-2" required />
        <input name="password" type="password" placeholder="Password" className="block w-full border p-2" required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Sign In</button>
      </form>
    </main>
  );
}