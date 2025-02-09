import { ViewType } from "./types";
import TabHeader from "./TabHeader";
import TabBody from "./TabBody";

export default function TabView({ views }: { views: ViewType[] }) {
  return (
    <div className="w-full h-full">
      <TabHeader tabs={views} />
      <TabBody tabs={views} />
    </div>
  );
}
