"use client";

import React, { useRef, useEffect, useState } from "react";
import toast from "react-hot-toast";

function VisitProductCard({
  isFlipped = false,
  offer = {},
  publisherId = null,
  couponId = null,
  code = "",
  mobile = null,
  email = null,
}) {
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState("Details");
  const cardRef = useRef(null);

  const handleOrder = async (orderType = "order") => {
    if (offer) {
      try {
        await fetch(
          `https://stageapi.thegamified.com/api/v1/gamified/create/order/data/${couponId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              couponCode: code ?? null,
              publisherId,
              orderType,
              mobile,
              userId: "aa567u",
              email,
            }),
          },
        );
      } catch (err) {
        console.log("order error:", err);
      }
    }
  };

  useEffect(() => {
    if (isFlipped && Object.keys(offer).length > 0) handleOrder("order");
  }, [isFlipped]);

  const handleGetCode = async () => {
    try {
      if (code === "NA") return alert("No coupon code available.");
      await navigator.clipboard.writeText(code);
      setShowCode(true);
      alert("Code Copied!");
    } catch {
      alert("Failed to copy code.");
    }
  };

  const handleCopyCode = async () => {
  try {
    if (code === "NA") {
      return toast.error("No coupon code available.", {
        position: "top-center",
        style: {
          background: "#fff",
          color: "#dc2626",
          borderRadius: "10px",
          padding: "12px 18px",
          border: "1px solid #e5e7eb",
          zIndex: 999999999,
        },
      });
    }

    await navigator.clipboard.writeText(code);
    setShowCode(true);

    toast.success("Code copied!", {
      position: "top-center",
      style: {
        background: "#f8f9fa",   // light gray / white
        color: "#16a34a",        // green text
        fontWeight: 600,
        fontSize: "14px",
        borderRadius: "10px",
        padding: "12px 18px",
        border: "1px solid #e5e7eb",
        zIndex: 999999999,       // makes sure toast stays above card
      },
    });
  } catch {
    toast.error("Failed to copy code.", {
      position: "top-center",
      style: {
        background: "#fff",
        color: "#dc2626",
        borderRadius: "10px",
        padding: "12px 18px",
        border: "1px solid #e5e7eb",
        zIndex: 999999999,
      },
    });
  }
};



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const suffix =
      [, "st", "nd", "rd"][day % 10] && ![11, 12, 13].includes(day)
        ? [, "st", "nd", "rd"][day % 10]
        : "th";

    return `${day}${suffix} ${month} ${year}`;
  };

  const tabContent = {
    Details: offer?.details,
    "How to redeem": offer?.howtoredeem,
    "Terms & Condition": offer?.termsandcond,
  };

  return (
    <>
      <div
        ref={cardRef}
        style={{
          width: 330,
          background: "#1B2540",
          borderRadius: 16,
          padding: 16,
          color: "white",
          transform: "scale(1)",
          transition: "0.4s",
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            width: 299,
            height: 170,
            overflow: "hidden",
            borderRadius: 10,
            position: "relative",
            marginBottom: 16,
          }}
        >
          <img
            src={offer?.thumbnail}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 10,
            }}
          />
        </div>

        {/* BRAND */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 30,
              height: 30,
              background: "white",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={offer?.logo}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            {offer?.brandName}
          </div>
        </div>

        {/* TITLE */}
        <div style={{ marginTop: 10, marginBottom: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>
            {offer?.offerCallout}
          </div>
          <div style={{ color: "#CBD5E1" }}>{offer?.mov}</div>
        </div>

        {/* VALIDITY */}
        <div style={{ color: "#94A3B8", fontSize: 14, marginBottom: 8 }}>
          Valid till {offer?.endValidity && formatDate(offer.endValidity)}
        </div>

        <div style={{ marginBottom: 16 }}>
  <button
    onClick={handleCopyCode}
    aria-label={showCode ? "Copy code" : "Get code"}
    style={{
      width: "100%",
      background: "#475569",
      border: "none",
      height: 36,
      borderRadius: 50,
      color: "white",
      padding: "0 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
    }}
  >
    {/* CODE or DOTS */}
    <span
      style={{
        letterSpacing: 1.5,
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {showCode ? (code ? code : "NA") : "••••••••••"}
    </span>

    {/* COPY ICON or GET CODE TEXT */}
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {showCode ? (
        <svg
          onClick={(e) => {
            e.stopPropagation();
            handleCopyCode();
          }}
          aria-label="Copy code again"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ cursor: "pointer" }}
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
        </svg>
      ) : (
        <span style={{ fontSize: 14 }}>Get code</span>
      )}
    </span>
  </button>
</div>


        {/* TABS */}
        <div
          style={{
            display: "flex",
            // gap: 10,
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          {["Details", "How to redeem", "Terms & Condition"].map((label) => {
            const isActive = activeTab === label;

            return (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                style={{
                  padding: "5px 8px",
                  fontSize: 12,
                  fontWeight: 400,
                  borderRadius: 20,
                  border: "1px solid #ffffff33",
                  background: isActive ? "#ffffff22" : "transparent",
                  color: isActive ? "#fff" : "#d1d5db",
                  cursor: "pointer",
                  transition: "0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT */}
        <div
          style={{
            maxHeight: 80,
            overflowY: "auto",
            paddingRight: 6,
            color: "#CBD5E1",
            fontSize: 14,
            marginBottom: 14,
          }}
        >
          {(tabContent[activeTab] || []).map((text, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  background: "#9CA3AF",
                  borderRadius: "50%",
                  marginTop: 6,
                }}
              />
              <p style={{ margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>

        {/* REDEEM BUTTON */}
        <button
          onClick={() => {
            const url = offer?.link?.value || "#";
            handleOrder("click");
            setTimeout(() => window.open(url, "_blank"), 200);
          }}
          style={{
            width: "100%",
            background: "#E9A013",
            border: "none",
            borderRadius: 10,
            padding: "10px 0",
            color: "black",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          Redeem now
        </button>

        {/* FOOTER */}
        <div
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#94A3B8",
            display: "flex",
            justifyContent: "center",
            gap: 6,
          }}
        >
          Powered By{" "}
          <span style={{ fontWeight: 700, color: "#F59E0B" }}>
            Gamified <span style={{ fontSize: 12 }}>™</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default VisitProductCard;
