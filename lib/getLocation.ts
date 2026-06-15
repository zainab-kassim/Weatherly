export interface LocationData {
  lat: number;
  lon: number;
  city: string;
  region: string;
  country: string;
  error?: boolean;
}
export interface LocationData {
  lat: number;
  lon: number;
  city: string;
  region: string;
  country: string;
  error?: boolean;
}

export async function getLocation(ip: string = ""): Promise<LocationData> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`);

    if (!res.ok) {
      throw new Error("Failed to fetch location");
    }

    const data = await res.json();

    if (data.status !== "success") {
      throw new Error("Location Lookup unsuccessful");
    }

    return {
      lat: data.lat,
      lon: data.lon,
      city: data.city,
      region: data.regionName,
      country: data.country,
      error: false,
    };
  } catch {
    return {
      lat: 45.4215,
      lon: -75.6972,
      city: "Ottawa",
      region: "Ontario",
      country: "Canada",
      error: true,
    };
  }
}