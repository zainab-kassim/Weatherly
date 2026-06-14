import { RunScore } from "@/types/runscore";

const tierColors: Record<RunScore, string> = {
    Ideal: "text-green-400",
    Good: "text-blue-400",
    Marginal: "text-yellow-400",
    "Not Recommended": "text-red-400",
};

interface Props {
    tier: RunScore;
    reasons: string[];
    score: number;
}

export default function RecommendationCard({ tier, reasons, score }: Props) {
    return (
        <div className="mt-6 w-full max-w-sm rounded-2xl px-6 py-5 border"
            style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            }}
        >
            <div className="flex items-center justify-between mb-3">
                <p className="text-white text-sm uppercase tracking-widest opacity-70">
                    Running Conditions
                </p>
                <span className={`text-sm font-semibold ${tierColors[tier]}`}>
                    {score}/100
                </span>
            </div>
            <p className={`text-2xl font-semibold mb-3 ${tierColors[tier]}`}>
                {tier}
            </p>
            <ul className="space-y-1">
                {reasons.map((reason, i) => (
                    <li key={i} className="text-white text-sm opacity-80">
                        • {reason}
                    </li>
                ))}
            </ul>
        </div>
    );
}