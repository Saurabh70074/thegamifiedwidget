
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
    console.error("HMAC verification failed for customers/data_request");
    return new Response("Unauthorized", { status: 401 });
  }
  
  const payload = JSON.parse(body);
  console.log("Customer data request received:", payload);
  
  // TODO: Implement logic to collect and provide customer data
  // - Query your database for customer data
  // - Compile it according to GDPR requirements
  // - Send to customer or make available for download
  
  return new Response("OK", { status: 200 });
};
