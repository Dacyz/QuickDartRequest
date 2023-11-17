import ConfigConvert from "./config_model";

export default interface UserSettings {
  userName: string;
  sideBarAlign: boolean | "left" | "right";
  showExplanation: boolean;
  configConvert: ConfigConvert;
}

function copyWithSettings(
  originalSettings: UserSettings,
  updates: Partial<UserSettings>
): UserSettings {
  return {
    userName: updates.userName ?? originalSettings.userName,
    sideBarAlign: updates.sideBarAlign ?? originalSettings.sideBarAlign,
    showExplanation:
      updates.showExplanation ?? originalSettings.showExplanation,
    configConvert: updates.configConvert ?? originalSettings.configConvert,
  };
}

export { copyWithSettings };
