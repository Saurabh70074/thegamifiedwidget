// @ts-nocheck
import {
  extend,
  BlockStack,
  Button,
  Heading,
  Image,
  Layout,
  TextBlock,
  View,
} from "@shopify/post-purchase-ui-extensions";

extend("Checkout::PostPurchase::ShouldRender", async ({ storage }) => {
  const initialState = { isFlipped: false };
  await storage.update(initialState);
  return { render: true };
});

extend(
  "Checkout::PostPurchase::Render",
  async (root, input) => {
    const { ui, initialPurchase } = input;
   console.log("Full Shopify Input:", JSON.stringify(input, null, 2));
    const rawPhone = initialPurchase?.customer?.phone || "9876543221";
    const userMobile = rawPhone.replace(/\D/g, ""); 
    const apiUrl = `https://stageapi.thegamified.com/api/v1/gamified/distribution/coupons?secret=8213a4078f82676dc243859fa9eb4f2aff62f6c62a7f0f174cf7e9873a37a330&userMobile=${userMobile}`;

    const loadingText = root.createComponent(TextBlock, { appearance: "subdued" }, "Preparing your gift...");
    root.appendChild(loadingText);
    root.mount();

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      root.removeChild(loadingText);

      if (data.status === 'success') {
        const { couponCode, offer } = data;

        // --- Container for Flip Logic ---
        const cardContainer = root.createComponent(View, {
          border: "base",
          cornerRadius: "large",
          padding: "loose",
          background: "surfaceTertiary", // Dark initial look
        });

        // --- FRONT SIDE (Flip hone se pehle) ---
        const cardFront = root.createComponent(BlockStack, { spacing: "base", inlineAlignment: "center" }, [
            root.createComponent(View, { blockSize: 120, inlineSize: 120 }, [
                root.createComponent(Image, { source: offer.logo }) // Brand Logo as a hint
            ]),
            root.createComponent(Heading, { level: 2 }, "Tap to Reveal Your Reward!"),
            root.createComponent(TextBlock, { appearance: "info" }, "Click below to flip the card"),
            root.createComponent(Button, { 
              kind: "primary", 
              onPress: () => flipCard() 
            }, "Flip Card")
        ]);

        // --- BACK SIDE (Revealed Content) ---
        const cardBack = root.createComponent(BlockStack, { spacing: "loose" }, [
            root.createComponent(Layout, { media: [{viewportSize: 'small', sizes: [1, 4]}] }, [
                root.createComponent(View, { inlineSize: 40, blockSize: 40 }, [
                    root.createComponent(Image, { source: offer.logo })
                ]),
                root.createComponent(BlockStack, { spacing: "none" }, [
                    root.createComponent(Heading, { level: 3 }, offer.brandName),
                    root.createComponent(TextBlock, { size: "small", appearance: "subdued" }, offer.offerCallout)
                ])
            ]),
            root.createComponent(View, { border: "base", padding: "base", cornerRadius: "base", background: "surfaceSecondary" }, [
                root.createComponent(BlockStack, { spacing: "extraTight", inlineAlignment: "center" }, [
                    root.createComponent(TextBlock, { emphasis: "bold" }, "CONGRATULATIONS!"),
                    root.createComponent(TextBlock, { size: "extraLarge", emphasis: "bold", color: "critical" }, couponCode),
                    root.createComponent(Button, { 
                        kind: "secondary", 
                        onPress: () => ui.navigator.clipboard.writeText(couponCode) 
                    }, "Copy Code")
                ])
            ]),
            root.createComponent(Button, { fullWidth: true, external: true, to: offer.link.value }, `Redeem on ${offer.brandName}`)
        ]);

        // --- Flip Logic Function ---
        const flipCard = () => {
          cardContainer.updateProps({ background: "surfaceSecondary" }); // Change background on flip
          cardContainer.removeChild(cardFront);
          cardContainer.appendChild(cardBack);
        };

        // Initial View
        cardContainer.appendChild(cardFront);

        root.appendChild(
          root.createComponent(Layout, { maxInlineSize: 0.7 }, [
            root.createComponent(BlockStack, { spacing: "loose" }, [
                root.createComponent(Heading, { level: 1 }, "Your Mystery Reward"),
                cardContainer
            ])
          ])
        );
      }
    } catch (error) {
      root.removeChild(loadingText);
      console.error("Design Error:", error);
    }
    root.mount();
  }
);