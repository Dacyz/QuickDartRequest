import { DashboardProvider } from "../../context/context";
import LineSeparator from "../../components/other/line-separator";
import List from "../../components/sections/list";
import QueryPage from "../../components/sections/query";
import Link from "next/link";

export default function Page() {
  return (
    <DashboardProvider>
      <div className="flex w-screen h-screen">
        <List />
        <LineSeparator />
        <QueryPage />
      </div>
      <div className="absolute bottom-4 right-4 opacity-0 hover:opacity-90 transition-opacity">
        <Link href={"/about"}>Acerca de</Link>
      </div>
    </DashboardProvider>
  );
}
