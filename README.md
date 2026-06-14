# RunCast — Weather-Based Running Decision Tool

A weather-based decision support tool that helps runners answer one question: **Is now a good time to run?**

Built with Next.js, TypeScript, and Tailwind CSS as part of the Prepr Frontend Developer Challenge.

## Live Demo

[View Deployment](https://your-vercel-url.vercel.app)

## Features

- 📍 Automatic location detection via IP geolocation
- 🌤️ Real-time weather data from Open-Meteo API
- 🏃 Running condition scoring system (0–100) with human-readable reasons
- 🕐 Hourly forecast strip from current hour to midnight
- 🎨 Dynamic background that changes based on current weather condition
- 📱 Fully responsive — works on mobile and desktop

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **APIs:** ip-api.com (geolocation), Open-Meteo (weather forecast)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
weather-app/
```
weather-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   └── error.tsx
├── components/
│   ├── ui/
│   │   ├── HourlyCard.tsx
│   │   ├── HourlyStrip.tsx
│   │   └── RecommendationCard.tsx
│   └── BackgroundScene.tsx
├── lib/
│   ├── getLocation.ts
│   ├── getWeather.ts
│   ├── scorer.ts
│   └── weatherUtils.ts
├── types/
│   ├── weather.ts
│   └── runscore.ts
└── public/
    └── backgrounds/
```


## Assumptions

- User is on a device with a public IP address for geolocation to work
- Weather data is fetched fresh on each page load — no caching layer implemented
- Running conditions are scored based on generally accepted comfortable running ranges and may not suit every runner's preference
- App is optimised for today's forecast only, not multi-day planning

## AI Usage

Claude (Anthropic) was used as a development assistant throughout this project for:
- Planning the folder structure and data flow architecture
- Suggesting the rules-based scoring approach in `scorer.ts`
- Debugging TypeScript type errors
- UI layout and Tailwind class suggestions

All code was reviewed, understood, and integrated manually.