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
  const data = useLoaderData();
  const navigation = useNavigation();
  const loading = navigation.state === "submitting";

  return (
    <s-page title="Gamified Widget Settings">
      <s-card padding>
        <Form method="post">
          
          <s-text-field label="Secret Key" name="secret" value={data.secret} />
          <br />

          <s-text-field label="Mobile" name="mobile" value={data.mobile} />
          <br />

          <s-text-field label="Email" name="email" value={data.email} />
          <br />

          <s-text-field label="Gender" name="gender" value={data.gender} />
          <br />

          <s-text-field label="Age" name="age" value={data.age} />
          <br />

          <s-text-field label="Transaction Amount" name="transaction" value={data.transaction} />
          <br />

          <s-text-field label="City" name="city" value={data.city} />
          <br />

          <s-text-field label="State" name="state" value={data.state} />
          <br />

          <s-text-field label="OS" name="os" value={data.os} />
          <br />

          <s-text-field label="Device" name="device" value={data.device} />
          <br />

          <s-button submit loading={loading}>
            Save Settings
          </s-button>
        </Form>
      </s-card>
    </s-page>
  );
}





// import { Form, useLoaderData, useNavigation } from "react-router";
// import { Page, Card, TextField, Button } from "@shopify/polaris";
// import { authenticate } from "../shopify.server";
// import { getUserSettings, upsertUserSettings } from "../models/UserSettings.server";


// // 🟢 Loader: Fetch settings from DB
// export async function loader({ request }) {
//   const { session } = await authenticate.admin(request);
//   const shop = session.shop;

//   const settings = await getUserSettings(shop);

//   return {
//     secret: settings?.secret || "",
//     mobile: settings?.mobile || "",
//     email: settings?.email || "",
//     gender: settings?.gender || "",
//     age: settings?.age || "",
//     transaction: settings?.transaction || "",
//     city: settings?.city || "",
//     state: settings?.state || "",
//     os: settings?.os || "",
//     device: settings?.device || "",
//   };
// }


// // 🟢 Action: Save settings to DB
// export async function action({ request }) {
//   const { session } = await authenticate.admin(request);
//   const shop = session.shop;

//   const formData = await request.formData();

//   await upsertUserSettings({
//     shop,
//     secret: formData.get("secret"),
//     mobile: formData.get("mobile"),
//     email: formData.get("email"),
//     gender: formData.get("gender"),
//     age: formData.get("age"),
//     transaction: formData.get("transaction"),
//     city: formData.get("city"),
//     state: formData.get("state"),
//     os: formData.get("os"),
//     device: formData.get("device"),
//   });

//   return null;
// }


// // 🟢 UI Component
// export default function SettingsPage() {
//   const data = useLoaderData();
//   const navigation = useNavigation();
//   const loading = navigation.state === "submitting";

//   return (
//     <Page title="Gamified Widget Settings">
//       <Card sectioned>
//         <Form method="post">
//           <TextField label="Secret" name="secret" defaultValue={data.secret} />
//           <TextField label="Mobile" name="mobile" defaultValue={data.mobile} />
//           <TextField label="Email" name="email" defaultValue={data.email} />
//           <TextField label="Gender" name="gender" defaultValue={data.gender} />
//           <TextField label="Age" name="age" defaultValue={data.age} />
//           <TextField label="Transaction" name="transaction" defaultValue={data.transaction} />
//           <TextField label="City" name="city" defaultValue={data.city} />
//           <TextField label="State" name="state" defaultValue={data.state} />
//           <TextField label="OS" name="os" defaultValue={data.os} />
//           <TextField label="Device" name="device" defaultValue={data.device} />
//           <Button submit primary loading={loading}>
//             Save Settings
//           </Button>
//         </Form>
//       </Card>
//     </Page>
//   );
// }
