export interface LocationData {
  lat: number;
  lon: number;
  city: string;
  region: string;
  country: string;
}

export async function getLocation(): Promise<LocationData> {
  const res = await fetch("http://ip-api.com/json/");

  if (!res.ok) { 
    throw new Error("Failed to fetch location");
  }

  const data = await res.json();

  if (data.status !== "success") {
    throw new Error("Location lookup unsuccessful");
  }

  return {
    lat: data.lat,
    lon: data.lon,
    city: data.city,
    region: data.regionName,
    country: data.country,
  };
}