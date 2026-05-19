const ADSENSE_CERTIFICATION_AUTHORITY_ID = "f08c47fec0942fa0";

export function GET() {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const publisherId = adsenseClient?.replace(/^ca-/, "");
  const body = publisherId
    ? `google.com, ${publisherId}, DIRECT, ${ADSENSE_CERTIFICATION_AUTHORITY_ID}\n`
    : "";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
