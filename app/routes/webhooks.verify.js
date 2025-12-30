// app/webhooks.verify.js
import crypto from "node:crypto";

export function verifyWebhook(request) {
  const hmacHeader = request.headers.get('X-Shopify-Hmac-SHA256');
  
  if (!hmacHeader) {
    return false;
  }

  // Get the raw body as text
  const body = request.body;
  
  // Your client secret from the Dev Dashboard
const clientSecret = process.env.SHOPIFY_API_SECRET;  
  // Generate HMAC
  const hash = crypto
    .createHmac('sha256', clientSecret)
    .update(body, 'utf8')
    .digest('base64');
  
  // Compare the hashes
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(hmacHeader)
  );
}
