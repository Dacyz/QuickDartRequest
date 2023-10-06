"use client";
import { usePathname } from "next/navigation";

export default function Post() {
  const query = usePathname();

  // Eliminar el carácter "/" al principio (si existe)
  const cleanedQuery = query.startsWith("/") ? query.slice(1) : query;

  // Separar la URL en partes utilizando ":" como separador
  const parts = cleanedQuery.split(":");

  // Verificar si la URL cumple con el formato esperado y si el método está en el conjunto permitido
  if (parts.length === 2) {
    const method = parts[0].toLowerCase(); // Convertir a minúsculas
    const endpoint = parts[1];

    // Conjunto de métodos permitidos en minúsculas
    const allowedMethods = ["get", "post", "put", "delete"];

    if (allowedMethods.includes(method)) {
      // El método es válido, crear el objeto JSON
      const json = {
        Method: method,
        Endpoint: endpoint,
      };

      // Mostrar el objeto JSON
      return <div>Miauu {JSON.stringify(json)}</div>;
    }
  }

  // La URL no cumple con el formato esperado o el método no es válido, mostrar mensaje de error
  return <div>No cumple con el formato esperado o el método no es válido.</div>;
}
