
import { Page, Card } from "@shopify/polaris";
import { useEffect, useState } from "react";

export default function AppWidgetPage() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    // Ensure we build a correct public widget URL dynamically
    const params = new URLSearchParams({
      secret: "8213a4078f82676dc243859fa9eb4f2aff62f6c62a7f0f174cf7e9873a37a330",
      mobile: "9876543221",
      email: "test@example.com",
    });

    // Use relative route (Cloudflare will prepend dev URL)
    setUrl(`/widget?${params.toString()}`);
  }, []);

  return (
    <Page title="Widget Preview">
      <Card>
        <div style={{ padding: "1rem" }}>
          <h2 style={{ marginBottom: "10px", fontWeight: 600 }}>
            Live Widget Preview
          </h2>

          <iframe
            src={url}
            style={{
              width: "100%",
              height: "750px",
              border: "none",
              borderRadius: "12px",
              background: "#f0f0f0",
            }}
          />
        </div>
      </Card>
    </Page>
  );
}
