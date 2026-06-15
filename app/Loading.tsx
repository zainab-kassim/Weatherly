export default function Loading() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center pt-12 px-4"
      style={{ background: "linear-gradient(to bottom, #1e293b, #334155, #64748b)" }}
    >
      {/* Search bar skeleton */}
      <div className="w-full max-w-sm h-9 rounded-full mb-6 animate-pulse"
        style={{ background: "rgba(255,255,255,0.15)" }}
      />

      {/* City name */}
      <div className="w-24 h-4 rounded-full mb-4 animate-pulse"
        style={{ background: "rgba(255,255,255,0.2)" }}
      />

      {/* Big temperature */}
      <div className="w-48 h-32 rounded-2xl mb-2 animate-pulse"
        style={{ background: "rgba(255,255,255,0.15)" }}
      />

      {/* Condition */}
      <div className="w-20 h-4 rounded-full mb-2 animate-pulse"
        style={{ background: "rgba(255,255,255,0.2)" }}
      />

      {/* H/L */}
      <div className="w-28 h-3 rounded-full mb-8 animate-pulse"
        style={{ background: "rgba(255,255,255,0.15)" }}
      />

      {/* Recommendation card */}
      <div className="w-full max-w-sm h-44 rounded-2xl mb-6 animate-pulse"
        style={{
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      />

      {/* Hourly strip */}
      <div className="w-full max-w-sm flex gap-3 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[100px] h-40 rounded-2xl animate-pulse"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
        ))}
      </div>
    </div>
  );
}