import type { ActionFunctionArgs } from "@remix-run/node";
import crypto from "node:crypto";
import dotenv from 'dotenv';

export const action = async ({ request }: ActionFunctionArgs) => {
  const hmac = request.headers.get("X-Shopify-Hmac-SHA256");
  const body = await request.text();
  dotenv.config();
  
  // Verify HMAC
  const hash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET!)
    .update(body, "utf8")
    .digest("base64");
  
  if (!hmac || !crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(hash))) {
    console.error("HMAC verification failed for customers/redact");
    return new Response("Unauthorized", { status: 401 });
  }
  
  const payload = JSON.parse(body);
  console.log("Customer redact request received:", payload);
  
  // TODO: Implement logic to redact customer data
  // - Delete or anonymize customer data from your database
  // - Remove any PII associated with this customer
  
  return new Response("OK", { status: 200 });
};
