import { DashboardProvider } from "../../context/context";
import LineSeparator from "../../components/other/line-separator";
import List from "../../components/sections/list";
import QueryPage from "../../components/sections/query";

export default function Page() {
  return (
    <DashboardProvider>
      <div className="flex w-screen h-screen">
        <List />
        <LineSeparator />
        <QueryPage />
      </div>
    </DashboardProvider>
  );
}
