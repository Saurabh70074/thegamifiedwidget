export default function AdditionalPage() {
  return (
    <s-page heading="Thank You!">
      <s-section>
        {/* MAIN BEAUTIFUL CARD */}
        <div
          style={{
            background: "#ffffff",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            maxWidth: "650px",
            margin: "0 auto",
          }}
        >
          {/* Title */}
          <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "12px" }}>
            Order Confirmed <span style={{ fontSize: "26px" }}>🎉</span>
          </h2>

          {/* Description */}
          <p style={{ color: "#555", fontSize: "15px", lineHeight: "1.6" }}>
            Thank you for your purchase! Your order has been successfully placed.
            We're preparing everything and you'll receive updates shortly.
          </p>

          {/* Center Illustration */}
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
              alt="Order confirmed"
              style={{ width: "120px", opacity: 0.9 }}
            />
          </div>

          {/* ORDER SUMMARY CARD */}
          <div
            style={{
              background: "#F8FAFC",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "20px",
              border: "1px solid #E2E8F0",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
              Order Summary
            </h3>

            <p style={{ margin: "6px 0" }}>
              <strong>Order ID:</strong> #45321
            </p>
            <p style={{ margin: "6px 0" }}>
              <strong>Status:</strong> Processing
            </p>
            <p style={{ margin: "6px 0" }}>
              <strong>Estimated Delivery:</strong> 3–5 business days
            </p>
          </div>

          {/* NEXT STEPS */}
          <div style={{ marginTop: "24px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
              What Happens Next?
            </h3>

            <ul style={{ marginLeft: "20px", lineHeight: "1.8", color: "#555" }}>
              <li>You will receive a confirmation email shortly.</li>
              <li>We’ll notify you when your items are shipped.</li>
              <li>You can track your order anytime from your dashboard.</li>
            </ul>
          </div>

          {/* HELP */}
          <div style={{ marginTop: "25px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
              Need Help?
            </h3>

            <p style={{ color: "#555" }}>
              If you have any questions, feel free to reach out to our support team.
              Visit{" "}
              <s-link href="https://help.shopify.com" target="_blank">
                Help Center
              </s-link>.
            </p>
          </div>
        </div>
      </s-section>

      {/* RIGHT SIDE RESOURCES CARD */}
      {/* <s-section
        slot="aside"
        heading="Resources"
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <s-unordered-list>
          <s-list-item>
            <s-link
              href="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
              target="_blank"
            >
              App nav best practices
            </s-link>
          </s-list-item>

          <s-list-item>
            <s-link
              href="https://shopify.dev/docs/apps/checkout"
              target="_blank"
            >
              Customize Checkout & Thank You Pages
            </s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section> */}
    </s-page>
  );
}
