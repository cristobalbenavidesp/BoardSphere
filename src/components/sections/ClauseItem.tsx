"use client";
import { useSession } from "@/hooks/useSession";
import ParticipateModal from "../modal/ParticipateModal";
import Button from "../ui/Button";
import type { Article, Clause } from "@prisma/client";
import { useState } from "react";

const clauseStatuses = {
  PENDING: "pending",
  ACCEPTED: "approved",
  REJECTED: "rejected",
};

function ClauseItem({ clause, article }: { clause: Clause; article: Article }) {
  const { session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const colors = {
    [clauseStatuses.ACCEPTED]: "bg-green-300/40",
    [clauseStatuses.PENDING]: "bg-gray-300/20",
    [clauseStatuses.REJECTED]: "bg-red-300/40",
  };

  return (
    <>
      <article
        className={`indent-3 relative w-full h-fit hover:bg-gray-300/20 p-1 rounded flex ${
          colors[clause.status] || undefined
        }`}
      >
        <span className="font-semibold italic whitespace-nowrap">
          {clause.id}.-
        </span>
        <p className="italic">{clause.description}</p>

        {clause.status === clauseStatuses.PENDING &&
          article.user_rut !== session?.RUT && (
            <Button
              className="bg-white py-1 ml-auto h-fit text-sm"
              method={() => {
                setShowModal(true);
              }}
            >
              Participar
            </Button>
          )}
      </article>
      <ParticipateModal
        clause={clause}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
}

export default ClauseItem;
