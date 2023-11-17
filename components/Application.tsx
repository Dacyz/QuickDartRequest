'use client';
import { useDashboardContext } from "@/context/context";
import LineSeparator from "./other/line-separator";
import List from "./sections/list";
import QueryPage from "./sections/query";

const Application: React.FC = () => {
  const { userSettings } = useDashboardContext();

  return (
    <>
      <div className="flex w-screen h-screen">
        {userSettings.sideBarAlign ? (
          <></>
        ) : (
          <>
            <List />
            <LineSeparator />
          </>
        )}
        <QueryPage />
        {!userSettings.sideBarAlign ? (
          <></>
        ) : (
          <>
            <LineSeparator />
            <List />
          </>
        )}
      </div>
    </>
  );
};

export default Application;
