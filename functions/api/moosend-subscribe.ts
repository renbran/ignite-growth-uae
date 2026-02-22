// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onRequest = async (context: any) => {
  if (context.request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = context.env?.MOOSEND_API_KEY;
  if (!apiKey) {
    return new Response("Moosend API key not configured", { status: 500 });
  }

  let payload: { email?: string } = {};
  try {
    payload = await context.request.json();
  } catch (error) {
    console.error("Moosend request parse error:", error);
    return new Response("Invalid JSON body", { status: 400 });
  }

  if (!payload.email) {
    return new Response("Email is required", { status: 400 });
  }

  const listId = "245fb69b-c91e-4a53-b878-db6741bc6101";
  const url = new URL(
    `https://api.moosend.com/v3/subscribers/${listId}/subscribe.json`
  );
  url.searchParams.set("apikey", apiKey);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: payload.email,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Moosend API error:", response.status, errorText);
    return new Response("Moosend subscribe failed", { status: 502 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
