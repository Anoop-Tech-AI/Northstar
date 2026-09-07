# Northstar Weather

> "Read the sky before you go."

Northstar Weather is a full-stack weather intelligence platform engineered with a clean, calm editorial aesthetic and built upon a free, open-data stack. It pairs a static-first, lightweight browser frontend with a secure Node.js/Express REST API and local MongoDB persistence via Mongoose.

Northstar provides instant meteorological clarity without ads, trackers, paid API dependencies, paywalls, or visual clutter.

---

## 1. Full-Stack Architecture

```
                         USER BROWSER
                              │
                              ▼
                      NORTHSTAR CLIENT
               (HTML5, Vanilla CSS3, ES6+ JS)
                              │
                              ▼ HTTP/JSON (Port 8000)
                    NORTHSTAR EXPRESS API
               (Node.js + Express + Middleware)
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
  AUTHENTICATION           MONGODB           WEATHER SERVICE
 (JWT / HttpOnly /    (Mongoose Models)     (Open-Meteo Proxy /
  bcryptjs Hashing)   - User Profile        SSRF Protection /
  - /api/v1/auth      - Cloud Favorites      In-Memory Cache)
  - /api/v1/users     - User Preferences    - /api/v1/weather
                      - Alert Rules
                      - Search History
```

---

## 2. Key Features

### Weather Intelligence & UX
- **Today at a Glance**: Instant diurnal breakdown covering Morning, Afternoon, Evening, and Overnight periods with representative temperatures, weather icons, feels-like differentials, and conditions.
- **Precipitation Probability Window**: Deterministic scanning calculating peak likelihood hours and timing windows (e.g., *75% peak between 2 PM and 5 PM*).
- **Diurnal Thermal Span & Solar Peak**: Identifies daily maximum/minimum timing and Solar Noon UV exposure milestones.
- **Actionable Compact Trend**: Streamlined SVG trajectory sparkline answering clear meteorological questions without consuming vertical screen real estate.
- **Hourly Telemetry Carousel & Inspector**: 24-hour carousel with interactive selection panel detailing wind gusts, relative humidity, dew point, cloud cover, and UV index.
- **7-Day Expandable Outlook**: Weekly forecast cards featuring accordion expansions for daily wind thresholds, UV exposure, precipitation sum, and sunrise/sunset times.
- **Air Quality (AQI)**: European & US AQI telemetry with PM2.5, PM10, O₃, NO₂, and SO₂ particulate tracking.
- **Interactive Weather Map**: Integrated Leaflet cartography with OpenStreetMap tiles, custom marker popups, and click-to-query coordinate weather retrieval.
- **Command Palette (`Ctrl+K` / `Cmd+K`)**: Rapid keyboard-first navigation with live geocoding suggestions, recent searches, and one-click GPS detection.
- **Multi-City Comparison**: Side-by-side comparative table evaluating up to 3 cities across key meteorological variables.

### Full-Stack & Account Features
- **Guest Mode (First-Class)**: Complete weather dashboard, search, maps, AQI, and local browser favorites work out of the box with zero registration required.
- **Secure User Authentication**: User registration and login powered by bcrypt password hashing and secure JWT HttpOnly session cookies.
- **Cloud Favorites & Preferences**: Authenticated cross-device sync for saved locations, preferred measurement units (°C/°F, km/h/mph), and appearance themes.
- **LocalStorage Migration**: Automated prompt on initial login offering one-click migration of local browser favorites to the cloud account.
- **Personal Weather Alert Rules**: User-configurable threshold alerts (rain percentage, temperature extremes, AQI thresholds) stored per user.
- **Search History Sync**: Automatic tracking of completed location searches, capped at 15 items with instant clearing controls.
- **Weather API Proxy Service**: Backend proxy caching external Open-Meteo requests for 10 minutes with strict coordinate validation and SSRF protection.
- **Zero Code Comments**: 100% strict compliance across the entire codebase with zero code comments.

---

