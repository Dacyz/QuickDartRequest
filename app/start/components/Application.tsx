"use client";
import { useDashboardContext } from "@/context/context";
import LineSeparator from "../../../utils/components/line-separator";
import ListRequest from "./ListRequest";
import QueryRequest from "./QueryRequest";

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
      <QueryRequest />
      <LineSeparator />
      <ListRequest />
    </div>
  ) : (
    <div className="flex w-screen h-screen">
      <ListRequest />
      <LineSeparator />
      <QueryRequest />
    </div>
  );
};

export default Application;
