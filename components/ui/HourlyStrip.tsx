import { HourScore } from "@/lib/scorer";
import { WeatherCondition } from "@/types/weather";
import HourlyCard from "./HourlyCard";

interface Props {
    scores: HourScore[];
}

export default function HourlyStrip({ scores }: Props) {
    return (
        <div className="w-full mt-6 px-4 overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 flex-nowrap w-max mx-auto">
                {scores.map((score, i) => (
                    <div className="shrink-0" key={score.time}>
                        <HourlyCard

                            key={score.time}
                            score={score.score}
                            time={score.time}
                            temperature={score.temperature}
                            condition={score.condition}
                            precipProbability={score.precipProbability}
                            tier={score.tier}
                            isNow={i === 0}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}