## 3. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, Vanilla CSS3 (Custom Properties, Grid, Flexbox), Vanilla ES6+ JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cookie-parser` |
| **Security** | `helmet`, `cors`, `express-rate-limit`, SSRF coordinate bounds validation |
| **Mapping** | [Leaflet 1.9.4](https://leafletjs.com/), [OpenStreetMap](https://www.openstreetmap.org/) |
| **APIs** | Open-Meteo (Forecast, Air Quality, Geocoding), BigDataCloud (Reverse Geocoding) |

---

## 4. API Reference

All backend endpoints are namespaced under `/api/v1/`:

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Service health and MongoDB connection status | No |
| `POST` | `/api/v1/auth/register` | Register a new user account | No (Rate limited) |
| `POST` | `/api/v1/auth/login` | Authenticate credentials and receive HttpOnly cookie | No (Rate limited) |
| `POST` | `/api/v1/auth/logout` | Invalidate authentication session cookie | No |
| `GET` | `/api/v1/auth/me` | Retrieve authenticated user profile | Yes |
| `GET` | `/api/v1/users/profile` | Retrieve user profile information | Yes |
| `PUT` | `/api/v1/users/profile` | Update account display name | Yes |
| `GET` | `/api/v1/favorites` | List all cloud favorites for authenticated user | Yes |
| `POST` | `/api/v1/favorites` | Add a new cloud favorite location | Yes |
| `POST` | `/api/v1/favorites/sync` | Bulk sync local browser favorites to cloud account | Yes |
| `DELETE` | `/api/v1/favorites/:id` | Remove a cloud favorite location | Yes |
| `PATCH` | `/api/v1/favorites/:id` | Update custom label or display order | Yes |
| `GET` | `/api/v1/preferences` | Retrieve user dashboard and unit preferences | Yes |
| `PUT` | `/api/v1/preferences` | Update temperature unit, wind unit, or theme | Yes |
| `GET` | `/api/v1/alerts` | List personal threshold alert rules | Yes |
| `POST` | `/api/v1/alerts` | Create a new alert rule | Yes |
| `DELETE` | `/api/v1/alerts/:id` | Delete an alert rule | Yes |
| `GET` | `/api/v1/search-history` | Get recent search history (capped at 15) | Yes |
| `DELETE` | `/api/v1/search-history` | Clear search history | Yes |
| `GET` | `/api/v1/weather` | Query cached, normalized weather and air quality telemetry | No |

---

## 5. Environment Configuration

Create a `.env` file in the project root based on `.env.example`:

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/northstar-weather
JWT_SECRET=northstar_development_jwt_secret_change_in_production
CLIENT_ORIGIN=http://localhost:8000
```

> **Security Note**: Never commit real database credentials or production JWT secrets to source control. The `.env` file is excluded in `.gitignore`.

---

## 6. Installation & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- Local MongoDB server running on `mongodb://127.0.0.1:27017`

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anoop-Tech-AI/Northstar.git
   cd Northstar
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the platform**:
   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:8000/`.

---

## 7. Security Architecture

- **Password Protection**: Passwords are salted and hashed using `bcryptjs` with 10 salt rounds before persistence. Plaintext passwords are never stored or logged.
- **Token Security**: Authentication utilizes JWTs delivered via `HttpOnly`, `SameSite: Lax` cookies, protecting against client-side XSS token theft.
- **Strict Authorization**: Every database query on user data is explicitly scoped to `req.user._id`. Users cannot view, modify, or delete another user's records.
- **SSRF Prevention**: The backend weather proxy restricts outbound requests strictly to Open-Meteo domains and validates coordinate ranges (`-90 <= lat <= 90`, `-180 <= lon <= 180`).
- **Input Validation & Sanitization**: Comprehensive server-side schema validation via Mongoose and express middleware. HTML escaping (`escapeHtml`) on all dynamic frontend injections.
- **Rate Limiting**: Tiered request throttling with `express-rate-limit` protecting auth endpoints from brute-force attempts.
- **HTTP Security Headers**: `helmet` headers configured with tailored Content Security Policy (CSP), frame protection, and MIME type protections.
- **Database Fault Tolerance**: Non-blocking database connection handling. If MongoDB is temporarily offline, weather querying and guest browsing remain 100% operational.

---

## 8. License & Attributions

Northstar Weather is open source under the [MIT License](LICENSE).

- Weather Data: [Open-Meteo](https://open-meteo.com/) ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))
- Map Data: [OpenStreetMap](https://www.openstreetmap.org/) contributors ([ODbL](https://www.openstreetmap.org/copyright))
- Map Engine: [Leaflet](https://leafletjs.com/) (BSD 2-Clause License)
- Geocoding: [BigDataCloud](https://www.bigdatacloud.com/)
