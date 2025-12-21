
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
  InlineStack,
  Separator,
} from "@shopify/post-purchase-ui-extensions";

extend("Checkout::PostPurchase::ShouldRender", async ({ storage }) => {
  return { render: true };
});

extend("Checkout::PostPurchase::Render", async (root, input) => {
  const { ui, inputData } = input;
  const userId = inputData?.initialPurchase?.customerId;
  const userEmail = inputData?.initialPurchase?.customer?.email || "";

  const apiUrl = `https://stageapi.thegamified.com/api/v1/gamified/distribution/coupons?secret=8213a4078f82676dc243859fa9eb4f2aff62f6c62a7f0f174cf7e9873a37a330&userMobile=${userId}`;

  const sendTrackingApi = async (
    couponId,
    couponCode,
    publisherId,
    orderType,
  ) => {
    try {
      await fetch(
        `https://stageapi.thegamified.com/api/v1/gamified/create/order/data/${couponId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            couponCode,
            email: userEmail,
            userId: String(userId),
            orderType,
            publisherId,
          }),
        },
      );
    } catch (err) {
      console.error(`Tracking Error (${orderType}):`, err);
    }
  };

  // --- Loading State ---
  const loadingContainer = root.createComponent(
    Layout,
    { maxInlineSize: 0.95 },
    [
      root.createComponent(
        View,
        {
          padding: "extraLoose",
          background: "surfacePrimary",
          cornerRadius: "large",
          inlineAlignment: "center",
        },
        [
          root.createComponent(
            TextBlock,
            { emphasis: "bold" },
            "✨ Unlocking your gift...",
          ),
        ],
      ),
    ],
  );
  root.appendChild(loadingContainer);
  root.mount();

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    root.removeChild(loadingContainer);

    if (data.status === "success") {
      const { couponCode, couponId, publisherId, offer } = data;
      sendTrackingApi(couponId, couponCode, publisherId, "distribution");

      const cardContainer = root.createComponent(View, {
        border: "base",
        cornerRadius: "large",
        background: "surfacePrimary",
      });

      // --- FRONT SIDE ---
      const cardFront = root.createComponent(
        BlockStack,
        { spacing: "loose", inlineAlignment: "center", padding: "extraLoose" },
        [
          root.createComponent(Image, {
            source:
              "https://cdn.shopify.com/s/files/1/0783/6889/9330/files/Group_1410116463.png?v=1766339912&width=500",
            fit: "contain",
          }),
          root.createComponent(
            Button,
            {
              kind: "plain",
              fullWidth: true,
              onPress: () => {
                sendTrackingApi(couponId, couponCode, publisherId, "order");
                flipCard();
              },
            },
            "🎁 Reveal My Reward",
          ),

          // FIXED ALIGNMENT: Powered By + Logo
          root.createComponent(
            InlineStack,
            {
              spacing: "extraTight",
              blockAlignment: "center",
              inlineAlignment: "center",
            },
            [
              root.createComponent(
                TextBlock,
                { size: "extraSmall", emphasis: "bold", appearance: "subdued" },
                "Powered by",
              ),
              // Removed the View wrapper to avoid extra padding that causes misalignment
              root.createComponent(Image, {
                source:
                  "https://cdn.shopify.com/s/files/1/0783/6889/9330/files/GamifiedLogo.png?v=1766327167&width=100",
                fit: "contain",
                inlineSize: 70, // Explicit size helps alignment
              }),
            ],
          ),
        ],
      );

      // --- BACK SIDE ---
      const cardBack = root.createComponent(BlockStack, { spacing: "none" }, [
        root.createComponent(
          View,
          { blockSize: 180, cornerRadius: "none", overflow: "hidden" },
          [
            root.createComponent(Image, {
              source: "https://picsum.photos/400/200",
              fit: "cover",
            }),
          ],
        ),
        root.createComponent(View, { padding: "loose" }, [
          root.createComponent(BlockStack, { spacing: "loose" }, [
            // Brand Identity
            root.createComponent(
              InlineStack,
              { spacing: "base", blockAlignment: "center" },
              [
                root.createComponent(
                  View,
                  {
                    blockSize: 50,
                    inlineSize: 50,
                    cornerRadius: "fullyRounded",
                    overflow: "hidden",
                    border: "base",
                  },
                  [
                    root.createComponent(Image, {
                      source: "https://picsum.photos/50",
                    }),
                  ],
                ),
                root.createComponent(BlockStack, { spacing: "none" }, [
                  root.createComponent(Heading, { level: 2 }, offer.brandName),
                  root.createComponent(
                    TextBlock,
                    { emphasis: "bold", appearance: "success" },
                    `🏷️ ${offer.offerCallout} ${offer.mov}`,
                  ),
                ]),
              ],
            ),

            // --- IMPROVED COUPON BLOCK (No top gap for mov) ---
            root.createComponent(
              View,
              {
                padding: "loose",
                cornerRadius: "base",
                background: "surfaceSecondary",
                border: "base",
              },
              [
                root.createComponent(
                  BlockStack,
                  { spacing: "none", inlineAlignment: "center" },
                  [
                    // root.createComponent(
                    //   TextBlock,
                    //   { size: "extraSmall", emphasis: "bold" },
                    //   offer.mov,
                    // ),
                    root.createComponent(
                      InlineStack,
                      {
                        spacing: "tight",
                        blockAlignment: "center",
                        inlineAlignment: "center",
                      },
                      [
                        root.createComponent(
                          TextBlock,
                          {
                            size: "large",
                            appearance: "subdued",
                            emphasis: "bold",
                          },
                          "CODE:",
                        ),
                        root.createComponent(
                          View,
                          {
                            padding: "tight",
                            background: "surfaceTertiary",
                            cornerRadius: "base",
                            border: "base",
                          },
                          [
                            root.createComponent(
                              TextBlock,
                              {
                                size: "large",
                                emphasis: "bold",
                                appearance: "success",
                                selectable: true,
                              },
                              couponCode,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),

            // Instructions
            root.createComponent(
              View,
              { border: "base", padding: "base", cornerRadius: "base" },
              [
                root.createComponent(BlockStack, { spacing: "tight" }, [
                  root.createComponent(
                    TextBlock,
                    { emphasis: "bold", size: "large" },
                    "✨ How to Redeem:",
                  ),
                  ...offer.howtoredeem.map((step) =>
                    root.createComponent(
                      TextBlock,
                      { size: "extraSmall" },
                      `• ${step}`,
                    ),
                  ),
                ]),
              ],
            ),

            root.createComponent(
              Button,
              {
                kind: "primary",
                fullWidth: true,
                external: true,
                to: offer.link.value,
                onPress: () => {
                  try {
                    ui.action.copyToClipboard(couponCode);
                  } catch (e) {}
                  sendTrackingApi(couponId, couponCode, publisherId, "click");
                },
              },
              `Redeem at ${offer.brandName} ➔`,
            ),

            root.createComponent(Separator),

            // T&C Section
            root.createComponent(BlockStack, { spacing: "extraTight" }, [
              root.createComponent(
                TextBlock,
                { emphasis: "bold", size: "large", appearance: "subdued" },
                "Terms & Conditions",
              ),
              ...offer.termsandcond.map((term) =>
                root.createComponent(
                  TextBlock,
                  { size: "extraSmall", appearance: "subdued" },
                  `• ${term}`,
                ),
              ),
            ]),
          ]),
        ]),
      ]);

      const flipCard = () => {
        cardContainer.removeChild(cardFront);
        cardContainer.appendChild(cardBack);
      };
      cardContainer.appendChild(cardFront);

      root.appendChild(
        root.createComponent(Layout, { maxInlineSize: 0.95 }, [
          root.createComponent(BlockStack, { spacing: "loose" }, [
            root.createComponent(
              View,
              { inlineAlignment: "center", padding: "base" },
              [
                root.createComponent(
                  Heading,
                  { level: 1 },
                  "🎊 Exclusive Reward!",
                ),
                root.createComponent(
                  BlockStack,
                  { spacing: "extraTight", inlineAlignment: "center" },
                  [
                    root.createComponent(
                      TextBlock,
                      {
                        size: "medium",
                        emphasis: "bold",
                        appearance: "accent",
                      },
                      "You've unlocked something special! 🔓",
                    ),
                    root.createComponent(
                      TextBlock,
                      { appearance: "subdued", size: "small" },
                      "Hand-picked deals just for you as a thank you! 💖",
                    ),
                  ],
                ),
              ],
            ),
            cardContainer,
          ]),
        ]),
      );
    }
  } catch (error) {
    console.error("API Error", error);
  }
  root.mount();
});
