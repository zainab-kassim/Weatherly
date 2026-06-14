import { WeatherCondition } from "@/types/weather";
import { RunScore } from "@/types/runscore";
import Image from "next/image";

const tierColors: Record<RunScore, string> = {
    Ideal: "text-green-400",
    Good: "text-blue-400",
    Marginal: "text-yellow-500",
    "Not Recommended": "text-red-400",
};


function getIcon(condition: WeatherCondition, hour: number): string {
    const isNight = hour >= 20 || hour < 6;

    const icons: Record<WeatherCondition, { day: string; night: string }> = {
        sunny: { day: "https://img.icons8.com/?size=100&id=8EUmYhfLPTCF&format=png&color=000000", night: "https://img.icons8.com/?size=100&id=VT8HlhlnhUwL&format=png&color=000000" },
        cloudy: { day: "https://img.icons8.com/?size=100&id=zIVmoh4T8wh7&format=png&color=000000", night: "https://img.icons8.com/?size=100&id=VT8HlhlnhUwL&format=png&color=000000" },
        rainy: { day: "https://img.icons8.com/?size=100&id=7Dcax1eBasEf&format=png&color=000000", night: "https://img.icons8.com/?size=100&id=wBPV56Uje50D&format=png&color=000000" },
        chilly: { day: "https://img.icons8.com/?size=100&id=0jk61BDH9XNt&format=png&color=000000", night: "https://img.icons8.com/?size=100&id=3RZmbgKAmbsY&format=png&color=000000" },
        snowy: { day: "https://img.icons8.com/?size=100&id=cyZConbteZk9&format=png&color=000000", night: "https://img.icons8.com/?size=100&id=cyZConbteZk9&format=png&color=000000" },
    };

    return isNight ? icons[condition].night : icons[condition].day;
}

interface Props {
    time: string;
    temperature: number;
    condition: WeatherCondition;
    precipProbability: number;
    tier: RunScore;
    isNow: boolean;
    score: number;
}

export default function HourlyCard({ time, temperature, condition, precipProbability, tier, isNow, score }: Props) {
    const date = new Date(time);
    const hour = date.getHours();
    const label = isNow ? "Now" : date.toLocaleTimeString([], { hour: "numeric", hour12: true });
    const icon = getIcon(condition, hour);

    return (
        <div
            className='flex flex-col items-center  px-4 pt-4 pb-2 rounded-2xl w-[200px]'
            style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
            }}
        >

            <p className="text-white text-sm font-medium opacity-80 pb-2">{label}</p>
            <Image width={30} height={30} src={icon} alt={condition} className="text-3xl" />
            {precipProbability >= 20 && (
                <p className="text-blue-300 text-sm font-semibold">{precipProbability}%</p>
            )}
            <p className="text-white text-lg font-light">{Math.round(temperature)}°</p>
              <div className="text-center mb-3 pt-2">
                <p className="text-white text-[12px] uppercase tracking-widest opacity-70">
                    Running Conditions
                </p>
                <span className={`text-sm font-semibold ${tierColors[tier]}`}>
                    {score}/100
                </span>
                <p className='text-white text-sm font-medium opacity-80 '>
                    {tier}
                </p>
            </div>
        </div>
    );
}