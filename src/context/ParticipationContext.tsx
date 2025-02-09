"use client";
import { ReactNode, createContext, useState } from "react";
import { participationTypes } from "../constants/democratic";
import { Clause, Participation } from "@prisma/client";

export interface ParticipationContextType {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  pOptions: string[];
  participation: Partial<Participation>;
  setParticipation: (
    value: Partial<Participation> | ((prev: any) => void)
  ) => void;
  setParticipationType: (value: Participation["type"]) => void;
  participationClause: Clause;
  setParticipationClause: (value: Clause) => void;
}
export const participationModalContext =
  createContext<ParticipationContextType | null>(null);

export const ParticipationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showModal, setShowModal] = useState(false);
  const pOptions = ["Apruebo", "Rechazo", "Abstención"];
  const [participation, setParticipation] = useState<Partial<Participation>>({
    type: participationTypes.APPROVE,
  });
  const [participationClause, setParticipationClause] = useState<Clause | null>(
    null
  );

  const setParticipationType = (value: string) => {
    setParticipation((prev) => ({ ...prev, type: value }));
  };

  return (
    <participationModalContext.Provider
      value={
        {
          showModal,
          setShowModal,
          pOptions,
          participation,
          setParticipation,
          setParticipationType,
          participationClause,
          setParticipationClause,
        } as ParticipationContextType
      }
    >
      {children}
    </participationModalContext.Provider>
  );
};
