# Wycie-wilków | Odrodzenie

<div align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120" width="100%" max-width="600px">
    <rect width="600" height="120" rx="18" fill="#0f172a"/>
    <!-- Logo -->
    <g transform="translate(20,20) scale(0.15)">
      <path fill="#34d399" d="M255.563 22.094c-126.81 0-229.594 102.784-229.594 229.594 0 25.4 4.132 49.846 11.75 72.687 40.154-24.203 76.02-41.17 107.56-52.03-35.752 5.615-66.405 23.66-109.843 4 31.552-27.765 87.682-65.842 138.532-71.658 26.58-21.615 68.113-43.962 89.655-37.28 30.492-26.873 67.982-61.093 108.125-85.75 10.667 16.156 17.124 35.94 12.563 57.874-80.37 20.205-61.692 148.928 13.468 67.44 6.348 13.064 9.41 26.665 9.095 41.436-32.675 33.83-66.97 63.026-101.938 87.906.466 23.99-5.605 52.915-19 84.813-5.635 13.42-7.33 36.406 22.875 53.97 101.14-24.012 176.375-114.924 176.375-223.408 0-126.81-102.815-229.593-229.625-229.593zm3.312 164.375c-17.835 2.22-32.794 9.046-45.844 18.968 12.083-.036 25.612 2.882 37.5 6.156 6.208-6.698 10.236-18.52 8.345-25.125z"/>
    </g>
    <!-- Title -->
    <text x="120" y="65" font-family="Arial, sans-serif" font-size="28" fill="white" font-weight="bold">
      Wycie Wilków
    </text>
    <!-- Trademark -->
    <text x="325" y="45" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af">™</text>
    <!-- Subtitle -->
    <text x="120" y="90" font-family="Arial, sans-serif" font-size="14" fill="#9ca3af">
      Odrodzenie - The Unified Polish Masterplan
    </text>
  </svg>

  <br><br>

  ![Data Engineering](https://img.shields.io/badge/Data_Engineering-0052CC?style=for-the-badge&logo=apache&logoColor=white)
  ![Machine Learning](https://img.shields.io/badge/Machine_Learning-FF6F00?style=for-the-badge&logo=scikit-learn&logoColor=white)
  ![GIS](https://img.shields.io/badge/Geospatial_GIS-4EA94B?style=for-the-badge&logo=qgis&logoColor=white)
  ![MapLibre](https://img.shields.io/badge/MapLibre_GL_JS-FF4655?style=for-the-badge&logo=maplibre&logoColor=white)

</div>

## 🌍 Abstract & POC (Proof of Concept)

**Project Wycie-wilków** represents a paradigm shift in environmental restoration. Instead of conquering nature, we aim to enforce biomimicry by blending ancient ecological practices with cutting-edge autonomous technology. 

**Odrodzenie-OS** acts as the central intelligence, autonomously monitoring telemetry data, evaluating environmental crises, and orchestrating interventions across four primary ecological domains in Poland. 

This Proof of Concept (POC) dashboard serves as the human-in-the-loop observer station, allowing operators to monitor the AI's real-time telemetry processing, assess domain statuses, and interact with mitigation recommendations when human authorization is required.



## 🗺️ Ecological Domains (The Blueprint)

The system governs four critical biomes, each presenting a unique crisis and a targeted AI-driven ancient intervention:

### 1. Wilk (The Primeval Forest)[Sylva]
* **Location:** Białowieża National Park
* **The Crisis:** Spruce bark beetle (*Ips typographus*) infestations exacerbated by climate droughts.
* **The Ancient Method:** Dead-Wood Ecology and draft-horse extraction to prevent soil compaction.
* **The AI Integration (Silent Canopy Protocol):** Fusing high-orbit multi-spectral satellite data (Sentinel-2) to detect early water-stress signatures. Offline AudioMoth Edge AI sensors listen for ultrasonic beetle chewing without disturbing protected wildlife.

### 2. Żubr (Hydrological Lifelines)[Woda]
* **Location:** Masovian Plains & Central Poland
* **The Crisis:** Severe national freshwater scarcity, rapid snowmelt runoff, and summer droughts.
* **The Ancient Method:** *Zastawki* (woven-wood weirs) and Beaver-mimicry.
* **The AI Integration:** Hydrological ML analyzes and identifies optimal micro-choke points. Biodegradable, IoT-actuated weirs are dynamically toggled based on IMGW rainfall forecasting.

### 3. Dzięciołek (Industrial Detoxification)[Ziemia]
* **Location:** Upper Silesia
* **The Crisis:** Toxic coal mining tailing heaps (*hałdy*) leaching heavy metals.
* **The Ancient Method:** Phytoremediation and topographical terracing.
* **The AI Integration:** Chemical ML models calculate precise terracing geometries. Autonomous Drone Swarms deploy custom bio-mixtures of hyper-accumulating plants (willows/mustards) and mycorrhizal fungi.

### 4. Łoś (The Baltic Defense)[Morze]
* **Location:** Pomeranian Coastline & Gdańsk Deep
* **The Crisis:** Coastal erosion, eutrophication, and rusting WWII chemical munitions.
* **The Ancient Method:** Permeable Baltic willow fascines, glacial boulder reefs, and native bivalve filtration.
* **The AI Integration:** Hydrodynamic ML models simulate storm surges to 3D-print mathematically perfect fascine reefs. Autonomous Underwater Vehicles (AUVs) seed structures with Baltic Blue Mussels, while AI-routed pontoons harvest shoreline reeds.

---

## 🏗️ System Architecture

### Frontend (Human Observer Interface)
- **Framework:** React + TypeScript running on Vite.
- **Mapping Engine:** MapLibre GL JS (`react-map-gl/maplibre`) for high-performance, dark-mode topographical visualization.
- **UI/Styling:** Tailwind CSS for a technical, HUD-like military/ecological aesthetic.
- **Icons:** Lucide React for consistent, crisp vector iconography.

### Core Architecture Components
1. **Frontend (React/Vite):** Visualizes the POC telemetry, mapping, and intervention triggers.
2. **Backend (Express.ts/Node.js):** REST API Gateway routing telemetry requests and authorizing human-in-the-loop triggers. Handles middleware serving and payload validation.
3. **Database (Target DB: PostgreSQL/Firestore):** Stores historical intervention logs, node sensor data, and domain ecological metrics. 

---

## 🗄️ Database Architecture (Full-Stack Blueprint)

To scale from this POC into a robust data pipeline, Odrodzenie-OS utilizes a Relational or Document DB structure based on three core pillars: Telemetry, Domains, and Interventions.

### 1. `Domains` Table / Collection
Defines the meta-status of the four primary biomes.
```typescript
interface DomainSchema {
  id: string;               // e.g., 'wilk', 'zubr'
  name: string;             // 'Sylva', 'Woda'
  region: string;           // 'Białowieża National Park'
  co2_absorption: float;    // e.g., 92.1
  active_nodes: int;        // e.g., 142
  bio_data_flux: string;    // '3.2TB/s'
  crisis_status: 'NOMINAL' | 'ELEVATED' | 'CRITICAL';
}
```

### 2. `Telemetry_Logs` Table / Collection
Streams continuous ingestion from IoT endpoints, satellites, and drones.
```typescript
interface TelemetrySchema {
  id: uuid;                     
  domain_id: string;            // Foreign Key -> Domains.id
  sensor_type: string;          // 'SENTINEL_2', 'AUDIOMOTH', 'VISUAL_DRONE'
  payload: JSONB;               // {"soil_moisture": 0.12, "ultrasonic_anomaly": true}
  timestamp: Date;
  natura_2000_conflict: string; // 'NONE', 'ACTIVE_EAGLE_NEST'
}
```

### 3. `Intervention_Events` Table / Collection
An immutable ledger tracking the Human-in-the-Loop ecosystem modifications.
```typescript
interface InterventionSchema {
  id: uuid;                     
  domain_id: string;            // Foreign Key -> Domains.id
  target_node: string;          // "Canopy_Grid_77", "Weir_Alpha_45"
  action_type: string;          // "Actuate_Zastawki_Close", "Drone_Swarm"
  decision: "PROCEED" | "ABORT"; // Human authorization payload
  operator_id: string;          // ID of human authorizer
  executed_at: Date;
  reasoning: text;              // AI-generated reasoning string
}
```
PWA(Progressive Web App)Mobile +Desktop
---

## 🛠️ Project Structure

```text
/
├── src/
│   ├── components/       # Reusable UI components (HUD elements, Buttons)
│   ├── lib/              # Utility functions (e.g., Tailwind class merging)
│   ├── App.tsx           # Main application shell and Map context
│   ├── constants.ts      # Domain configurations, ML blueprints, Coordinates
│   ├── main.tsx          # React DOM entry point
│   └── index.css         # Global Tailwind directives
├── public/               # Static assets
├── package.json          # Node dependencies
├── vite.config.ts        # Vite configuration
└── README.md 
|___server.ts            # backend API gateway
```
---

## 🚀 Running the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```
---

   Dev.Team-Amiram Azulay | AI-Studio(Gemini)
> **Contact & Licensing Inquiries:**
> This architecture is proprietary. For licensing, investment discussions, and pilot program deployments, please contact the project administration.
> **All Rights Reserved © 2026**
