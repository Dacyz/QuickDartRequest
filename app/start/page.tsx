"use client";
import { DashboardProvider } from "../../data/context/context";
import Application from "@/app/start/components/Application";

import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || undefined;
  const body = searchParams.get("body") || undefined;
  const method = searchParams.get("method") || undefined;
  return (
    <DashboardProvider
      url={url}
      body={body}
      method={method?.toLowerCase() ?? undefined}
    >
      <Application />
    </DashboardProvider>
  );
}
