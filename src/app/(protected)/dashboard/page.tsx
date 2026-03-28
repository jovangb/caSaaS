"use client";
import { useSession } from "next-auth/react";

export default function DebugSessionPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Cargando sesión...</p>;
  if (!session) return <p>No has iniciado sesión.</p>;

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Datos de tu Sesión</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>

      <div className="mt-4 border-t pt-4">
        <p><strong>Usuario:</strong> {session.user?.name}</p>
        <p><strong>Tu Rol:</strong> <span className="text-blue-600 font-bold">{session.user?.role}</span></p>
        <p><strong>ID del Fraccionamiento (Tenant):</strong> {session.user?.tenantId}</p>
      </div>
    </div>
  );
}