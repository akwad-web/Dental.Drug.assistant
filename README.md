# 🦷 Dental Drug Decision Support

A **professional, bilingual (Arabic / English), offline-first** dental pharmacology
decision-support system built for **dentists in Egypt**.

It is a pure **static web application** — HTML, CSS and vanilla JavaScript, **no
frameworks and no backend** — packaged as an installable **Progressive Web App (PWA)**.
It runs entirely in the browser, works **fully offline**, and is ready to host on
**GitHub Pages**.

> **Clinical disclaimer:** This tool provides decision support only. It does **not**
> replace professional judgement. Always verify doses against a current formulary
> (e.g. the BNF) and consider the individual patient. The treating dentist is
> responsible for the final prescription.

---

## ✨ Features

- **Drug database** — 60+ drugs across 11 categories (analgesics, NSAIDs, opioids,
  antibiotics, antifungals, antivirals, mouthwashes, corticosteroids, emergency drugs,
  sedation, local anaesthetics), each with bilingual generic name, **Egyptian trade
  names**, class, indications, contraindications, adult & paediatric dosing, max daily
  dose, available forms, pregnancy/lactation, renal/hepatic adjustment, side effects,
  dental recommendations, references and evidence level.
- **Patient assessment** — age (years/months), weight, gender, pregnancy & trimester,
  breastfeeding, allergies, medical conditions, current medications and suspected
  diagnosis.
- **Rule-based prescribing engine** — personalised safety status per drug
  (Suitable / Caution / Adjust dose / Contraindicated) driven by allergy groups,
  age limits, pregnancy, and organ-impairment rules.
- **Diagnosis → recommendation** — 20 common dental diagnoses mapped to first-line
  options, with explicit “antibiotics indicated / not indicated” flags.
- **Clinical calculators**
  - Paediatric weight-based dosing (mg/kg, with per-dose and daily caps)
  - Local anaesthetic maximum dose (by weight + cartridge count)
  - Infective-endocarditis prophylaxis (high-risk conditions + adult/child regimens)
  - Emergency drug quick reference
- **Drug-interaction checker** — severity-graded (major / moderate / minor) including
  drug-to-drug, drug-to-class and drug-to-current-medication checks (warfarin, statins,
  SSRIs, alcohol, etc.) plus an allergy cross-check.
- **Prescription generator** — build a prescription, edit doses/instructions, then
  **Print** or **Export to PDF** (via the browser’s print-to-PDF — works offline).
- **Patient history** — saved locally in the browser (never leaves the device).
- **Admin panel** — add / edit / delete drugs, manage Egyptian trade names, and
  export / import / reset the database.
- **Bilingual UI** — full Arabic ↔ English switch with automatic RTL / LTR layout.
- **Dark & light themes.**
- **Offline PWA** — installable, cached by a service worker.

---

## 📂 Project structure

```
Dental-Drug-Assistant/
├── index.html                 # App entry point
├── manifest.json              # PWA manifest
├── service-worker.js          # Offline cache
├── README.md
├── LICENSE
├── css/
│   └── styles.css             # Themes, RTL/LTR, responsive, print
├── js/
│   ├── i18n.js                # Internationalisation (EN/AR)
│   ├── db.js                  # JSON database loader + admin persistence
│   ├── engine.js              # Rule-based prescribing & safety engine
│   ├── calculators.js         # Clinical calculators
│   ├── interactions.js        # Interaction engine
│   ├── prescription.js        # Prescription builder + print/PDF
│   ├── history.js             # Local patient history
│   ├── admin.js               # Admin / database management
│   ├── app.js                 # Main controller / routing / UI
│   └── pwa.js                 # SW registration + install prompt
├── database/
│   ├── drugs.json             # Drug formulary
│   └── diagnoses.json         # Diagnoses & treatment considerations
├── interactions/
│   └── interactions.json      # Severity-graded interactions
├── rules/
│   └── prescribing-rules.json # Clinical safety rules
├── calculators/
│   └── calculators.json       # LA max doses, prophylaxis, emergency
├── guidelines/
│   └── guidelines.json        # Clinical guidelines & references
├── translations/
│   ├── en.json
│   └── ar.json
└── assets/
    └── icons/
        ├── icon-192.png
        └── icon-512.png
```

---

## 🚀 Getting started

### Option A — Open directly
Unzip the folder and open **`index.html`** in a modern browser.

> ⚠️ Some browsers block `fetch()` of local JSON over the `file://` protocol. If the
> app shows a “could not load the database” message, use **Option B** or deploy to
> GitHub Pages.

### Option B — Run a tiny local server (recommended for local testing)

With **Python 3** (pre-installed on macOS/Linux, available for Windows):

```bash
cd Dental-Drug-Assistant
python3 -m http.server 8000
```

Then open <http://localhost:8000> .

With **Node.js**:

```bash
npx serve .
# or
npx http-server -p 8000
```

---

## 🌐 Deploy to GitHub Pages

1. Create a new GitHub repository and push the **contents** of this folder to the
   default branch (e.g. `main`):

   ```bash
   cd Dental-Drug-Assistant
   git init
   git add .
   git commit -m "Dental Drug Decision Support"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. In the repo go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**, select
   **main** and **/ (root)**, then **Save**.
4. Your site will be live at
   `https://<you>.github.io/<repo>/` within a minute or two.

Because the app is 100% static, no build step is required. The service worker will
cache everything on first load so the app then works **offline**.

---

## 💾 Install as an app (PWA)

Open the site in Chrome/Edge (desktop or Android). Click the **install** icon in the
top bar (or the browser’s “Install app” menu). On iOS use **Share → Add to Home
Screen**. Once installed it launches full-screen and works offline.

---

## 🛠️ Admin / customising the formulary

Open the **Admin** view to:

- Add, edit or delete drugs (including Egyptian trade names).
- **Export** the current database to JSON (keep a backup).
- **Import** a previously exported JSON.
- **Reset** to the bundled default database.

Admin changes are saved to the browser’s `localStorage` on that device only, so the
bundled `database/drugs.json` is never modified. To ship a permanent change, export
the JSON and replace `database/drugs.json` in the repo.

---

## 🌍 Browser support

Any modern, evergreen browser: Chrome, Edge, Firefox, Safari (desktop & mobile).
RTL/Arabic rendering and the service worker require a reasonably current version.

---

## 📚 Evidence base

Content is compiled from, and cross-referenced to, widely used dental and medical
references, including:

- **ADA** — Antibiotic use for dental pain & intra-oral swelling (2019)
- **SDCEP** — *Drug Prescribing for Dentistry*; *Management of Medical Emergencies in
  Dental Practice*; *Conscious Sedation in Dentistry*
- **AHA** — Prevention of infective endocarditis (2021)
- **NICE CG64** — Prophylaxis against infective endocarditis
- **AAPD** — paediatric prescribing guidance
- **Cochrane** — analgesics for acute dental pain
- **BNF / BNF for Children**
- **WHO** Model List of Essential Medicines
- **Kassab, F.** — *Essentials of Drugs in Dentistry* (أساسيات الأدوية في طب الأسنان)

Each drug record lists its references and an evidence level (A/B/C).

---

## ⚖️ License

Released under the **MIT License** — see [LICENSE](LICENSE).
Drug information is for clinical decision support and must be verified before use.

---

## 🧑‍⚕️ Author / purpose

Built as a clinical decision-support aid for dental professionals in Egypt.
Not a substitute for a qualified clinician’s judgement.
