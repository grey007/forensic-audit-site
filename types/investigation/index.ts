export type InvestigationViewState =
  | "idle"
  | "scanning"
  | "notesRendered";

export interface InvestigationState {
  viewState: InvestigationViewState;
  domain: string;
  currentCheckpointIndex: number;
  currentCheckpoint: string;
  isScanning: boolean;
  dnsResult: import("@/types/api/dns").DNSLookupResponse | null;
  error: string | null;
}

export interface InvestigationActions {
  setDomain: (domain: string) => void;
  startInvestigation: () => void;
  resetInvestigation: () => void;
}

export interface UseInvestigationResult {
  state: InvestigationState;
  actions: InvestigationActions;
}