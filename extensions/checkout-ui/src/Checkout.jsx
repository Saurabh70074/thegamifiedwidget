// import '@shopify/ui-extensions/preact';
// import {render} from 'preact';
// // import Visit from '../../../app/components/Visit';

// export default function extension() {
//   render(<Extension />, document.body);
// }

// function Extension() {
//   const order =
//     shopify.orderConfirmation.value.order;

//     const id = order?.id;
//     const orderId = id.split("/").pop();
//     console.log("Order Confirmation:", order);

//   if (id) {
//     return (
//       <s-banner>
//         Your Order ID is:
//         ({orderId}) (TheGamified-Widget)

//         {/* <Visit
//             secret={"3fde3d3dd147f87ed8b75e32eacdbe1ac94a5d80a3321c1e3853862480c3e76c"}
//             mobile="9876543221"
//             email="test@gmail.com"
//             params={{}}
//           /> */}
//       </s-banner>
//     );
//   }

//   return null;
// }



// import '@shopify/ui-extensions/preact';
// import {render} from 'preact';

// export default function extension() {
//   render(<Extension />, document.body);
// }

// function Extension() {
//   const order =
//     shopify.orderConfirmation.value.order;

//     const id = order?.id;
//     const orderId = id.split("/").pop();
//     console.log("Order Confirmation:", order);

//     const url = `https://cms.thegamified.com/dashboards`;

//   if (id) {
//     return (
//       <s-banner>
//         Your Order ID is:
//         ({orderId}) (TheGamified-Widget)
//       {/* @ts-ignore */}
//         <s-button url={url}>
//         🎁 Play & Win Rewards
//        </s-button> 
//       </s-banner>
//     );
//   }

//   return null;
// }



import '@shopify/ui-extensions/preact';
import { render } from 'preact';

export default function extension() {
  render(<Extension />, document.body);
}

function Extension() {
  const order = shopify.orderConfirmation.value.order;
  const id = order?.id;

  if (!id) return null;

  const orderId = id.split('/').pop();

  return (
    <>
      <s-banner>
        🎉 Reward unlocked for Order {orderId}
      </s-banner>

      {/* @ts-ignore */}
      <s-button url="https://cms.thegamified.com/dashboards">
        🎁 Play & Win Rewards
      </s-button>
    </>
  );
}






// import {
//   extend,
//   BlockStack,
//   InlineStack,
//   Heading,
//   Text,
//   TextBlock,
//   Image,
//   Button,
//   Divider,
//   CalloutBanner,
// } from "@shopify/post-purchase-ui-extensions";

// /* ---------------- SHOULD RENDER ---------------- */
// extend("Checkout::PostPurchase::ShouldRender", async ({ input, storage }) => {
//   const order = input.order;

//   // Normally this should come from your backend
//   await storage.update({
//     email: order?.email || "",
//     mobile: order?.shippingAddress?.phone || "",
//     offer: {
//       brandName: "Amazon",
//       offerCallout: "Flat 20% OFF",
//       mov: "Min order ₹999",
//       couponCode: "GAME20",
//       endValidity: "2025-12-31",
//       thumbnail:
//         "https://cdn.shopify.com/static/images/examples/img-placeholder-1120x1120.png",
//       logo:
//         "https://cdn.shopify.com/static/images/examples/img-placeholder-1120x1120.png",
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

//         /* IMAGE */
//         root.createComponent(Image, {
//           source: offer.thumbnail,
//           aspectRatio: 1.7,
//         }),

//         /* BRAND */
//         root.createComponent(InlineStack, { spacing: "tight", align: "center" }, [
//           root.createComponent(Image, {
//             source: offer.logo,
//             aspectRatio: 1,
//           }),
//           root.createComponent(Text, { emphasis: "bold" }, offer.brandName),
//         ]),

//         /* TITLE */
//         root.createComponent(Heading, { level: 2 }, offer.offerCallout),
//         root.createComponent(Text, { appearance: "subdued" }, offer.mov),

//         /* VALIDITY */
//         root.createComponent(
//           Text,
//           { size: "small", appearance: "subdued" },
//           `Valid till ${offer.endValidity}`
//         ),

//         root.createComponent(Divider),

//         /* COUPON */
//         root.createComponent(BlockStack, { align: "center" }, [
//           root.createComponent(Text, { emphasis: "bold" }, "Coupon Code"),
//           root.createComponent(
//             Text,
//             { size: "extraLarge", emphasis: "bold" },
//             offer.couponCode || "NA"
//           ),
//         ]),

//         root.createComponent(Divider),

//         /* DETAILS */
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

//         /* ACTION */
//         root.createComponent(Button, {
//           kind: "primary",
//           onPress: () => {
//             // Shopify-safe navigation
//             root.navigate(offer.redeemUrl);
//           },
//         }, "Redeem now"),
//       ]),

//       /* FOOTER */
//       root.createComponent(Text, {
//         size: "small",
//         appearance: "subdued",
//         align: "center",
//       }, "Powered by Gamified™"),
//     ])
//   );

//   root.mount();
// });
