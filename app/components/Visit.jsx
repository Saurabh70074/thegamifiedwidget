
import React, { useState, useEffect } from "react";
import VisitTabCard from "./VisitTabCard";

/**
 * Visit component - fetches offers and renders VisitTabCard
 * Props:
 *  - secret, mobile, email, params (optional)
 */
const Visit = ({
  secret,
  mobile,
  email,
  params,
}) => {
  const [offer, setOffer] = useState({});
  const [code, setCode] = useState("");
  const [couponId, setCouponId] = useState("");
  const [publisherId, setPublisherId] = useState(null);

  const fetchOffers = async () => {
    try {
      const res = await fetch(
        `https://stageapi.thegamified.com/api/v1/gamified/distribution/coupons?secret=${secret}&userMobile=${mobile}`
      );
      const data = await res.json();

      if (data?.offer) {
        setOffer({
          ...data.offer,
          couponCode: data?.couponCode,
        });
        setCode(data?.couponCode || "");
        setCouponId(data?.couponId || "");
      }

      setPublisherId(data?.publisherId || null);
    } catch (err) {
      console.error("Failed to fetch offer", err);
    }
  };

  useEffect(() => {
    fetchOffers();
    // load confetti lib once (cdn)
    if (!window.__CONFETTI_LOADED__) {
      const s = document.createElement("script");
      s.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
      s.async = true;
      s.onload = () => {
        window.__CONFETTI_LOADED__ = true;
      };
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 20 }}>
      <VisitTabCard
        offerDetails={offer}
        isDownloaded={true}
        publisherId={publisherId}
        mobile={mobile}
        email={email}
        code={code}
        couponId={couponId}
      />
    </div>
  );
};

export default Visit;
