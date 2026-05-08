import type { Metadata } from "next";
import { SettingsProvider } from "@/lib/settings-context";

export const metadata: Metadata = {
  title: "BLIQK — See what needs action now",
  description: "AI-powered email triage for growing businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet"/>
      </head>
      <body style={{ margin:0, padding:0, fontFamily:"'DM Sans','Helvetica Neue',sans-serif" }}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
