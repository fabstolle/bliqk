import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BLIQK — See what needs action now",
  description: "AI-powered email triage for growing businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        background: "#0D0F1A",
        color: "#E8EAF6",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      }}>
        {children}
      </body>
    </html>
  );
}
