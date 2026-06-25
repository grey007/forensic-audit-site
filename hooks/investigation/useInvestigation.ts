"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CHECKPOINTS } from "@/lib/constants";
import { lookupDNS } from "@/services/api/investigationClient";
import type { DNSLookupResponse } from "@/types/api/dns";
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
    dnsResult: null,
    error: null,
  });

  const checkpointIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const lookupCompletionRef = useRef<boolean>(false);
  const timerCompletionRef = useRef<boolean>(false);

  const clearTimers = useCallback((): void => {
    if (checkpointIntervalRef.current !== null) {
      clearInterval(checkpointIntervalRef.current);
      checkpointIntervalRef.current = null;
    }

    if (completionTimeoutRef.current !== null) {
      clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = null;
    }

    lookupCompletionRef.current = false;
    timerCompletionRef.current = false;
  }, []);

  const setDomain = useCallback((domain: string): void => {
    setState((previous) => ({
      ...previous,
      domain,
      error: null,
    }));
  }, []);

  const resetInvestigation = useCallback((): void => {
    clearTimers();

    setState(() => ({
      viewState: "idle",
      domain: "",
      currentCheckpointIndex: 0,
      currentCheckpoint: CHECKPOINTS[0],
      isScanning: false,
      dnsResult: null,
      error: null,
    }));
  }, [clearTimers]);

  const maybeCompleteInvestigation = useCallback((): void => {
    if (lookupCompletionRef.current && timerCompletionRef.current) {
      setState((previous) => ({
        ...previous,
        viewState: "notesRendered",
        isScanning: false,
      }));
    }
  }, []);

  const setInvestigationResult = useCallback(
    (dnsResult: DNSLookupResponse | null, error: string | null): void => {
      lookupCompletionRef.current = true;

      setState((previous) => ({
        ...previous,
        dnsResult,
        error,
      }));

      maybeCompleteInvestigation();
    },
    [maybeCompleteInvestigation],
  );

  const performDnsLookup = useCallback(
    async (domain: string): Promise<void> => {
      try {
        const result = await lookupDNS(domain);
        setInvestigationResult(result, null);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "DNS lookup failed unexpectedly.";

        setInvestigationResult(null, message);
      }
    },
    [setInvestigationResult],
  );

  const startInvestigation = useCallback((): void => {
    clearTimers();

    const normalizedDomain = state.domain.trim();

    setState((previous) => ({
      ...previous,
      viewState: "scanning",
      currentCheckpointIndex: 0,
      currentCheckpoint: CHECKPOINTS[0],
      isScanning: true,
      dnsResult: null,
      error: null,
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
      timerCompletionRef.current = true;
      maybeCompleteInvestigation();
    }, INVESTIGATION_DURATION_MS);

    if (normalizedDomain.length > 0) {
      void performDnsLookup(normalizedDomain);
    } else {
      lookupCompletionRef.current = true;
      setState((previous) => ({
        ...previous,
        error: "Domain is required.",
      }));
      maybeCompleteInvestigation();
    }
  }, [clearTimers, maybeCompleteInvestigation, performDnsLookup, state.domain]);

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