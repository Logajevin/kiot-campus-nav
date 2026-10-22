# 🗺️ KIOT Campus Navigation System
### Knowledge Institute of Technology (KIOT), Kakapalayam, Salem, Tamil Nadu

An interactive, responsive campus wayfinding and navigation web application engineered specifically for **Knowledge Institute of Technology (KIOT)**. Built with **React 19, TypeScript, Leaflet, and Tailwind CSS**.

![KIOT Campus Navigation](https://img.shields.io/badge/Campus-KIOT%20Salem-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-Map-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Hosting](https://img.shields.io/badge/Hosting-GitHub%20Pages-222222?style=for-the-badge&logo=github)

---

## 🌟 Key Features

1. **Hybrid Outdoor & Indoor Navigation**:
   * **Outdoor Campus Map**: Accurate OpenStreetMap representation of KIOT Salem campus on NH-544, with polygon overlays for all engineering blocks, hostels, sports complex, bus bay, and cafeteria.
   * **Indoor Multi-Floor Blueprint**: Floor-by-floor switcher (Ground, Floor 1, Floor 2, Floor 3) showing classrooms, specialized laboratories, faculty cabins, HOD offices, and restrooms.
2. **Dijkstra & A* Pathfinding Engine**:
   * Instant client-side calculation of the shortest walkable path.
   * Accurate distance metrics in meters and estimated walking times.
3. **♿ Wheelchair & Step-Free Accessibility Toggle**:
   * One-click toggle that automatically routes around stairs, selecting ramps and passenger elevators.
4. **📷 "You Are Here" QR Code Scanner & Simulator**:
   * Camera-based physical QR code reader + interactive demo simulator to pinpoint origin immediately without indoor GPS drift.
5. **Turn-by-Turn Guidance Drawer**:
   * Step-by-step walking instructions with interactive progress simulation and arrival celebration.
6. **Instant Campus Directory Search**:
   * Rapid search by department (CSE, IT, AI-DS, ECE, EEE, Mech, Civil, MBA), lab name, faculty name, or student amenity (ATM, First Aid, Xerox).
7. **Emergency Contacts Hub**:
   * One-touch calling for 24/7 Security Desk, Campus Medical Clinic, Transport Incharge, and Student Welfare.

---

## 🏛️ Campus Blocks & Facilities Included

* **Administrative Block (ADM)**: Principal's Office, Autonomous Exam Cell (COE), Admissions & Counseling, Placement & Corporate Relations (PAT).
* **CSE, IT & AI Academic Block (CSE)**: Computing Center 1, Cloud & Networks Lab, Artificial Intelligence & Data Science (AI-DS) Lab, IoT Center of Excellence, CSBS Lab.
* **ECE & EEE Academic Block (ECE)**: Electrical Machines Lab, VLSI Design Lab, DSP & Communication Lab, Robotics & Automation Lab.
* **Mechanical & Civil Block (MECH)**: Machine Shop, Advanced CAD/CAM Center, Thermal Lab, Structural Engg Lab.
* **Knowledge Business School (KBSS)**: Standalone MBA classrooms, Executive Case Study rooms, KIOT Startup Incubation Center.
* **Central Library & Media Center (LIB)**: 45,000+ technical volumes, Quiet Study Hall, Digital Library (50 workstations).
* **KIOT Grand Auditorium (AUD)**: 1200-seat acoustic event auditorium.
* **Central Food Court (CAN)**: Hygienic dining, bakery, and juice kiosk.
* **Boys' & Girls' Hostel Complexes (BH / GH)**: Residential blocks, mess halls, and recreation areas.
* **Sports Complex & Cricket Ground (SPT)**: 400m track, athletic pitch, gym, and Anna University tournament venue.
* **College Bus Terminal (BUS)**: Fleet parking serving Salem, Erode, Namakkal, and Dharmapuri routes.

---

## 🚀 How to Host on GitHub Pages (Free & Automatic)

This repository includes a pre-configured **GitHub Actions Workflow** (`.github/workflows/deploy.yml`) that automatically builds and deploys your website every time you push to the `main` branch.

### Option 1: Deploy with GitHub Actions (Recommended)

1. **Create a new repository on GitHub**:
   * Go to [GitHub New Repository](https://github.com/new).
   * Name your repository: `kiot-campus-nav` (or any name you choose).
   * Keep it **Public** (required for free GitHub Pages).

2. **Push your code to GitHub**:
   ```bash
   # Inside the kiot-campus-nav directory
   git init
   git add .
   git commit -m "feat: initial release of KIOT Salem Campus Navigation System"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/kiot-campus-nav.git
   git push -u origin main
   ```

3. **Enable GitHub Pages in your repository settings**:
   * In your GitHub repository, click on **Settings** $\rightarrow$ **Pages** (under Code and automation).
   * Under **Build and deployment** $\rightarrow$ **Source**, select **GitHub Actions**.
   * That's it! GitHub Actions will run the build and publish your site at:
     ```
     https://<YOUR_GITHUB_USERNAME>.github.io/kiot-campus-nav/
     ```

---

### Option 2: 1-Command Manual Deploy via `gh-pages`

You can also deploy manually at any time using the included `gh-pages` package:

```bash
npm run deploy
```

This will automatically trigger `npm run build` and push the generated `dist/` directory directly to the `gh-pages` branch of your repository.

---

## 💻 Local Development Setup

To run and preview the project locally on your machine:

```bash
# 1. Navigate into project folder
cd kiot-campus-nav

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

To create a production build:
```bash
npm run build
npm run preview
```

---

## 🛠️ Technology Stack

| Layer | Framework / Library |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Maps & GIS** | [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) + OpenStreetMap |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Celebrations**| [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Pathfinding** | Custom Dijkstra & A* Graph Algorithm (Step-free routing) |
| **Deployment** | GitHub Actions & GitHub Pages |

---

## 📄 License
MIT License. Created for Knowledge Institute of Technology (KIOT), Kakapalayam, Salem.
