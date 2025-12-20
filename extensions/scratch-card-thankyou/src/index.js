
// // @ts-nocheck
// import {
//   extend,
//   BlockStack,
//   Button,
//   Heading,
//   Image,
//   Layout,
//   TextBlock,
//   View,
//   InlineStack,
//   Separator,
//   Icon,
// } from "@shopify/post-purchase-ui-extensions";

// extend("Checkout::PostPurchase::ShouldRender", async ({ storage }) => {
//   return { render: true };
// });

// extend("Checkout::PostPurchase::Render", async (root, input) => {
//   const { ui, initialPurchase } = input;
//   console.log("input", input);
//   const rawPhone = initialPurchase?.customer?.phone || "9876543221";
//   const userMobile = rawPhone.replace(/\D/g, "");
//   const apiUrl = `https://stageapi.thegamified.com/api/v1/gamified/distribution/coupons?secret=8213a4078f82676dc243859fa9eb4f2aff62f6c62a7f0f174cf7e9873a37a330&userMobile=${userMobile}`;

//   // Modern Loading State with better UX
//   const loadingContainer = root.createComponent(
//     View,
//     { 
//       padding: "extraLoose", 
//       inlineAlignment: "center",
//       background: "surfacePrimary",
//       cornerRadius: "large"
//     },
//     [
//       root.createComponent(BlockStack, { spacing: "base", inlineAlignment: "center" }, [
//         root.createComponent(Heading, { level: 2 }, "🎁"),
//         root.createComponent(TextBlock, { 
//           appearance: "subdued", 
//           emphasis: "bold" 
//         }, "Unlocking your exclusive reward..."),
//       ])
//     ]
//   );
  
//   root.appendChild(loadingContainer);
//   root.mount();

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     root.removeChild(loadingContainer);

//     if (data.status === "success") {
//       const { couponCode, offer } = data;

//       // --- MODERN CARD CONTAINER with gradient-like effect ---
//       const cardContainer = root.createComponent(View, {
//         border: "base",
//         cornerRadius: "large",
//         padding: "none",
//         background: "surfacePrimary",
//       });

//       // --- FRONT SIDE: Mystery/Teaser Design ---
//       const cardFront = root.createComponent(BlockStack, { 
//         spacing: "loose", 
//         inlineAlignment: "center",
//         padding: "extraLoose"
//       }, [
//         // Animated gift icon area
//         root.createComponent(View, { 
//           padding: "loose",
//           background: "surfaceSecondary",
//           cornerRadius: "fullyRounded",
//           inlineSize: 120,
//           blockSize: 120,
//           inlineAlignment: "center",
//           blockAlignment: "center"
//         }, [
//           root.createComponent(View, { 
//             cornerRadius: "fullyRounded", 
//             overflow: "hidden", 
//             blockSize: 80, 
//             inlineSize: 80,
//             border: "base",
//             background: "surfacePrimary"
//           }, [
//             root.createComponent(Image, { source: offer.thumbnail }),
//           ]),
//         ]),
        
//         root.createComponent(Heading, { level: 1 }, "🎉 You've Earned a Reward!"),
        
//         root.createComponent(TextBlock, { 
//           appearance: "subdued",
//           size: "large",
//           inlineAlignment: "center"
//         }, `Exclusive offer from ${offer.brandName}`),
        
//         root.createComponent(View, { padding: "base" }),
        
//         root.createComponent(Button, { 
//           kind: "primary",
//           fullWidth: true,
//           onPress: () => flipCard() 
//         }, "🎁 Reveal My Reward"),
        
//         root.createComponent(TextBlock, { 
//           size: "extraSmall",
//           appearance: "subdued",
//           inlineAlignment: "center"
//         }, "Tap to unlock your exclusive offer"),
//       ]);

//       // --- BACK SIDE: Modern Revealed Design ---
//       const cardBack = root.createComponent(BlockStack, { spacing: "none" }, [
        
//         // Hero Thumbnail Section with overlay effect
//         root.createComponent(View, { 
//           cornerRadius: "none",
//           overflow: "hidden",
//           position: "relative"
//         }, [
//           root.createComponent(View, {
//             inlineSize: "fill",
//             blockSize: 200,
//             maxInlineSize: "100%"
//           }, [
//             root.createComponent(Image, { 
//               source: "https://picsum.photos/350/190", 
//               fit: "cover"
//             }),
//           ]),
//         ]),

//         // Content Section
//         root.createComponent(View, { padding: "loose" }, [
//           root.createComponent(BlockStack, { spacing: "loose" }, [
            
