const modes = ["Params", "Authorization", "Headers", "Body"];
const authModes = [
  "No auth",
  "API Key",
  "Basic Auth",
  "Bearer Token",
  "OAuth 2.0",
]; // Falta "Inherit from parent" y "AWS Signature"
const bodyModes = [
  "None",
  "Form-data",
  "x-www-form-urlencoded",
  "Raw",
  "Binary",
]; // Falta "Inherit from parent" y "GraphQL"

export { modes, authModes, bodyModes };
