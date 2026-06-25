import type {
  DNSLookupError,
  DNSLookupResponse,
} from "@/types/api/dns";

const DNS_ENDPOINT = "/api/investigation/dns";

/**
 * Looks up DNS records for the supplied domain.
 */
export async function lookupDNS(
  domain: string,
): Promise<DNSLookupResponse> {
  const normalizedDomain = domain.trim();

  if (normalizedDomain.length === 0) {
    throw new Error("Domain is required.");
  }

  const url = new URL(DNS_ENDPOINT, window.location.origin);
  url.searchParams.set("domain", normalizedDomain);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const payload: unknown = await response.json();

  if (!response.ok) {
    const error = payload as DNSLookupError;
    throw new Error(error.message);
  }

  return payload as DNSLookupResponse;
}