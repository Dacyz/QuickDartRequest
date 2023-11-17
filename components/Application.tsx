"use client";
import { useDashboardContext } from "@/context/context";
import LineSeparator from "./other/line-separator";
import List from "./sections/list";
import QueryPage from "./sections/query";

const Application: React.FC = () => {
  const { userSettings, loadingData } = useDashboardContext();
  if (loadingData === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white gap-2 w-screen h-screen">
        <div className="animate-spin rounded-full border-t-4 border-white h-16 w-16" />
        Loading your resources
      </div>
    );
  }
  return userSettings.sideBarAlign ? (
    <div className="flex w-screen h-screen">
      <QueryPage />
      <LineSeparator />
      <List />
    </div>
  ) : (
    <div className="flex w-screen h-screen">
      <List />
      <LineSeparator />
      <QueryPage />
    </div>
  );
};

export default Application;
