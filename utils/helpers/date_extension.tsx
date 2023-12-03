// Función para convertir timestamps en fechas
function getDayFromDate(timestamp?: number): string {
  if (timestamp == null || timestamp < 1) return "";
  const date = new Date(timestamp);
  // Formatear la fecha como "YYYY-MM-DD" (puedes ajustar el formato según tu preferencia)
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export { getDayFromDate };