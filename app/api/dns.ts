/**
 * Supported DNS record types.
 */
export type DNSRecordType = "A" | "AAAA" | "MX" | "NS" | "TXT";

/**
 * Represents a single DNS answer returned by a DNS provider.
 */
export interface DNSAnswer {
  /**
   * Fully qualified domain name associated with the record.
   */
  name: string;

  /**
   * DNS record type.
   */
  type: DNSRecordType;

  /**
   * Time-to-live in seconds.
   */
  ttl: number;

  /**
   * Record payload as returned by the provider.
   */
  data: string;
}

/**
 * Groups DNS answers by record type.
 */
export interface DNSRecordCollection {
  A: DNSAnswer[];
  AAAA: DNSAnswer[];
  MX: DNSAnswer[];
  NS: DNSAnswer[];
  TXT: DNSAnswer[];
}

/**
 * Standard DNS lookup response returned by the service layer.
 */
export interface DNSLookupResponse {
  /**
   * Domain that was queried.
   */
  domain: string;

  /**
   * DNS records grouped by record type.
   */
  records: DNSRecordCollection;
}

/**
 * Structured DNS lookup error.
 */
export interface DNSLookupError {
  /**
   * Human-readable error description.
   */
  message: string;

  /**
   * Stable machine-readable error code.
   */
  code: string;
}