"use client";

export function HeroGlobe() {
  return (
    <div className="relative w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px]">
      {/* Glow backdrop */}
      <div className="absolute inset-[-20%] rounded-full bg-blue-500/10 blur-3xl" />

      {/* Globe sphere */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #1e3a5f 0%, #0c1929 50%, #060d16 100%)",
          boxShadow:
            "inset -20px -20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(59,130,246,0.15), 0 0 120px rgba(59,130,246,0.08)",
        }}
      />

      {/* Rotating grid lines */}
      <div className="absolute inset-0 animate-globe-spin">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          stroke="rgba(100,180,255,0.12)"
          strokeWidth="0.4"
        >
          {/* Longitude lines */}
          <ellipse cx="100" cy="100" rx="50" ry="98" />
          <ellipse cx="100" cy="100" rx="80" ry="98" />
          <ellipse cx="100" cy="100" rx="98" ry="98" />
          <ellipse
            cx="100"
            cy="100"
            rx="30"
            ry="98"
            transform="rotate(30 100 100)"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="70"
            ry="98"
            transform="rotate(-20 100 100)"
          />
          {/* Latitude lines */}
          <ellipse cx="100" cy="60" rx="82" ry="20" />
          <ellipse cx="100" cy="100" rx="98" ry="24" />
          <ellipse cx="100" cy="140" rx="82" ry="20" />
          <ellipse cx="100" cy="75" rx="92" ry="22" />
          <ellipse cx="100" cy="125" rx="92" ry="22" />
        </svg>
      </div>

      {/* Specular highlight */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Atmosphere edge glow */}
      <div
        className="absolute inset-[-2px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, transparent 48%, rgba(59,130,246,0.1) 52%, transparent 56%)",
        }}
      />
    </div>
  );
}
