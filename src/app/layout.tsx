import "@/styles/globals.css";

import { type Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const envFlag = process.env.NEXT_PUBLIC_ENV_FLAG;
let iconUrl;
switch (envFlag) {
  case "DEV":
    iconUrl = "/favicon-dev.ico";
    break;
  case "STG":
    iconUrl = "/favicon-stg.ico";
    break;
  default:
    iconUrl = "/favicon.ico";
    break;
}

export const metadata: Metadata = {
  title: `Origin UI - Dropdown scrolling issue`,
  icons: [{ rel: "icon", url: iconUrl }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
    <head />
    <body>
      <Toaster position="top-center" />
      <ThemeProvider attribute="class" storageKey="theme" themes={["light", "dark", "solarized", "dark-dimmed"]} enableColorScheme={true}>{children}</ThemeProvider>
    </body>
  </html>
  );
}
