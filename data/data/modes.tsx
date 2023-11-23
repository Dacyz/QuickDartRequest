const modes = ["Params", "Authorization", "Headers", "Body"];
const authModes = ["No auth", "API Key", "Bearer Token"]; // Falta "Inherit from parent" "Basic Auth" "OAuth 2.0" y "AWS Signature"
const bodyModes = ["None", "Form-data", "Raw", "Binary"]; // Falta "x-www-form-urlencoded", "Inherit from parent" y "GraphQL"

export { modes, authModes, bodyModes };
