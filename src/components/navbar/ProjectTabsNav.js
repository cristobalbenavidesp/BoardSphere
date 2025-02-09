import { tabOptions } from "../../constants/democratic";

function ProjectsTabsNav({ tab, setTab }) {
  return (
    <div className="relative flex after:border-b after:w-full after:absolute after:left-0 after:bottom-0">
      {Object.entries(tabOptions)?.map(([key, option]) => (
        <button
          key={key}
          className={`text-xl font-bold px-2 transition-colors rounded-t-md ${
            tab === option
              ? "border-b-4 pb-2 border-contrast bg-contrast text-white"
              : ""
          }`}
          onClick={() => {
            setTab(option);
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default ProjectsTabsNav;
