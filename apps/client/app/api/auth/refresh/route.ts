export async function POST(request: Request) {
  const body = await request.json();

  const payload = {
    accessToken: body.accessToken,
    refreshToken: body.refreshToken,
    apiKey: body.apiKey,
  };
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/Invent3Pro/refresh-tokens`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${body.accessToken}`,
        ApiKey: `${body.apiKey}`,
        ...(body.companySlug ? { 'X-Tenant-ID': body.companySlug } : {}),
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  return Response.json({
    success: res.ok,
    status: res.status,
    data,
  });
}
