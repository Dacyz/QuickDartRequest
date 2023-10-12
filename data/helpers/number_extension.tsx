function generateRandomId(): number {
  const min = 10000; // Valor mínimo de 5 dígitos
  const max = 99999; // Valor máximo de 5 dígitos
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { generateRandomId };
