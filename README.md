# Northstar Weather

> "Read the sky before you go."

Northstar Weather is a lightweight weather intelligence dashboard designed to help users understand current conditions, forecasts, air quality, and atmospheric patterns in one clear interface.

Built on an editorial aesthetic and a 100% free, keyless open-data architecture, Northstar provides instant meteorological clarity without ads, trackers, paywalls, or unnecessary complexity.

---

## Features

- **Current Weather**: Instant temperature, apparent "feels-like" differential, wind conditions, relative humidity, and diurnal high/low range.
- **Hourly Forecast**: 24-hour horizontal forecast carousel with temperature, apparent temperature, precipitation probabilities, volume, and wind speeds.
- **7-Day Forecast**: Weekly meteorological outlook displaying predicted daily weather summaries, precipitation probabilities, and temperature ranges.
- **Rain Probability**: Comprehensive precipitation forecasting, including 12-hour hourly distribution histograms and daily maximum precipitation likelihood.
- **UV Index**: Real-time UV rating with descriptive risk categories, peak daily exposure warnings, and sun safety guidance.
- **Atmospheric Pressure**: Barometric surface pressure readings in hectopascals (hPa) with barometric trend indicators.
- **Dew Point**: Atmospheric moisture condensation temperature calculations for accurate comfort assessment.
- **Cloud Cover**: Percentage cloud obscuration with visual progress indicators and atmospheric clarity insights.
- **Visibility**: Meteorological sight distance measured in kilometers or miles with atmospheric clarity assessment.
- **Air Quality**: Real-time US AQI calculation accompanied by pollutant telemetry: PM2.5, PM10, Ozone (O₃), and Nitrogen Dioxide (NO₂).
- **Sunrise & Sunset**: Daylight tracking with solar arc daylight visualization and precise dawn/dusk times.
- **Moon Phase**: Locally computed synodic lunar cycle with phase name, illumination percentage, and upcoming moon phase milestones.
- **Weather Intelligence**: Synthesized editorial summaries, narrative atmospheric forecasts, and heuristic insight badges calculated mathematically from local observations.
- **"Best Time Today" Atmospheric Windows**: Deterministic hourly algorithm identifying optimal outdoor activity periods and lowest rain windows.
- **Favorites**: Save favorite cities to browser local storage with live atmospheric snapshot cards.
- **Recent Searches**: Quick-access history pills for recent locations with one-click reload and history clearing.
- **City Comparison**: Side-by-side comparative table evaluating up to 3 cities across 9 key meteorological variables.
- **Weather Map**: Interactive Leaflet map with OpenStreetMap tiles and custom location marker, lazy-loaded on scroll.
- **Weather Advisories**: Threshold-based meteorological hazard advisories (heavy rain, high UV, gale-force winds, temperature extremes) with prominent disclaimers.
- **Location-Based Weather**: Automatic browser geolocation detection upon entry with smooth fallback to default or cached locations.
- **Responsive Design**: Mobile-first architecture tested across 320px, 375px, 768px, 1024px, 1440px, and 1920px viewports.
- **Offline / Cached Fallback**: 10-minute client cache (in-memory + LocalStorage) and polite inline retry controls.

---

## Technology Stack

