export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response("OK", { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      const { name, email, message } = await request.json();

      if (!name || !email || !message) {
        return new Response("Missing required fields", {
          status: 400,
          headers: corsHeaders,
        });
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
        return new Response("Email sent successfully", {
          status: 200,
          headers: corsHeaders,
        });
      } else {
        const errorText = await response.text();
        return new Response(`Failed to send email: ${errorText}`, {
          status: response.status,
          headers: corsHeaders,
        });
      }
    } catch (error) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};
