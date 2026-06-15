import { WeatherCondition } from "@/types/weather";
import { filterRemainingHours, getConditionFromCode, getCurrentHourIndex } from "./weatherUtils";
import { RunScore } from "@/types/runscore";

export interface HourScore {
    time: string;
    score: number;
    tier: RunScore;
    reasons: string[];
    condition: WeatherCondition;
    temperature: number;
    precipProbability: number;
}

function getTier(score: number): RunScore {
    if (score >= 80) return "Ideal";
    if (score >= 60) return "Good";
    if (score >= 40) return "Marginal";
    return "Not Recommended";
}

export function scoreHour(
    time: string,
    temperature: number,
    apparentTemp: number,
    precipProbability: number,
    weathercode: number,
    windspeed: number,
    humidity: number,
    uvIndex: number
): HourScore {
    const rules = [
        { condition: apparentTemp < 0, penalty: 40, reason: "Feels freezing outside" },
        { condition: apparentTemp < 5, penalty: 25, reason: "Very cold for a run" },
        { condition: apparentTemp > 32, penalty: 35, reason: "Too hot, risk of heat exhaustion" },
        { condition: apparentTemp > 27, penalty: 15, reason: "Quite hot, stay hydrated" },
        { condition: precipProbability >= 70, penalty: 35, reason: "High chance of rain" },
        { condition: precipProbability >= 40, penalty: 20, reason: "Possible rain" },
        { condition: precipProbability >= 20, penalty: 10, reason: "Light chance of rain" },
        { condition: windspeed > 40, penalty: 25, reason: "Very strong winds" },
        { condition: windspeed > 25, penalty: 15, reason: "Windy conditions" },
        { condition: humidity > 85, penalty: 15, reason: "Very humid, breathing may feel harder" },
        { condition: humidity > 70, penalty: 8, reason: "Somewhat humid" },
        { condition: uvIndex > 8, penalty: 15, reason: "Very high UV, wear sunscreen" },
        { condition: uvIndex > 5, penalty: 8, reason: "High UV index" },
        { condition: weathercode >= 71, penalty: 40, reason: "Snow on the ground, slippery" },
    ];

    const reasons: string[] = [];
    const score = rules.reduce((acc, rule) => {
        if (rule.condition) {
            reasons.push(rule.reason);
            return acc - rule.penalty;
        }
        return acc;
    }, 100);

    const finalScore = Math.max(0, score);

    return {
        time,
        score: finalScore,
        tier: getTier(finalScore),
        reasons: reasons.length ? reasons : ["Great conditions for a run!"],
        condition: getConditionFromCode(weathercode, temperature),
        temperature,
        precipProbability,
    };
}

export function scoreAllHours(hourly: {
    time: string[];
    temperature_2m: number[];
    apparent_temperature: number[];
    precipitation_probability: number[];
    weathercode: number[];
    windspeed_10m: number[];
    relativehumidity_2m: number[];
    uv_index: number[];
},timezone: string): HourScore[] {
    const currentHour = getCurrentHourIndex(timezone);

    return filterRemainingHours(hourly.time, currentHour)
        .map((time, i) => {
            const idx = currentHour + i;
            return scoreHour(
                time,
                hourly.temperature_2m[idx],
                hourly.apparent_temperature[idx],
                hourly.precipitation_probability[idx],
                hourly.weathercode[idx],
                hourly.windspeed_10m[idx],
                hourly.relativehumidity_2m[idx],
                hourly.uv_index[idx]
            );
        });
}