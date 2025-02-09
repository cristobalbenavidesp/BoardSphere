import { useContext } from "react";
import {
  participationModalContext,
  ParticipationContextType,
} from "../context/ParticipationContext";

export default function useParticipationModal() {
  const context: ParticipationContextType | null = useContext(
    participationModalContext
  );
  if (!context) {
    throw new Error(
      "useParticipationModal must be used within a ParticipationModalProvider"
    );
  }
  return context;
}
