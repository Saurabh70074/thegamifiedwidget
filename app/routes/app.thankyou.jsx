import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  return {
    shop: session.shop,
    message: "Thank you for using our widget!",
  };
}

export default function ThankYouPage() {
  const { shop, message } = useLoaderData();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.icon}>✔</div>

        <h1 style={styles.heading}>Thank You!</h1>
        <p style={styles.text}>{message}</p>

        <p style={styles.shop}>
          Store: <strong>{shop}</strong>
        </p>

        <a href="/app" style={styles.button}>Go to Dashboard</a>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f4f7",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "35px",
    borderRadius: "14px",
    maxWidth: "450px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    fontFamily: "sans-serif",
  },
  icon: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "#4CAF50",
    fontSize: "40px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 20px",
  },
  heading: { fontSize: "26px", marginBottom: "10px" },
  text: { color: "#555", marginBottom: "20px" },
  shop: {
    background: "#f1f3f6",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "25px",
  },
  button: {
    display: "inline-block",
    padding: "12px 22px",
    background: "#4CAF50",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
};
