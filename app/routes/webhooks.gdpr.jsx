import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { payload, topic, shop } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  // Handle each GDPR topic
  switch (topic) {
    case "CUSTOMERS_DATA_REQUEST":
      // Log the data request - since you don't store customer PII in your
      // post-purchase extension, you can just acknowledge it
      console.log("Customer data request:", payload);
      break;

    case "CUSTOMERS_REDACT":
      // Delete any customer data if you stored any
      // For your use case, likely just logging is sufficient
      console.log("Customer redact request:", payload);
      break;

    case "SHOP_REDACT":
      // Clean up shop data after uninstall (48 hours after)
      // You might want to delete session data here
      console.log("Shop redact request:", payload);
      break;

    default:
      console.log("Unhandled GDPR topic:", topic);
  }

  return new Response();
};
