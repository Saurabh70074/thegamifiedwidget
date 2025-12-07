"use client";

import React, { useEffect, useRef, useState } from "react";
import VisitProductCard from "./VisitProductCard";
import { backgroundIcons } from "../components/data/backgroundIcons";

export default function VisitTabCard({
  offerDetails = {},
  publisherId,
  isDownloaded = false,
  mobile,
  email,
  code,
  couponId: codeId,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const canvasRef = useRef(null);

  // Load confetti script only once
  useEffect(() => {
    if (!window.__CONFETTI_LOADED__) {
      const s = document.createElement("script");
      s.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js";
      s.async = true;
      s.onload = () => (window.__CONFETTI_LOADED__ = true);
      document.body.appendChild(s);
    }
  }, []);

  const launchConfetti = () => {
    if (window.confetti && canvasRef.current) {
      const conf = window.confetti.create(canvasRef.current, { resize: true });
      conf({
        particleCount: 250,
        spread: 360,
        origin: { x: 0.5, y: 0.45 },
        colors: ["#FFD700", "#FF69B4", "#1E90FF", "#39FF14"],
      });
    }
  };

  useEffect(() => {
    if (isFlipped) launchConfetti();
  }, [isFlipped]);

  if (!offerDetails || isClosed) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.25)",
        backdropFilter: "blur(4px)",
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 1200, // Enables 3D flip
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setIsClosed(true)}
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          zIndex: 100000,
          background: "white",
          borderRadius: "50%",
          width: 34,
          height: 34,
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ✕
      </button>

      {/* CONFETTI CANVAS (TOP MOST LAYER — ALWAYS VISIBLE) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 100000,
        }}
      />

      {/* FLIP CARD WRAPPER */}
      <div
        style={{
          width: 330,
          height: 560,
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          overflow: "visible",
          pointerEvents: "auto",
        }}
        onClick={() => !isFlipped && setIsFlipped(true)}
      >
        {/* FRONT SIDE */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            borderRadius: 32,
            background: "#1B2540",
            overflow: "hidden",
            pointerEvents: isFlipped ? "none" : "auto",
          }}
        >
          {/* Dashed Border */}
          <div
            style={{
              position: "absolute",
              inset: 16,
              borderRadius: 26,
              border: "2px dashed rgba(255,255,255,0.15)",
            }}
          />

          {/* Background ICONS */}
          <div style={{ position: "absolute", inset: 0 }}>
            {backgroundIcons.map(
              ({ Icon, x, y, width, height, rotation }, i) => (
                <img
                  key={i}
                  src={Icon}
                  style={{
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    width,
                    height,
                    transform: `rotate(${rotation}deg)`,
                  }}
                />
              ),
            )}
          </div>

          {/* Center Text */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "#FFC94A",
              fontWeight: 700,
              fontSize: 20,
              textAlign: "center",
              zIndex: 5,
            }}
          >
            Tap to unlock <br /> the reward
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              width: "100%",
              textAlign: "center",
              color: "white",
              opacity: 0.8,
            }}
          >
            <div style={{ fontSize: 12 }}>Powered By</div>
            <div style={{ color: "#FFC94A", fontWeight: 700 }}>
              Gamified <span style={{ fontSize: 10 }}>™</span>
            </div>
          </div>
        </div>

        {/* BACK SIDE (PRODUCT CARD) */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: 32,
            pointerEvents: isFlipped ? "auto" : "none",
            overflow: "visible",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VisitProductCard
            offer={offerDetails}
            isFlipped={true}
            isDownloaded={isDownloaded}
            publisherId={publisherId}
            couponId={codeId}
            code={code}
            mobile={mobile}
            email={email}
          />
        </div>
      </div>
    </div>
  );
}