//             // Brand Header with logo
//             root.createComponent(InlineStack, { 
//               spacing: "base", 
//               blockAlignment: "center",
//               inlineAlignment: "start"
//             }, [
//               root.createComponent(View, { 
//                 cornerRadius: "fullyRounded", 
//                 overflow: "hidden", 
//                 blockSize: 50, 
//                 inlineSize: 50,
//                 border: "base"
//               }, [
//                 root.createComponent(Image, { source: "https://picsum.photos/50" }),
//               ]),
//               root.createComponent(BlockStack, { spacing: "extraTight" }, [
//                 root.createComponent(Heading, { level: 2 }, offer.brandName),
//                 root.createComponent(TextBlock, { 
//                   size: "medium", 
//                   emphasis: "bold",
//                   appearance: "success"
//                 }, offer.offerCallout),
//               ]),
//             ]),

//             // Premium Coupon Code Card
//             root.createComponent(View, { 
//               border: "base",
//               padding: "loose",
//               cornerRadius: "base",
//               background: "surfaceSecondary",
//               inlineAlignment: "center"
//             }, [
//               root.createComponent(BlockStack, { 
//                 spacing: "tight",
//                 inlineAlignment: "center"
//               }, [
//                 root.createComponent(TextBlock, { 
//                   size: "small",
//                   appearance: "subdued",
//                   emphasis: "bold"
//                 }, "YOUR EXCLUSIVE CODE"),
                
//                 // Large, prominent code
//                 root.createComponent(View, {
//                   padding: "base",
//                   background: "surfacePrimary",
//                   cornerRadius: "base",
//                   border: "base"
//                 }, [
//                   root.createComponent(TextBlock, { 
//                     size: "extraLarge",
//                     emphasis: "bold",
//                     inlineAlignment: "center"
//                   }, couponCode),
//                 ]),
                
//                 root.createComponent(TextBlock, { 
//                   size: "small",
//                   appearance: "subdued"
//                 }, offer.mov),
                
//                 root.createComponent(TextBlock, { 
//                   size: "extraSmall",
//                   appearance: "subdued",
//                   emphasis: "italic"
//                 }, "Tap code to copy (auto-applied at checkout)"),
//               ]),
//             ]),

//             // How to Redeem - Modern Card Style
//             root.createComponent(View, {
//               border: "base",
//               padding: "base",
//               cornerRadius: "base",
//               background: "surfaceTertiary"
//             }, [
//               root.createComponent(BlockStack, { spacing: "base" }, [
//                 root.createComponent(TextBlock, { 
//                   emphasis: "bold",
//                   size: "medium"
//                 }, "✨ How to Redeem"),
                
//                 root.createComponent(BlockStack, { spacing: "tight" }, 
//                   offer.howtoredeem.map((step, index) => 
//                     root.createComponent(InlineStack, { 
//                       spacing: "tight",
//                       blockAlignment: "start"
//                     }, [
//                       root.createComponent(TextBlock, { 
//                         size: "small",
//                         emphasis: "bold",
//                         appearance: "subdued"
//                       }, `${index + 1}.`),
//                       root.createComponent(TextBlock, { 
//                         size: "small"
//                       }, step),
//                     ])
//                   )
//                 ),
//               ]),
//             ]),

//             // CTA Button - More prominent
//             root.createComponent(Button, { fullWidth: true, external: true, to: offer.link.value }, `Redeem on ${offer.brandName}`),

//             root.createComponent(Separator),

//             // Terms - Compact & Clean
//             root.createComponent(BlockStack, { spacing: "tight" }, [
//               root.createComponent(TextBlock, { 
//                 emphasis: "bold",
//                 size: "small",
//                 appearance: "subdued"
//               }, "Terms & Conditions"),
              
//               root.createComponent(BlockStack, { spacing: "extraTight" }, 
//                 offer.termsandcond.map((term) => 
//                   root.createComponent(TextBlock, { 
//                     size: "extraSmall",
//                     appearance: "subdued"
//                   }, `• ${term}`)
//                 )
//               ),
//             ]),
//           ]),
//         ]),
//       ]);

//       const flipCard = () => {
//         cardContainer.removeChild(cardFront);
//         cardContainer.appendChild(cardBack);
//       };

//       cardContainer.appendChild(cardFront);

