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