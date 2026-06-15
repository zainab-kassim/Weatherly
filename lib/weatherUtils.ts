import { WeatherCondition } from "@/types/weather";

export function getConditionFromCode(weathercode: number, temperature: number): WeatherCondition {
  // Snow
  if (weathercode >= 71) return "snowy";

  // Rain
  if (weathercode >= 51) return "rainy";

  // Chilly (temperature based, not weather code)
  if (temperature <= 5) return "chilly";

  // Cloudy
  if (weathercode >= 1) return "cloudy";

  // Clear/Sunny
  return "sunny";
}

export function getCurrentHourIndex(timezone: string): number {
  return new Date(new Date().toLocaleString("en-US", { timeZone: timezone })).getHours();
}

export function filterRemainingHours<T>(data: T[], startIndex: number): T[] {
  return data.slice(startIndex);
}