//       // Main Layout with better spacing
//       root.appendChild(
//         root.createComponent(Layout, { maxInlineSize: 0.95 }, [
//           root.createComponent(BlockStack, { spacing: "loose" }, [
//             root.createComponent(View, { 
//               inlineAlignment: "center",
//               padding: "base"
//             }, [
//               root.createComponent(Heading, { level: 1 }, "🎊 Congratulations!"),
//               root.createComponent(TextBlock, { 
//                 appearance: "subdued",
//                 inlineAlignment: "center"
//               }, "You've unlocked an exclusive post-purchase reward"),
//             ]),
//             cardContainer,
//           ]),
//         ])
//       );
//     }
//   } catch (error) {
//     console.error("API or Design Error:", error);
//     root.appendChild(
//       root.createComponent(TextBlock, { 
//         appearance: "critical" 
//       }, "Unable to load your reward. Please contact support.")
//     );
//   }
//   root.mount();
// });




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
  Icon,
} from "@shopify/post-purchase-ui-extensions";

extend("Checkout::PostPurchase::ShouldRender", async ({ storage }) => {
  return { render: true };
});

extend("Checkout::PostPurchase::Render", async (root, input) => {
  const { ui, inputData } = input;
  console.log("input", input);
  console.log("domain", input?.inputData?.shop?.domain);
  const domain = input?.inputData?.shop?.domain;
  const userId = inputData?.initialPurchase?.customerId;
  console.log("userId", userId);
  const apiUrl = `https://stageapi.thegamified.com/api/v1/gamified/distribution/coupons?secret=8213a4078f82676dc243859fa9eb4f2aff62f6c62a7f0f174cf7e9873a37a330&userMobile=${userId}`;

  const loadingContainer = root.createComponent(
    View,
    { 
      padding: "extraLoose", 
      inlineAlignment: "center",
      background: "surfacePrimary",
      cornerRadius: "large"
    },
    [
      root.createComponent(BlockStack, { spacing: "base", inlineAlignment: "center" }, [
        root.createComponent(Heading, { level: 2 }, "🎁"),
        root.createComponent(TextBlock, { 
          appearance: "subdued", 
          emphasis: "bold" 
        }, "Unlocking your exclusive reward..."),
      ])
    ]
  );
  
  root.appendChild(loadingContainer);
  root.mount();

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    root.removeChild(loadingContainer);

    if (data.status === "success") {
      const { couponCode, offer } = data;

      const cardContainer = root.createComponent(View, {
        border: "base",
        cornerRadius: "large",
        padding: "none",
        background: "surfacePrimary",
      });

      // --- FRONT SIDE ---
      const cardFront = root.createComponent(BlockStack, { 
        spacing: "loose", 
        inlineAlignment: "center",
        padding: "extraLoose"
      }, [
        root.createComponent(View, { 
          padding: "loose",
          background: "surfaceSecondary",
          cornerRadius: "fullyRounded",
          inlineSize: 120,
          blockSize: 120,
          inlineAlignment: "center",
          blockAlignment: "center"
        }, [
          root.createComponent(View, { 
            cornerRadius: "fullyRounded", 
            overflow: "hidden", 
            blockSize: 80, 
            inlineSize: 80,
            border: "base",
            background: "surfacePrimary"
          }, [
            root.createComponent(Image, { source: offer?.thumbnail }),
          ]),
        ]),
        root.createComponent(Heading, { level: 1 }, "🎉 You've Earned a Reward!"),
        root.createComponent(TextBlock, { 
          appearance: "subdued",
          size: "large",
          inlineAlignment: "center"
        }, `Exclusive offer from ${offer.brandName}`),
        root.createComponent(View, { padding: "base" }),
        root.createComponent(Button, { 
          kind: "primary",
          fullWidth: true,
          onPress: () => flipCard() 
        }, "🎁 Reveal My Reward"),
        root.createComponent(TextBlock, { 
          size: "extraSmall",
          appearance: "subdued",
          inlineAlignment: "center"
        }, "Tap to unlock your exclusive offer"),
      ]);

      // --- BACK SIDE ---
      const cardBack = root.createComponent(BlockStack, { spacing: "none" }, [
        root.createComponent(View, { 
          cornerRadius: "none",
          overflow: "hidden",
          position: "relative"
        }, [
          root.createComponent(View, {
            inlineSize: "fill",
            blockSize: 200,
            maxInlineSize: "100%"
          }, [
            root.createComponent(Image, { 
              source: "https://picsum.photos/350/190", 
              fit: "cover"
            }),
          ]),
        ]),

        root.createComponent(View, { padding: "loose" }, [
          root.createComponent(BlockStack, { spacing: "loose" }, [
            
            // Refined Brand Header (Reduced Gap & Emoji)
            root.createComponent(InlineStack, { 
              spacing: "base", 
              blockAlignment: "center",
              inlineAlignment: "start"
            }, [
              root.createComponent(View, { 
                cornerRadius: "fullyRounded", 
                overflow: "hidden", 
                blockSize: 50, 
                inlineSize: 50,
                border: "base"
              }, [
                root.createComponent(Image, { source: "https://picsum.photos/50" }),
              ]),
              root.createComponent(BlockStack, { spacing: "none" }, [
                root.createComponent(Heading, { level: 2 }, offer.brandName),
                root.createComponent(InlineStack, { spacing: "extraTight" }, [ // Horizontal tight grouping
                   root.createComponent(TextBlock, { size: "medium" }, "🏷️"),
                   root.createComponent(TextBlock, { 
                    size: "medium", 
                    emphasis: "bold",
                    appearance: "success"
                  }, offer.offerCallout),
                ])
              ]),
            ]),

            // Highlighted Coupon Code Card
            root.createComponent(View, { 
              border: "base",
              padding: "loose",
              cornerRadius: "base",
              background: "surfaceSecondary",
              inlineAlignment: "center"
            }, [
              root.createComponent(BlockStack, { 
                spacing: "tight",
                inlineAlignment: "center"
              }, [
                root.createComponent(TextBlock, { 
                  size: "small",
                  appearance: "subdued",
                  emphasis: "bold"
                }, "YOUR EXCLUSIVE CODE"),
                
                // Enhanced Highlighted Code
                root.createComponent(View, {
                  padding: "base",
                  background: "surfaceTertiary", // Changed for higher contrast
                  cornerRadius: "base",
                  border: "base"
                }, [
                  root.createComponent(TextBlock, { 
                    size: "extraLarge",
                    emphasis: "bold",
                    appearance: "accent", // Added semantic color
                    inlineAlignment: "center"
                  }, couponCode),
                ]),
                
                root.createComponent(TextBlock, { 
                  size: "small",
                  appearance: "subdued"
                }, offer.mov),
                
                root.createComponent(TextBlock, { 
                  size: "extraSmall",
                  appearance: "subdued",
                  emphasis: "italic"
                }, "Tap code to copy (auto-applied at checkout)"),
              ]),
            ]),

            root.createComponent(View, {
              border: "base",
              padding: "base",
              cornerRadius: "base",
              background: "surfaceTertiary"
            }, [
              root.createComponent(BlockStack, { spacing: "base" }, [
                root.createComponent(TextBlock, { 
                  emphasis: "bold",
                  size: "medium"
                }, "✨ How to Redeem"),
                
                root.createComponent(BlockStack, { spacing: "tight" }, 
                  offer.howtoredeem.map((step, index) => 
                    root.createComponent(InlineStack, { 
                      spacing: "tight",
                      blockAlignment: "start"
                    }, [
                      root.createComponent(TextBlock, { 
                        size: "small",
                        emphasis: "bold",
                        appearance: "subdued"
                      }, `${index + 1}.`),
                      root.createComponent(TextBlock, { 
                        size: "small"
                      }, step),
                    ])
                  )
                ),
              ]),
            ]),

            root.createComponent(Button, { fullWidth: true, external: true, to: offer.link.value }, `Redeem on ${offer.brandName}`),

            root.createComponent(Separator),

            root.createComponent(BlockStack, { spacing: "tight" }, [
              root.createComponent(TextBlock, { 
                emphasis: "bold",
                size: "small",
                appearance: "subdued"
              }, "Terms & Conditions"),
              
              root.createComponent(BlockStack, { spacing: "extraTight" }, 
                offer.termsandcond.map((term) => 
                  root.createComponent(TextBlock, { 
                    size: "extraSmall",
                    appearance: "subdued"
                  }, `• ${term}`)
                )
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
            root.createComponent(View, { 
              inlineAlignment: "center",
              padding: "base"
            }, [
              root.createComponent(Heading, { level: 1 }, "🎊 Congratulations!"),
              root.createComponent(TextBlock, { 
                appearance: "subdued",
                inlineAlignment: "center"
              }, "You've unlocked an exclusive post-purchase reward"),
            ]),
            cardContainer,
          ]),
        ])
      );
    }
  } catch (error) {
    console.error("API or Design Error:", error);
    root.appendChild(
      root.createComponent(TextBlock, { 
        appearance: "critical" 
      }, "Unable to load your reward. Please contact support.")
    );
  }
  root.mount();
});