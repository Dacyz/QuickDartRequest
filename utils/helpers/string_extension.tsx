const separator: string = ":";
const listRequest: string = "ListRequest";
const listCategories: string = "ListCategories";
const listSettings: string = "Settings";
const allowedMethods: string[] = ["get", "post", "put", "delete"];

function firstToUpperCase(str: string): string {
  if (str.length === 0) {
    return str; // Devuelve una cadena vacía si no se proporciona ninguna cadena
  }

  // Convierte la primera letra a mayúscula y concatena el resto de la cadena
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export {
  firstToUpperCase,
  separator,
  listRequest,
  listCategories,
  listSettings,
  allowedMethods,
};
