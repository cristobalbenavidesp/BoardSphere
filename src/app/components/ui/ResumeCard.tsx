import { MdOutlineArrowDownward as DownwardArrow } from "react-icons/md";

function ResumeCard({ children }: { children: React.ReactNode }) {
  return (
    <article className="resume-card grid grid-cols-1 overflow-hidden text-black">
      <div className="w-full h-full px-5 pt-10 flex flex-col gap-3">
        {children}
      </div>
      <div className="h-12 w-full py-2 bg-primary/40 text-center font-semibold self-end">
        Ver más
        <DownwardArrow className="mx-auto" />
      </div>
    </article>
  );
}

export default ResumeCard;