- **Markup**: Semantic HTML5 with ARIA accessibility roles and Open Graph social metadata.
- **Styling**: Vanilla CSS3 utilizing modern CSS custom properties, grid/flexbox layouts, micro-animations, and system font integration (DM Mono, Manrope, Georgia).
- **Theme System**: Three built-in themes: Paper (Light), Obsidian (Dark), and System Auto, featuring custom inverted OpenStreetMap map tiles in dark mode.
- **Logic**: Vanilla ES6+ JavaScript (zero build step, zero heavy runtime frameworks).
- **Mapping**: [Leaflet 1.9.4](https://leafletjs.com/) interactive mapping engine.
- **Graphics**: Inline SVG vector iconography, dynamic solar arc visualizations, and weather condition badges.
- **PWA Ready**: Web App Manifest (`manifest.json`) and high-resolution icons (`assets/`).

---

## Data Sources

Northstar Weather relies on a free, open, and keyless data ecosystem:

| Data Provider | Capability | Access Model | Attribution / Terms |
| :--- | :--- | :--- | :--- |
| **[Open-Meteo](https://open-meteo.com/)** | Current, hourly, and 7-day weather forecasts | Free / Keyless | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| **[Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)** | City search, coordinates, administrative regions | Free / Keyless | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| **[Open-Meteo Air Quality](https://open-meteo.com/en/docs/air-quality-api)** | US AQI, PM2.5, PM10, O₃, NO₂ | Free / Keyless | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| **[OpenStreetMap](https://www.openstreetmap.org/)** | Map raster tiles | Public Tile Servers | &copy; [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors (ODbL) |
| **[Leaflet](https://leafletjs.com/)** | Mobile-friendly interactive mapping library | Open Source | BSD 2-Clause License |
| **[BigDataCloud](https://www.bigdatacloud.com/)** | Reverse geocoding for GPS coordinates | Free Client Tier | Free Reverse Geocoding API |
| **Local Calculations** | Synodic lunar phase and solar arc geometry | Client Algorithm | Internal Implementation |

---

## Architecture

Northstar Weather is architected as a static-first, zero-backend web application:

```
[ User Browser ]
       │
       ▼
[ Static Web Host / CDN Edge ] (Cloudflare Pages, Vercel, Netlify, GitHub Pages)
       │  (Delivers static HTML, CSS, JS, and Icons)
       ▼
[ Client Application Runtime ]
  ├── Client Cache Layer (10-min TTL in Memory & LocalStorage)
  ├── In-Flight Request Deduplication Map
  ├── AbortController Signal Manager (Cancels stale queries)
  └── IntersectionObserver (Lazy-loads Leaflet map on scroll)
       │
       ├─────────────────┬─────────────────┬─────────────────┐
       ▼                 ▼                 ▼                 ▼
[ Open-Meteo ]   [ Open-Meteo ]    [ BigDataCloud ]   [ OpenStreetMap ]
  Weather API      AQI & Geo APIs    Reverse Geocode     Tile Servers
```

### Why Static-First?
- **Zero Server Maintenance**: No Node.js runtime, Python WSGI, database, or server daemons to monitor, patch, or maintain.
- **Global Edge Distribution**: Static files are cached across global Anycast CDN edge networks, delivering fast Time-To-First-Byte (TTFB).
- **Zero Attack Surface**: Eliminates server-side vulnerabilities, SQL injections, and container exploits.
- **Direct-to-Source Telemetry**: Browser clients connect directly to public APIs without middleman proxy bottlenecks.

---

## Installation & Local Development

No package installation or compilation steps are required.

### Option 1: Python 3 Built-in Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/<your-username>/northstar-weather.git
cd northstar-weather

# Start local server on port 8000
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.

### Option 2: Node.js (npx serve)
```bash
# Using npx without local installation
npx -y serve .

# Or using npm scripts defined in package.json:
npm start
```

---

## Usage

1. **Search a Location**: Type any city, municipality, or region into the search bar. Use keyboard arrow keys or click on autocomplete suggestions to load instant weather.
2. **Current Location**: Click the compass location icon (`Detect location`) or grant location permission when prompted to load your local area's atmospheric feed.
3. **Toggle Units**: Switch between Celsius (°C) and Fahrenheit (°F), or between kilometers per hour (`km/h`) and miles per hour (`mph`). Your preferences are saved automatically.
4. **Change Theme**: Choose between Paper (Light), Obsidian (Dark), or System Auto using the topbar theme switcher.
5. **Explore Weather Intelligence**: Review hourly forecast graphs, "Best Time Today" activity recommendations, 12-hour rain distributions, and solar/lunar cycles.
6. **Compare Cities**: In the **Compare atmospheric conditions** section, search for up to two additional cities to generate a side-by-side comparison table.
7. **Save Favorites**: Click the star icon next to the city name to save it to your favorites tray for quick access.
8. **Share Weather**: Click the **Share** button to copy a direct link with geographic coordinates to your clipboard.

---

## Project Structure

```
northstar-weather/
│
├── index.html          # Semantic HTML5 markup, PWA metadata, accessibility attributes
├── app.js              # Application logic, caching, sanitization, renderers (no comments)
├── styles.css          # Design system, themes, typography, responsive rules (no comments)
├── manifest.json       # Web App Manifest for mobile installation
├── main.py             # Lightweight Python CLI utility
├── package.json        # Project metadata, keywords, and local dev scripts
├── LICENSE             # MIT License and third-party data attribution notice
├── .gitignore          # Excludes build logs, OS artifacts, and temporary files
├── README.md           # Project documentation and deployment guide
│
└── assets/
    ├── northstar-icon.png       # Official Northstar brand icon (512x512)
    ├── northstar-icon-full.png  # High-resolution master icon asset
    ├── apple-touch-icon.png     # iOS bookmark and home screen icon
    ├── favicon-32x32.png        # Standard browser favicon
    ├── favicon-16x16.png        # Compact browser favicon
    └── favicon.ico              # Multi-resolution fallback icon
```

---

## Performance & Optimization

- **Client-Side In-Memory & LocalStorage Cache (10-min TTL)**: Avoids redundant requests when switching between favorite cities or recent searches.
- **In-Flight Request Deduplication**: Simultaneous requests for identical coordinates share a single network Promise.
- **Request Cancellation with `AbortController`**: Cancels pending geocoding and forecast queries on rapid typing to prevent race conditions and unnecessary network payload processing.
- **Decoupled Air Quality Ingestion**: Main forecast renders immediately; Air Quality data loads asynchronously in the background.
- **Lazy Map Initialization**: Leaflet and OpenStreetMap tiles are only initialized when the user scrolls near the map container via `IntersectionObserver` (250px margin).
- **Strict Input Sanitization**: All dynamic data inserted into DOM structures is sanitized via `escapeHtml()` to eliminate script injection vulnerabilities.

---

## Scalability

Northstar is designed as a static-first application suitable for CDN-based deployment.

Because there is no central database or application server handling incoming traffic, the frontend static files can be distributed across edge CDNs (Cloudflare Pages, Vercel, Netlify, GitHub Pages).

Real-world deployment capacity depends on:
1. **Hosting / CDN Limits**: Bandwidth and request allowances of the chosen static hosting provider.
2. **External API Fair-Use Limits**: Open-Meteo's generous free tier provides up to 10,000 daily API calls per client IP. Caching (10-minute TTL) significantly minimizes API overhead.
3. **Traffic Patterns**: Concurrent users browsing diverse locations will make direct client-side requests to Open-Meteo without placing load on the Northstar host.
4. **Map Tile Usage**: OpenStreetMap public tile servers operate under a fair-use policy. Leaflet map instantiation is deferred until scrolled into view to conserve tile requests.

---

## Privacy Policy

- **No User Accounts**: Northstar Weather requires no login, email, password, or registration.
- **Zero Tracking**: No tracking pixels, third-party analytics, behavioral cookies, or advertising scripts are included.
- **Local Storage Only**: Preferences, recent searches, and saved favorites are stored locally in the browser's `localStorage` and never transmitted to an external server.
- **Geolocation Transparency**: Location access is requested solely to look up local atmospheric conditions via browser APIs. Coordinates are processed locally and never recorded or monetized.

---

## Data Attribution & Disclaimers

- Weather data provided by [Open-Meteo](https://open-meteo.com/) under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Geocoding and Air Quality provided by [Open-Meteo](https://open-meteo.com/).
- Map tiles &copy; [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors under [ODbL](https://opendatacommons.org/licenses/odbl/).
- Mapping software provided by [Leaflet](https://leafletjs.com/).
- Reverse geocoding provided by [BigDataCloud](https://www.bigdatacloud.com/).
- **Advisory Notice**: Weather advisories and risk indicators are derived mathematically from numerical forecast models. They are for informational planning purposes only and do not replace official government emergency warnings or emergency services broadcasts.

---

## Deployment Instructions

### Deploy to Cloudflare Pages
1. Push this repository to GitHub or GitLab.
2. In the Cloudflare dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select the repository:
   - **Framework preset**: None
   - **Build command**: *(Leave blank)*
   - **Build output directory**: `/` (or leave empty)
4. Click **Save and Deploy**.

### Deploy to Vercel
```bash
npx vercel
```
Confirm defaults for a static deployment.

### Deploy to Netlify
```bash
npx netlify deploy --prod --dir=.
```

### Deploy to GitHub Pages
1. Go to repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**.

---

## Future Roadmap

- Additional radar and precipitation layer overlays for the Leaflet map.
- Offline Service Worker support for persistent PWA caching.
- Multi-language localization for international weather terminology.
- Additional air quality indices (European AQI, UK DAQI).

---

## License

This project is licensed under the [MIT License](LICENSE).
See the `LICENSE` file for details and third-party data licenses.
