# AgroMach Industrial CRM — v2.0

**Single-file HTML Quotation & Sales Management System**

---

## 🔐 Login Credentials

| Field    | Value             |
| -------- | ----------------- |
| User ID  | `agromach1`       |
| Password | `amitaggarwal321` |

---

## 🚀 How to Use

1. Copy `agromach_quotation_system.html` to any computer
2. Open in **Chrome / Edge / Firefox** (no server needed)
3. Login with credentials above
4. All data saves automatically in browser `localStorage`

---

## ✅ Complete Feature List

### 🔑 Authentication

- Password-protected login lock screen
- Show/hide password toggle
- Session persists until logout

### 📊 Dashboard

- Total Quotations, Total Value, Won Quotes, Active SP stats
- **Sparkline mini-charts** on every stat card (7-day trend)
- Sales team grid with click-to-view quotations
- **3D card tilt** effect on hover
- Animated stat counters (count-up on load)

### 📝 New Quotation

- Auto-generated quotation number (AEPL-YYYYMMDD-XXXX)
- Customer details: name, contact, email, address
- **Market Type selector — Domestic / International**
  - Domestic → State searchable dropdown (all 28 states + UTs)
  - International → Country searchable dropdown (100+ countries)
  - Label auto-changes: "Location / State" ↔ "Location / Country"
- Machine Type selector (Rice Mill / Flour Mill / Dal Mill / Maize Mill)
- **Quotation Type** — auto-changes based on state:
  - Special states (Haryana, Punjab, UP, MP, Rajasthan): 5 types
  - Other states: 3 standard types
  - International: Export Supply (FOB / CIF) + Turnkey Export
- Component table with quantity control + Select All checkbox
- Capacity-based component filtering (onlyFor:[TPH])
- Turnkey toggle — adds civil, electrical, erection costs
- Live total calculation (Amount A + Amount B)
- Preview quotation before save
- Download PDF

### 👥 Sales Team

- Add / Edit / Delete sales persons
- Upload profile photo
- Assign color per person
- View all quotations by salesperson

### ⚙️ Machinery Config

- Edit machinery names, series, descriptions, prices, motor HP
- Reset to default machinery
- Per-component capacity filtering

### 📄 Terms & Conditions (separate Config page)

Three editable tabs:

- **Standard** — 6 clauses (A–F) + custom clauses
- **Turnkey** — 6 clauses (A–F) + custom clauses
- **International** — FOB/CIF/UNCITRAL-specific clauses + custom clauses
- Add / remove custom clauses per tab
- Save / Reset per tab

### 🔧 Settings

- Company name, address, GSTIN, phone, email
- Salesperson quick-edit
- Terms & Conditions shortcut
- Reset to default

---

## 🎨 Animation Engine

| Feature                   | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| **Splash Screen**         | Branded loading screen on startup (2s)                 |
| **Neural Network Canvas** | 28 floating particles with connecting lines in sidebar |
| **Sidebar Orbs**          | 4 glowing orbs floating in background                  |
| **Cursor Glow**           | Green radial glow follows mouse cursor                 |
| **3D Card Tilt**          | Stat cards tilt with mouse position                    |
| **Confetti Burst**        | 55 particles fly on quotation save                     |
| **Nav Ripple**            | Click ripple on sidebar nav buttons                    |
| **Scroll Reveal**         | Cards fade-in from below on scroll                     |
| **Typewriter Title**      | Page title types letter-by-letter on navigation        |
| **Scan Line**             | Animated scan line on stat cards                       |
| **Button Pulse**          | Primary buttons breathe with glow                      |
| **Page Transition**       | Slide-up animation on page switch                      |
| **Logo Pulse**            | Sidebar logo glows continuously                        |
| **Topbar Edge Flow**      | Animated gradient line on topbar                       |
| **Form Section Shimmer**  | Section headings shimmer with gradient                 |

---

## 🛠️ Power Features

| Feature                   | How to Use                                             |
| ------------------------- | ------------------------------------------------------ |
| **🌙 Dark Mode**          | Toggle button in topbar (top-right). Preference saved. |
| **🔍 Global Search**      | `Ctrl+F` or search icon — searches quotations + pages  |
| **⌨️ Keyboard Shortcuts** | Press `?` to see all shortcuts                         |
| **🔔 Notification Bell**  | Topbar bell icon — activity feed of all saves          |
| **➕ FAB Button**         | Floating green `+` button → New Quotation              |
| **📟 Status Bar**         | Bottom green bar — quote count, mode, last saved time  |
| **🕐 Live Clock**         | Real-time HH:MM:SS clock in topbar                     |
| **💾 Auto-save Pulse**    | Dot blinks orange while saving, shows "Saved ✓"        |
| **📊 Form Progress**      | Bottom bar fills as quotation form is filled           |
| **🏷️ Quote Badge**        | Dashboard nav shows total quotation count              |

### Keyboard Shortcuts

| Shortcut | Action               |
| -------- | -------------------- |
| `?`      | Open shortcuts panel |
| `Ctrl+1` | Dashboard            |
| `Ctrl+N` | New Quotation        |
| `Ctrl+2` | Sales Team           |
| `Ctrl+T` | Terms & Conditions   |
| `Ctrl+F` | Global Search        |
| `Esc`    | Close any panel      |

---

## 💾 Data Storage

- All data stored in **browser localStorage** (no server/internet needed)
- Keys used: `am_settings`, `am_quotations`, `am_salespeople`, `am_machinery`, `am_darkmode`, `am_notifs`
- To backup: Export quotations from the system
- To transfer: Copy the HTML file — localStorage is per-browser

---

## 📁 File Structure

```
quotation/
├── agromach_quotation_system.html   ← Main app (3500+ lines, single file)
├── README.md                        ← This file
└── DEPLOY_INSTRUCTIONS.md           ← GitHub Pages deployment guide
```

---

**Last Updated:** April 10, 2026
**Total Lines:** ~3590
**Technology:** Pure HTML5 + CSS3 + Vanilla JS (no frameworks, no dependencies)
