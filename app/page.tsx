import React from 'react'
import { getLocation } from '@/lib/getLocation'
import { getWeather } from '@/lib/getWeather'
import { scoreAllHours } from "@/lib/scorer";
import BackgroundScene from '@/components/BackgroundScene';
import RecommendationCard from '@/components/ui/RecommendationCard';
import HourlyStrip from '@/components/ui/HourlyStrip';
import { headers } from 'next/headers';
import LocationSearch from '@/components/ui/LocationSearch';
import { geocodeCity } from '@/lib/geoCode';

interface Props {
  searchParams: Promise<{ city?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const { city } = await searchParams;
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "";
  const location = city ? await geocodeCity(city) : await getLocation(ip);
  const weather = await getWeather(location.lat, location.lon)
  const scores = scoreAllHours(weather.hourly)
  const currentScore = scores[0];
  const allTemps = weather.hourly.temperature_2m;
  const high = Math.round(Math.max(...allTemps));
  const low = Math.round(Math.min(...allTemps));
  return (
    <>
      <BackgroundScene condition={currentScore.condition}>
        <div className="flex flex-col items-center pt-20 px-4 text-white">
<LocationSearch />
          <p className="text-xl font-light tracking-widest uppercase opacity-80">
            {location.city}
          </p>
          <h1 className="text-9xl font-thin mt-2">
            {Math.round(currentScore.temperature)}°
          </h1>
          <p className="text-2xl font-light capitalize mt-2 opacity-90">
            {currentScore.condition}
          </p>
          <p className="text-lg font-light opacity-80 mt-1">
            H:{high}° L:{low}°
          </p>
        </div>
        <div className="flex justify-center px-4 pb-10">
          <RecommendationCard
            tier={currentScore.tier}
            reasons={currentScore.reasons}
            score={currentScore.score}
          />
        </div>
     <div  className="pb-10" >
  <HourlyStrip scores={scores} />
</div>
      </BackgroundScene>
    </>
  )
}

