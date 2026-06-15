export interface GeocodedLocation {
  lat: number;
  lon: number;
  city: string;
  region: string;
  country: string;
    error?: boolean;
}

export async function geocodeCity(city: string): Promise<GeocodedLocation> {
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch geocoding data");
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    const result = data.results[0];

    return {
      lat: result.latitude,
      lon: result.longitude,
      city: result.name,
      region: result.admin1 ?? "",
      country: result.country ?? "",
    };
  } catch {
    return {
      lat: 0,
      lon:0 ,
      city: "",
      region: "",
      country: "",
        error: true
    };
  }
}