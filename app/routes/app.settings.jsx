import { useState } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import { getUserSettings, upsertUserSettings } from "../models/UserSettings.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const settings = await getUserSettings(shop);

  return {
    shopName: settings?.shopName || "",
    secret: settings?.secret || "",
    websiteUrl: settings?.websiteUrl || "",
  };
}

export async function action({ request }) {

  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const formData = await request.formData();

  const shopName = formData.get("shopName");
  const secret = formData.get("secret");
  const websiteUrl = formData.get("websiteUrl");

  await upsertUserSettings({
    shop,
    shopName,
    secret,
    websiteUrl,
  });

  return { ok: true };
}

export default function SettingsPage() {
  const fetcher = useFetcher();
  const data = useLoaderData();

  console.log("Loader Data:", data);

  const [shopName, setShopName] = useState(data.shopName);
  const [secret, setSecret] = useState(data.secret);
  const [websiteUrl, setWebsiteUrl] = useState(data.websiteUrl);

  const loading = fetcher.state === "submitting";

  console.log("Current State:", { shopName, secret, websiteUrl, loading });

  console.log("SettingsPage Loaded!");

  return (
  <div
    style={{
      maxWidth: "580px",
      margin: "40px auto",
      padding: "28px",
      background: "white",
      borderRadius: "14px",
      boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
      border: "1px solid #f0f0f0",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    <h2
      style={{
        fontSize: "24px",
        fontWeight: "600",
        textAlign: "center",
        marginBottom: "6px",
        color: "#202223",
      }}
    >
      Store Settings
    </h2>

    <p
      style={{
        textAlign: "center",
        fontSize: "14px",
        color: "#6D7175",
        marginBottom: "20px",
      }}
    >
      Enter your shop details, API secret, and website URL
    </p>

    <fetcher.Form method="post" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "14px", fontWeight: "500" }}>Shop Name</label>
        <s-text-field
          name="shopName"
          value={shopName}
          onInput={(e) => setShopName(e.target.value)}
          placeholder="Enter your Shopify shop name"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "14px", fontWeight: "500" }}>Secret Key</label>
        <s-text-field
          name="secret"
          value={secret}
          onInput={(e) => setSecret(e.target.value)}
          placeholder="Enter secret key"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label style={{ fontSize: "14px", fontWeight: "500" }}>Website URL</label>
        <s-text-field
          name="websiteUrl"
          value={websiteUrl}
          onInput={(e) => setWebsiteUrl(e.target.value)}
          placeholder="https://yourwebsite.com"
        />
      </div>

      <s-button
        type="submit"
        loading={loading}
        style={{
          marginTop: "12px",
          width: "100%",
          "--btn-primary": "#2C6ECB",
        }}
      >
        Save Settings
      </s-button>
    </fetcher.Form>
  </div>
);

}
