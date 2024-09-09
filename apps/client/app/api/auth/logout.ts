import { cookies } from 'next/headers';

export async function POST(request: any) {
  const body = await request.json();

  const res = await fetch(
    `${process.env.API_BASE_URL}/Users/LogOut/${body.sessionId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${body.accessToken}`,
        ApiKey: `${body.apiKey}`,
      },
    }
  );

  const prefix = process.env.NODE_ENV === 'development' ? '__Dev-' : '';
  // remove cookies after
  cookies()
    .getAll()
    .map((cookie) => {
      if (cookie.name.startsWith(`${prefix}xxx.`))
        cookies().delete(cookie.name as any);
    });

  return Response.json({
    success: res.ok,
    status: res.status,
  });
}
