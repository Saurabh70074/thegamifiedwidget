import { getUserSettings } from "../models/UserSettings.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    return Response.json({ error: "Missing shop parameter" }, { status: 400 });
  }

  const settings = await getUserSettings(shop);

  return Response.json({
    secret: settings?.secret || "",
    websiteUrl: settings?.websiteUrl || "",
    shopName: settings?.shopName || "",
  });
}
