import { useEffect } from "react";
import { useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import Visit from "../components/Visit";
import { getUserSettings } from "../models/UserSettings.server";
import { useLoaderData } from "react-router";


export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;
  const settings = await getUserSettings(shop);

  return {
    shopName: settings?.shopName || "",
    secret: settings?.secret || "",
    websiteUrl: settings?.websiteUrl || "",
  };
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyReactRouterTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  };
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const { shopName, secret, websiteUrl } = useLoaderData();

  useEffect(() => {
    if (fetcher.data?.product?.id) {
      shopify.toast.show("Product created");
    }
  }, [fetcher.data?.product?.id, shopify]);

  useEffect(() => {
    console.log("Shop Name:", shopName);
    console.log("Secret Key:", secret);
    console.log("Website URL:", websiteUrl);
  }, [shopName, secret, websiteUrl]);



  return (
    <s-page heading="Shopify app template">

      {/* ⭐⭐⭐ ADD YOUR VISIT COMPONENT HERE ⭐⭐⭐ */}
      <s-section heading="Gamified Reward Card">
        <div style={{ marginTop: "20px" }}>
          <Visit
            secret={secret}
            mobile="9876543221"
            email="test@gmail.com"
            gender="M"
            age={30}
            transaction={500}
            city="New York"
            state="NY"
            os="iOS"
            device="iPhone"
          />
        </div>
      </s-section>
      {/* ⭐⭐⭐ END VISIT COMPONENT ⭐⭐⭐ */}

    </s-page>
  );
}


export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
