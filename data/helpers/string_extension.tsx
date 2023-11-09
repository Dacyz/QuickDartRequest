function firstToUpperCase(str: string): string {
  if (str.length === 0) {
    return str; // Devuelve una cadena vacía si no se proporciona ninguna cadena
  }

  // Convierte la primera letra a mayúscula y concatena el resto de la cadena
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { firstToUpperCase };
