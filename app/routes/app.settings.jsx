// import { Form, useFetcher, useLoaderData, useNavigation } from "react-router";
// import { authenticate } from "../shopify.server";
// import { getUserSettings, upsertUserSettings } from "../models/UserSettings.server";


// // =======================
// //        LOADER
// // =======================
// export async function loader({ request }) {
//   const { session } = await authenticate.admin(request);
//   const shop = session.shop;

//   const settings = await getUserSettings(shop);

//   return {
//     shopName: settings?.shopName || "",
//     secret: settings?.secret || "",
//     websiteUrl: settings?.websiteUrl || "",
//   };
// }


// // =======================
// //        ACTION
// // =======================
// export async function action({ request }) {
//   console.log("ACTION TRIGGERED!!!"); // <-- TEST

//   const { session } = await authenticate.admin(request);
//   const shop = session.shop;

//   const formData = await request.formData();

//   const shopName = formData.get("shopName");
//   const secret = formData.get("secret");
//   const websiteUrl = formData.get("websiteUrl");

//   await upsertUserSettings({ shop, shopName, secret, websiteUrl });

//   return null;
// }



// // =======================
// //      COMPONENT UI
// // =======================
// export default function SettingsPage() {
//     const fetcher = useFetcher();
//   const data = useLoaderData();
//   const loading = fetcher.state === "submitting";

//   return (
//     <s-page title="Gamified Widget Settings">
//       <s-card padding>

//         <h2 style={{
//           fontSize: "18px",
//           fontWeight: "600",
//           marginBottom: "20px"
//         }}>
//           Enter Your Widget Credentials
//         </h2>

//         <fetcher.Form method="post" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
//           <s-text-field
//             label="Shop Name"
//             name="shopName"
//             placeholder="Enter your shop name"
//             value={data.shopName}
//           />

//           <s-text-field
//             label="Secret Key"
//             name="secret"
//             placeholder="Enter your secret key"
//             value={data.secret}
//           />

//           <s-text-field
//             label="Website URL"
//             name="websiteUrl"
//             placeholder="https://yourwebsite.com"
//             value={data.websiteUrl}
//           />

//           <div style={{ marginTop: "10px" }}>
//             <s-button submit loading={loading}>
//               Save Settings
//             </s-button>
//           </div>

//         </fetcher.Form>

//       </s-card>
//     </s-page>
//   );
// }



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
  console.log("ACTION TRIGGERED!!!"); // <-- You MUST see this

  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  const formData = await request.formData();

  const shopName = formData.get("shopName");
  const secret = formData.get("secret");
  const websiteUrl = formData.get("websiteUrl");

  await upsertUserSettings({ shop, shopName, secret, websiteUrl });

  return null;
}

export default function SettingsPage() {
  const fetcher = useFetcher();  // <-- IMPORTANT
  const data = useLoaderData();

  const loading = fetcher.state === "submitting";

  
  console.log("SettingsPage Loaded!");

  return (
    <s-page title="Gamified Widget Settings">
      <s-card padding>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>
          Enter Your Widget Credentials
        </h2>

        <fetcher.Form
          method="post"
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
        >
          <s-text-field
            label="Shop Name"
            name="shopName"
            value={data.shopName}
          />

          <s-text-field
            label="Secret Key"
            name="secret"
            value={data.secret}
          />

          <s-text-field
            label="Website URL"
            name="websiteUrl"
            value={data.websiteUrl}
          />

          <s-button submit loading={loading}>
            Save Settings
          </s-button>
        </fetcher.Form>

      </s-card>
    </s-page>
  );
}

