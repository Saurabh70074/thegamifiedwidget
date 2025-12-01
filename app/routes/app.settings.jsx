import { Form, useLoaderData, useNavigation } from "react-router";
import { authenticate } from "../shopify.server";
import { getUserSettings, upsertUserSettings } from "../models/UserSettings.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const settings = await getUserSettings(shop);

  return {
    userToken: settings?.userToken || "",
    websiteUrl: settings?.websiteUrl || "",
  };
}

export async function action({ request }) {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const formData = await request.formData();
  const userToken = formData.get("userToken");
  const websiteUrl = formData.get("websiteUrl");

  await upsertUserSettings({ shop, userToken, websiteUrl });

  return null;
}

export default function SettingsPage() {
  const { userToken, websiteUrl } = useLoaderData();
  const navigation = useNavigation();
  const loading = navigation.state === "submitting";

  return (
    <s-page title="MyWidget Settings">
      <s-card padding>
        <Form method="post">
          <s-text-field
            label="User Token"
            name="userToken"
            value={userToken}
          />
          <br />
          <s-text-field
            label="Website URL"
            name="websiteUrl"
            value={websiteUrl}
          />
          <br />
          <s-button submit loading={loading}>
            Save Settings
          </s-button>
        </Form>
      </s-card>
    </s-page>
  );
}
