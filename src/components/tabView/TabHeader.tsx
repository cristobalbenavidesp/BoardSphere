"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import type { ViewType } from "./types";
import { useState } from "react";
export function TabHeader({ tabs }: { tabs: ViewType[] }) {
  const activeTabName = useSearchParams().get("tab") || tabs[0].name;
  const router = useRouter();
  const pathName = usePathname();
  const [activeTab, setActiveTab] = useState(
    tabs.findIndex((tab) => tab.name === activeTabName)
  );

  return (
    <header>
      <ul className="flex border-b-[1rem] border-blue-900 p-0">
        {tabs.map((tab, index) => {
          return (
            <li key={tab.name} className="m-0 p-0">
              <button
                key={index}
                onClick={() => {
                  setActiveTab(index);
                  router.replace(`${pathName}?tab=${tab.name}`);
                }}
                className={
                  activeTab === index
                    ? "w-fit h-full rounded-t-lg px-4 py-1 bg-blue-900 text-white"
                    : "w-fit h-full rounded-t-lg px-4 py-1 hover:bg-slate-400/10 bg-white text-blue-900 border"
                }
              >
                {tab.name}
              </button>
            </li>
          );
        })}
      </ul>
    </header>
  );
}

export default TabHeader;
