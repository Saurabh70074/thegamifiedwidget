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
    console.error("HMAC verification failed for shop/redact");
    return new Response("Unauthorized", { status: 401 });
  }
  
  const payload = JSON.parse(body);
  console.log("Shop redact request received:", payload);
  
  // TODO: Implement logic to redact shop data
  // - Delete or anonymize all data for this shop
  // - This is called 48 hours after a merchant uninstalls your app
  
  return new Response("OK", { status: 200 });
};
