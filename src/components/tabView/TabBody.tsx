"use client";
import { useSearchParams } from "next/navigation";
import { ViewType } from "./types";

function TabBody({ tabs }: { tabs: ViewType[] }) {
  const activeTabName = useSearchParams().get("tab") || tabs[0].name;
  const activeTab = tabs.findIndex((tab) => tab.name === activeTabName);
  return <div className="border w-full h-fit">{tabs[activeTab].component}</div>;
}

export default TabBody;
