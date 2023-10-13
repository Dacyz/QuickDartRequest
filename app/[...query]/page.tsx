"use client";
import List from "@/components/sections/list";
import { DashboardProvider } from "../dashboard-context";
import Home from "../start/page";
import LineSeparator from "@/components/other/line-separator";
import QueryPage from "@/components/sections/query";

const separator: string = ":";

export default function Page() {
  const origin = window.location.origin;
  const fullURL = window.location.href;
  const value = fullURL.substring(origin.length + 1);
  console.log(value);
  const parts = value.split(separator);

  // Verificar si la URL cumple con el formato esperado y si el método está en el conjunto permitido
  if (parts.length >= 2) {
    const method = parts[0].toLowerCase(); // Convertir a minúsculas
    const endpoint = value.substring(parts[0].length + 1);

    // Conjunto de métodos permitidos en minúsculas
    const allowedMethods = ["get", "post", "put", "delete"];

    if (allowedMethods.includes(method)) {
      return (
        <DashboardProvider>
          <div className="flex w-screen h-screen">
            <List />
            <LineSeparator />
            <QueryPage
              method={allowedMethods.indexOf(method)}
              query={endpoint}
            />
          </div>
        </DashboardProvider>
      );
    }
  }
  // La URL no cumple con el formato esperado o el método no es válido, mostrar mensaje de error
  return Home();
}
