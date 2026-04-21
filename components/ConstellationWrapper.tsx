"use client";

import dynamic from "next/dynamic";

const ConstellationBackground = dynamic(
  () => import("@/components/ConstellationBackground"),
  { ssr: false }
);

export default function ConstellationWrapper() {
  return <ConstellationBackground />;
}
