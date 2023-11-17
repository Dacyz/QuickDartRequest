export default interface ConfigConvert {
  generateToJson: boolean;
  generateCopyWith: boolean;
  generateToString: boolean;
  useDefaultValue: boolean;
  useEquatable: boolean;
  useSerializable: boolean;
  useNum: boolean;
  generateKey: boolean;
  generateJsonComment: boolean;
  propertiesNullable: boolean;
  useDefaultProperties: boolean;
}

function copyWith(
  originalConfig: ConfigConvert,
  updates: Partial<ConfigConvert>
): ConfigConvert {
  return {
    generateToJson: updates.generateToJson ?? originalConfig.generateToJson,
    generateCopyWith:
      updates.generateCopyWith ?? originalConfig.generateCopyWith,
    generateToString:
      updates.generateToString ?? originalConfig.generateToString,
    useDefaultValue: updates.useDefaultValue ?? originalConfig.useDefaultValue,
    useEquatable: updates.useEquatable ?? originalConfig.useEquatable,
    useSerializable: updates.useSerializable ?? originalConfig.useSerializable,
    useNum: updates.useNum ?? originalConfig.useNum,
    generateKey: updates.generateKey ?? originalConfig.generateKey,
    generateJsonComment:
      updates.generateJsonComment ?? originalConfig.generateJsonComment,
    propertiesNullable:
      updates.propertiesNullable ?? originalConfig.propertiesNullable,
    useDefaultProperties:
      updates.useDefaultProperties ?? originalConfig.useDefaultProperties,
  };
}

export { copyWith };
