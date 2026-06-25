"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CHECKPOINTS } from "@/lib/constants";
import type {
  InvestigationState,
  UseInvestigationResult,
} from "@/types/investigation";

const INVESTIGATION_DURATION_MS = 20_000;
const CHECKPOINT_INTERVAL_MS = 2_000;

export function useInvestigation(): UseInvestigationResult {
  const [state, setState] = useState<InvestigationState>({
    viewState: "idle",
    domain: "",
    currentCheckpointIndex: 0,
    currentCheckpoint: CHECKPOINTS[0],
    isScanning: false,
  });

  const checkpointIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearTimers = useCallback((): void => {
    if (checkpointIntervalRef.current !== null) {
      clearInterval(checkpointIntervalRef.current);
      checkpointIntervalRef.current = null;
    }

    if (completionTimeoutRef.current !== null) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }
  }, []);

  const setDomain = useCallback((domain: string): void => {
    setState((previous) => ({
      ...previous,
      domain,
    }));
  }, []);

  const resetInvestigation = useCallback((): void => {
    clearTimers();

    setState((previous) => ({
      ...previous,
      viewState: "idle",
      currentCheckpointIndex: 0,
      currentCheckpoint: CHECKPOINTS[0],
      isScanning: false,
    }));
  }, [clearTimers]);

  const startInvestigation = useCallback((): void => {
    clearTimers();

    setState((previous) => ({
      ...previous,
      viewState: "scanning",
      currentCheckpointIndex: 0,
      currentCheckpoint: CHECKPOINTS[0],
      isScanning: true,
    }));

    checkpointIntervalRef.current = setInterval(() => {
      setState((previous) => {
        const nextIndex =
          (previous.currentCheckpointIndex + 1) % CHECKPOINTS.length;

        return {
          ...previous,
          currentCheckpointIndex: nextIndex,
          currentCheckpoint: CHECKPOINTS[nextIndex],
        };
      });
    }, CHECKPOINT_INTERVAL_MS);

    completionTimeoutRef.current = setTimeout(() => {
      clearTimers();

      setState((previous) => ({
        ...previous,
        viewState: "notesRendered",
        isScanning: false,
      }));
    }, INVESTIGATION_DURATION_MS);
  }, [clearTimers]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  return {
    state,
    actions: {
      setDomain,
      startInvestigation,
      resetInvestigation,
    },
  };
}