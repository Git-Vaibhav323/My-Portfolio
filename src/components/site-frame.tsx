"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import AppOverlays from "@/components/app-overlays";

/** App chrome: header, footer, and decorative overlays. */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <AppOverlays />
    </>
  );
}
