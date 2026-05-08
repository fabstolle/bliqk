"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("founder@bliqk.ai");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    // Demo mode: accept hardcoded credentials
    const adminEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL || "founder@bliqk.ai";
    await new Promise((r) => setTimeout(r, 600));
    if (email && password.length >= 4) {
      router.push("/app");
    } else {
      setError("Invalid credentials. Try: founder@bliqk.ai / demo1234");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D0F1A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Background glow */}
      <div style={{
        position: "fixed",
        top: "-20%",
        left: "30%",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(79,127,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }}/>

      <div style={{ width: 400, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "linear-gradient(135deg,#4F7FFF,#00D4FF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, margin: "0 auto 14px",
            boxShadow: "0 8px 28px rgba(79,127,255,0.4)",
          }}>⚡</div>
          <h1 style={{
            margin: 0, fontSize: 34, fontWeight: 800,
            background: "linear-gradient(135deg,#4F7FFF,#00D4FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -1,
          }}>BLIQK</h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#4A5080", letterSpacing: 0.5 }}>
            See what needs action now.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#12152A",
          borderRadius: 20,
          padding: 32,
          border: "1px solid #1E2140",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#4F7FFF", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>
            DEMO ACCESS
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#4A5080", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>
              EMAIL
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%", padding: "11px 14px", borderRadius: 10,
                border: "1px solid #2A2D4A", background: "#0D0F1A",
                color: "#E8EAF6", fontSize: 14, outline: "none",
                fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#4A5080", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>
              PASSWORD
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%", padding: "11px 14px", borderRadius: 10,
                border: "1px solid #2A2D4A", background: "#0D0F1A",
                color: "#E8EAF6", fontSize: 14, outline: "none",
                fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div style={{ background: "rgba(255,23,68,0.1)", border: "1px solid rgba(255,23,68,0.2)", borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontSize: 12, color: "#FF1744" }}>
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%", padding: 13, border: "none", borderRadius: 12,
              background: loading ? "#1A1D30" : "linear-gradient(135deg,#4F7FFF,#00D4FF)",
              color: loading ? "#4A5080" : "#fff",
              fontSize: 15, fontWeight: 800, cursor: loading ? "default" : "pointer",
              fontFamily: "inherit", letterSpacing: 0.3,
              boxShadow: loading ? "none" : "0 6px 20px rgba(79,127,255,0.35)",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Signing in..." : "⚡ Sign in to BLIQK"}
          </button>

          <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#2A2D4A" }}>
            Demo: founder@bliqk.ai / demo1234
          </div>
        </div>
      </div>
    </div>
  );
}
