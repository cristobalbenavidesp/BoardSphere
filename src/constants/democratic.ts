export const projectInvitationTypeOptions = [
  "open",
  "only_creator",
  "all_members",
];

export const projectInvitationTypes = {
  OPEN: "open",
  ONLY_CREATOR: "only_creator",
  ALL_MEMBERS: "all_members",
};

export const participationTypes = {
  APPROVE: "approve",
  REJECT: "reject",
};

export const participationTypeOptions = Object.entries(participationTypes).map(
  ([, value]) => value
);

export const tabOptions = {
  PUBLIC: "Público",
  INSCRIBED: "Inscrito",
  CREATED: "Creado",
  INVITED: "Invitado",
};

export const clauseStatuses = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const projectInvitationStatuses = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};
