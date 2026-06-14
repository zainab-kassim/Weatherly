import { WeatherCondition } from "@/types/weather";

const gradients: Record<WeatherCondition, string> = {
  sunny: "linear-gradient(to bottom, #f97316, #fbbf24, #fef08a)",
  cloudy: "linear-gradient(to bottom, #1e293b, #334155, #64748b)",
  rainy: "linear-gradient(to bottom, #0f172a, #1e3a5f, #334155)",
  chilly: "linear-gradient(to bottom, #0c1445, #1e3a5f, #94a3b8)",
  snowy: "linear-gradient(to bottom, #e2e8f0, #cbd5e1, #f8fafc)",
};

interface Props {
  condition: WeatherCondition;
  children: React.ReactNode;
}

export default function BackgroundScene({ condition, children }: Props) {
  return (
    <div
      className="min-h-screen w-full transition-all duration-1000"
      style={{ background: gradients[condition] }}
    >
      {children}
    </div>
  );
}