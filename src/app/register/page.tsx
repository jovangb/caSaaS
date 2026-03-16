"use client";

import { useActionState } from "react";
import { registerTenant } from "@/app/actions/auth";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerTenant, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registro de Administrador
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Crea una cuenta para tu fraccionamiento
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
          <div className="space-y-4 rounded-md shadow-sm">
            <input
              name="complexName"
              placeholder="Nombre del Fraccionamiento"
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <input
              name="adminName"
              placeholder="Tu nombre completo"
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <input
              name="email"
              type="email"
              placeholder="Email administrativo"
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Procesando...
                </span>
              ) : (
                "Crear cuenta"
              )}
            </button>
          </div>

          {/* {state?.success && (
            <div className="rounded-md bg-green-50 p-3">
              <p className="text-center text-sm font-medium text-green-800">
                ¡Registro exitoso!
              </p>
            </div>
          )}
          
          {state?.success === false && (
            <div className="rounded-md bg-red-50 p-3">
              <p className="text-center text-sm font-medium text-red-800">
                {state.message}
              </p>
            </div>
          )} */}
        </form>
      </div>
    </div>
  );
}