const allowedOrigin = "https://thelight.pages.dev";

function handleOptions(request) {
  const headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS preflight requests.
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: "POST, OPTIONS",
      },
    });
  }
}

async function handleRequest(request, env) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response("Missing required fields", { status: 400 });
    }

    const emailData = {
      personalizations: [
        {
          to: [{ email: env.TO_EMAIL }],
        },
      ],
      from: { email: env.FROM_EMAIL, name: "Contact Form" },
      subject: `New message from ${name}`,
      content: [
        {
          type: "text/plain",
          value: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        },
      ],
    };

    const response = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.status === 202) {
      return new Response("Email sent successfully", { status: 200 });
    } else {
      const errorText = await response.text();
      return new Response(`Failed to send email: ${errorText}`, {
        status: response.status,
      });
    }
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return handleOptions(request);
    }

    const response = await handleRequest(request, env);

    // Add CORS headers to the response
    response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
    response.headers.append("Vary", "Origin");

    return response;
  },
};
