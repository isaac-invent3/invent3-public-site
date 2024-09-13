export async function POST(request: Request) {
  const body = await request.json();

  const payload = {
    accessToken: body.accessToken,
    refreshToken: body.refreshToken,
    apiKey: body.apiKey,
  };
  console.log({ refreshPayLoad: payload });
  const res = await fetch(`${process.env.API_BASE_URL}/refresh-tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${body.accessToken}`,
      ApiKey: `${body.apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return Response.json({
    success: res.ok,
    status: res.status,
    data,
  });
}
