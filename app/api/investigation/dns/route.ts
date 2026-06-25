import { NextResponse } from "next/server";

import type { DNSLookupError } from "@/types/api/dns";
import { lookupDNS } from "@/services/investigation";

/**
 * Handles DNS investigation requests.
 */
export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain")?.trim();

  if (!domain) {
    const error: DNSLookupError = {
      message: "Domain is required.",
      code: "INVALID_DOMAIN",
    };

    return NextResponse.json(error, { status: 400 });
  }

  try {
    const result = await lookupDNS(domain);

    return NextResponse.json(result, { status: 200 });
  } catch {
    const error: DNSLookupError = {
      message: "Unable to complete DNS lookup.",
      code: "DNS_LOOKUP_FAILED",
    };

    return NextResponse.json(error, { status: 500 });
  }
}