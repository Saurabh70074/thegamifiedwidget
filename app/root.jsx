import "@shopify/polaris/build/esm/styles.css";
import "./styles/tailwind.css";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { AppProvider as PolarisAppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <PolarisAppProvider i18n={enTranslations}>
          <Outlet />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#1f2937",
                color: "white",
                fontSize: "14px",
                borderRadius: "10px",
                padding: "12px 18px",
                zIndex: 999999999, // extra safety
              },
            }}
          />
        </PolarisAppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
