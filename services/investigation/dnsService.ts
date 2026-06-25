import type {
  DNSAnswer,
  DNSLookupResponse,
  DNSRecordCollection,
  DNSRecordType,
} from "@/types/api/dns";

const GOOGLE_DNS_ENDPOINT = "https://dns.google/resolve";

const RECORD_TYPES: readonly DNSRecordType[] = [
  "A",
  "AAAA",
  "MX",
  "NS",
  "TXT",
];

interface GoogleDnsAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface GoogleDnsResponse {
  Status: number;
  Answer?: GoogleDnsAnswer[];
}

/**
 * Performs a DNS lookup using Google's DNS-over-HTTPS API.
 */
export async function lookupDNS(
  domain: string,
): Promise<DNSLookupResponse> {
  validateDomain(domain);

  const records = await fetchAllRecordTypes(domain.trim());

  return {
    domain: domain.trim(),
    records,
  };
}

function validateDomain(domain: string): void {
  if (domain.trim().length === 0) {
    throw new Error("A domain name is required.");
  }
}

async function fetchAllRecordTypes(
  domain: string,
): Promise<DNSRecordCollection> {
  const responses = await Promise.all(
    RECORD_TYPES.map(async (recordType) => [
      recordType,
      await fetchRecordType(domain, recordType),
    ] as const),
  );

  return {
    A: responses.find(([type]) => type === "A")?.[1] ?? [],
    AAAA: responses.find(([type]) => type === "AAAA")?.[1] ?? [],
    MX: responses.find(([type]) => type === "MX")?.[1] ?? [],
    NS: responses.find(([type]) => type === "NS")?.[1] ?? [],
    TXT: responses.find(([type]) => type === "TXT")?.[1] ?? [],
  };
}

async function fetchRecordType(
  domain: string,
  recordType: DNSRecordType,
): Promise<DNSAnswer[]> {
  const url = new URL(GOOGLE_DNS_ENDPOINT);

  url.searchParams.set("name", domain);
  url.searchParams.set("type", recordType);

  let response: Response;

  try {
    response = await fetch(url.toString(), {
      headers: {
        Accept: "application/dns-json",
      },
      cache: "no-store",
    });
  } catch {
    throw new Error(
      `Network error while retrieving ${recordType} records.`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `DNS provider returned ${response.status} for ${recordType} records.`,
    );
  }

  let payload: GoogleDnsResponse;

  try {
    payload = (await response.json()) as GoogleDnsResponse;
  } catch {
    throw new Error("DNS provider returned an invalid response.");
  }

  if (!Array.isArray(payload.Answer)) {
    return [];
  }

  return payload.Answer.map((answer) => ({
    name: answer.name,
    type: recordType,
    ttl: answer.TTL,
    data: answer.data,
  }));
}