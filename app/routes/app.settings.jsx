import { Form, useLoaderData, useNavigation } from "react-router";
import { authenticate } from "../shopify.server";
import { getUserSettings, upsertUserSettings } from "../models/UserSettings.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const settings = await getUserSettings(shop);

  return {
    secret: settings?.secret || "",
    shopName: settings?.shopName || "",
    websiteUrl: settings?.websiteUrl || "",
  };
}

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const formData = await request.formData();
  const secret = formData.get("secret");
  const shopName = formData.get("shopName");
  const websiteUrl = formData.get("websiteUrl");

  await upsertUserSettings({
    shop,
    secret,
    shopName,
    websiteUrl,
  });

  return null;
}

export default function SettingsPage() {
  const data = useLoaderData();
  const navigation = useNavigation();
  const loading = navigation.state === "submitting";

  return (
    <s-page title="Gamified Widget Settings">
      <s-card padding>

        <h2 style={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "20px"
        }}>
          Enter Your Widget Credentials
        </h2>

        <Form method="post" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

          <s-text-field
            label="Shop Name"
            name="shopName"
            placeholder="Enter your shop name"
            value={data.shopName}
          />

          <s-text-field
            label="Secret Key"
            name="secret"
            placeholder="Enter your secret key"
            value={data.secret}
          />

          <s-text-field
            label="Website URL"
            name="websiteUrl"
            placeholder="https://yourwebsite.com"
            value={data.websiteUrl}
          />

          <div style={{ marginTop: "10px" }}>
            <s-button submit loading={loading}>
              Save Settings
            </s-button>
          </div>

        </Form>

      </s-card>
    </s-page>
  );
}
