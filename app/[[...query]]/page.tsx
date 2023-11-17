import { DashboardProvider } from "../../context/context";
import Application from "@/components/Application";

export default function Page() {
  return (
    <DashboardProvider>
      <Application/>
    </DashboardProvider>
  );
}
