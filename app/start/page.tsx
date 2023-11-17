import { DashboardProvider } from "../../context/context";
import Application from "@/components/Application";

export default function Home() {
  return (
    <DashboardProvider>
      <Application/>
    </DashboardProvider>
  );
}
