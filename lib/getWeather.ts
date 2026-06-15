export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  weathercode: number[];
  windspeed_10m: number[];
  relativehumidity_2m: number[];
  uv_index: number[];
}

export interface WeatherData {
  hourly: HourlyWeather;
 timezone: string;
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m,relativehumidity_2m,uv_index&timezone=auto&forecast_days=1`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await res.json();

 return {
  hourly: data.hourly,
timezone: data.timezone,
};
}