// app/routes/widget.jsx
"use client";

import React from "react";
import Visit from "../components/Visit";

export default function WidgetRoute() {
  // read query params from the URL
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;

  const secret = params?.get("secret") || "";
  const mobile = params?.get("mobile") || "";
  const email = params?.get("email") || "";

  return (
    <div className="min-h-screen bg-transparent">
      <Visit secret={secret} mobile={mobile} email={email} params={params} />
    </div>
  );
}
