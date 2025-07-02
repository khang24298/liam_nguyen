# Contact Form with Cloudflare Worker

This project demonstrates how to create a contact form on a static HTML page and use a Cloudflare Worker to send emails.

## Deployment

### 1. Deploy the Cloudflare Worker

You will need to deploy the `functions/send-email.js` file as a Cloudflare Worker.

1.  **Install Wrangler:** If you don't have it already, install the Cloudflare Wrangler CLI:

    ```bash
    npm install -g wrangler
    ```

2.  **Login to Cloudflare:**

    ```bash
    wrangler login
    ```

3.  **Deploy the Worker:** Navigate to your project directory and run the following command. You will be prompted to give your worker a name.

    ```bash
    wrangler deploy functions/send-email.js
    ```

### 2. Configure Environment Variables

The Cloudflare Worker requires two environment variables to be set:

- `TO_EMAIL`: The email address where you want to receive the contact form submissions.
- `FROM_EMAIL`: The email address that will be used as the sender. This should be an address that you have verified with your email provider.

You can set these secrets using the Wrangler CLI:

```bash
wrangler secret put TO_EMAIL
# Paste your destination email address when prompted

wrangler secret put FROM_EMAIL
# Paste your sender email address when prompted
```

### 3. Update the Fetch URL (if necessary)

The `contact.html` file currently sends the form data to `/functions/send-email`. If you deployed your worker with a custom route or a different name, you will need to update the `fetch` URL in the `contact.html` file to match the URL of your deployed worker.

For example, if your worker is available at `https://my-worker.my-subdomain.workers.dev`, you would update the `fetch` call like this:

```javascript
// in contact.html
const response = await fetch("https://my-worker.my-subdomain.workers.dev", {
  // ...
});
```

## How it Works

1.  The user fills out the contact form in `contact.html` and clicks "Send Message".
2.  The JavaScript in `contact.html` captures the form data and sends it to the Cloudflare Worker using a `fetch` request.
3.  The Cloudflare Worker (`functions/send-email.js`) receives the request, validates the data, and then uses the MailChannels API to send the email.
4.  The worker returns a success or error message to the `contact.html` page, which is then displayed to the user.
