/**
 * Extend Shopify Checkout with a custom Post Purchase user experience This
 * Shopify Checkout template provides two extension points:
 *  1. ShouldRender - Called first, during the checkout process.
 *  2. Render - If requested by `ShouldRender`, will be rendered after checkout
 *     completes
 */
import {
  extend,
  BlockStack,
  Button,
  Heading,
  Image,
  Layout,
  TextBlock,
  TextContainer,
  CalloutBanner,
  View,
} from "@shopify/post-purchase-ui-extensions";

/**
 * Entry point for the `ShouldRender` Extension Point.
 *
 * Returns a value indicating whether or not to render a PostPurchase step, and
 * optionally allows data to be stored on the client for use in the `Render`
 * extension point.
 */
extend("Checkout::PostPurchase::ShouldRender", async ({ storage }) => {
  const initialState = await getRenderData();
  const render = true;

  if (render) {
    // Saves initial state, provided to `Render` via `storage.initialData`
    await storage.update(initialState);
  }

  return {
    render,
  };
});

// Simulate results of network call, etc.
async function getRenderData() {
  return {
    couldBe: "anything",
  };
}

/**
 * Entry point for the `Render` Extension Point
 *
 * Returns markup composed of remote UI components.  The Render extension can
 * optionally make use of data stored during `ShouldRender` extension point to
 * expedite time-to-first-meaningful-paint.
 */
extend(
  "Checkout::PostPurchase::Render",
  (root, { extensionPoint, storage }) => {
    const initialState = storage.initialData;

    root.appendChild(
      root.createComponent(BlockStack, { spacing: "loose" }, [
        root.createComponent(
          CalloutBanner,
          { title: "Post-purchase extension template" },
          "Use this template as a starting point to build a great post-purchase extension."
        ),
        root.createComponent(
          Layout,
          {
            maxInlineSize: 0.95,
            media: [
              { viewportSize: "small", sizes: [1, 30, 1] },
              { viewportSize: "medium", sizes: [300, 30, 0.5] },
              { viewportSize: "large", sizes: [400, 30, 0.33] },
            ],
          },
          [
            root.createComponent(View, {}, [
              root.createComponent(Image, {
                source:
                  "https://cdn.shopify.com/static/images/examples/img-placeholder-1120x1120.png",
              }),
            ]),
            root.createComponent(View),
            root.createComponent(BlockStack, { spacing: "xloose" }, [
              root.createComponent(TextContainer, {}, [
                root.createComponent(Heading, {}, "Post-purchase extension"),
                root.createComponent(
                  TextBlock,
                  {},
                  "Here you can cross-sell other products, request a product review based on a previous purchase, and much more."
                ),
              ]),
              root.createComponent(
                Button,
                {
                  submit: true,
                  onPress: () => {
                    // eslint-disable-next-line
                    console.log(
                      `Extension point ${extensionPoint}`,
                      initialState
                    );
                  },
                },
                "Primary button"
              ),
            ]),
          ]
        ),
      ])
    );

    root.mount();
  }
);


// import {
//   extend,
//   BlockStack,
//   InlineStack,
//   Heading,
//   Text,
//   TextBlock,
//   Image,
//   Button,
//   CalloutBanner,
// } from "@shopify/post-purchase-ui-extensions";

// /* ---------------- SHOULD RENDER ---------------- */
// extend("Checkout::PostPurchase::ShouldRender", async ({ input, storage }) => {
//   // const order = input.order;

//   await storage.update({
//     email:  "example@gmail.com",
//     mobile: "898989009" || "",
//     offer: {
//       brandName: "Amazon",
//       offerCallout: "Flat 20% OFF",
//       mov: "Min order ₹999",
//       couponCode: "GAME20",
//       endValidity: "31 Dec 2025",
//       thumbnail:
//         "https://img.freepik.com/free-photo/courage-man-jump-through-gap-hill-business-concept-idea_1323-262.jpg?semt=ais_hybrid&w=740&q=80",
//       logo:
//         "https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.webp?b=1&s=612x612&w=0&k=20&c=C318sxgBBIO66E7vi_0Eu3lXHm9uRDauKvRgeyxY2O4=g",
//       details: [
//         "Applicable on selected products",
//         "One time use only",
//       ],
//       howToRedeem: [
//         "Click Redeem",
//         "Apply code at checkout",
//       ],
//       terms: [
//         "Valid once per user",
//         "Cannot be clubbed with other offers",
//       ],
//       redeemUrl: "https://example.com",
//     },
//   });

//   return { render: true };
// });

// /* ---------------- RENDER ---------------- */
// extend("Checkout::PostPurchase::Render", (root, { storage }) => {
//   const { offer } = storage.initialData;

//   root.appendChild(
//     root.createComponent(BlockStack, { spacing: "loose" }, [

//       /* HEADER */
//       root.createComponent(CalloutBanner, {
//         title: "🎉 You’ve unlocked a reward!",
//       }),

//       /* CARD */
//       root.createComponent(BlockStack, {
//         spacing: "base",
//         padding: "base",
//         border: "base",
//         borderRadius: "large",
//       }, [

//         root.createComponent(Image, {
//           source: offer.thumbnail,
//           aspectRatio: 1.7,
//         }),

//         root.createComponent(InlineStack, {
//           spacing: "tight",
//           align: "center",
//         }, [
//           root.createComponent(Image, {
//             source: offer.logo,
//             aspectRatio: 1,
//           }),
//           root.createComponent(Text, { emphasis: "bold" }, offer.brandName),
//         ]),

//         root.createComponent(Heading, { level: 2 }, offer.offerCallout),
//         root.createComponent(Text, { appearance: "subdued" }, offer.mov),

//         root.createComponent(
//           Text,
//           { size: "small", appearance: "subdued" },
//           `Valid till ${offer.endValidity}`
//         ),

//         /* spacing instead of divider */
//         root.createComponent(BlockStack, { spacing: "tight" }),

//         root.createComponent(Text, { emphasis: "bold" }, "Coupon Code"),
//         root.createComponent(
//           Text,
//           { size: "extraLarge", emphasis: "bold" },
//           offer.couponCode || "NA"
//         ),

//         root.createComponent(BlockStack, { spacing: "tight" }),

//         root.createComponent(Heading, { level: 3 }, "Details"),
//         ...(offer.details || []).map((t) =>
//           root.createComponent(TextBlock, {}, `• ${t}`)
//         ),

//         root.createComponent(Heading, { level: 3 }, "How to redeem"),
//         ...(offer.howToRedeem || []).map((t) =>
//           root.createComponent(TextBlock, {}, `• ${t}`)
//         ),

//         root.createComponent(Heading, { level: 3 }, "Terms & Conditions"),
//         ...(offer.terms || []).map((t) =>
//           root.createComponent(TextBlock, {}, `• ${t}`)
//         ),

//         root.createComponent(Button, {
//           kind: "primary",
//           onPress: () => {
//             root.navigate(offer.redeemUrl);
//           },
//         }, "Redeem now"),
//       ]),

//       root.createComponent(Text, {
//         size: "small",
//         appearance: "subdued",
//         align: "center",
//       }, "Powered by Gamified™"),
//     ])
//   );

//   root.mount();
// });
