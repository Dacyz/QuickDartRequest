import { DashboardProvider } from "../dashboard-context";
import LineSeparator from "../../components/other/line-separator";
import List from "../../components/sections/list";
import QueryPage from "../../components/sections/query";

export default function Home() {
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
