# TDEECalculator.com — Internal Linking Plan & Topical Silo Architecture

**Project:** TDEECalculator.com  
**Website:** `https://tdeecalculater.com/`  
**Purpose:** Establish crawl paths, transfer PageRank, prevent orphan pages, and build topical silos with natural, descriptive anchor text.

---

## 1. Internal Linking Strategy & Architecture

The site structure follows a **two-tier hub-and-spoke topical cluster architecture**:
```
                           [ Homepage: / ]
                    (Primary Keyword: TDEE Calculator)
                                   |
         +-------------------------+-------------------------+
         |                                                   |
[ Cluster 1: Specialized Calculators ]             [ Cluster 2: In-Depth Guides ]
  - /bmr-calculator/                                 - /blog/what-is-tdee/
  - /maintenance-calorie-calculator/                 - /blog/how-to-calculate-tdee/
  - /calorie-deficit-calculator/                     - /blog/tdee-vs-bmr/
  - /calorie-surplus-calculator/                     - /blog/tdee-for-weight-loss/
  - /tdee-for-weight-gain/                           - /blog/mifflin-st-jeor-equation/
  - /macro-calculator/                               - /tdee-for-muscle-building/
  - /calories-burned-calculator/                     - /healthy-food-and-healthy-life/
                                   |
         +-------------------------+-------------------------+
                                   |
                     [ Cluster 3: E-E-A-T & Trust ]
                       - /how-we-calculate/ (Methodology)
                       - /sources/ (Clinical References)
                       - /editorial-policy/
                       - /about/
                       - /contact/
```

### Core Linking Rules
1. **Contextual & Intent-Driven:** Informational articles link to the most relevant calculator at the moment of intent (e.g. an article discussing BMR links directly to `/bmr-calculator/`).
2. **Reverse Flow to Primary Hub:** Every calculator and informational article contains a clear link back to the homepage `/` with natural anchor text (e.g. `← Back to Main TDEE Calculator` or `interactive TDEE calculator`).
3. **Descriptive Anchor Text:** No generic "click here" or "read more". Anchor text describes the target topic (e.g. `Mifflin-St Jeor formula`, `calculate your resting metabolic rate`, `plan a calorie deficit`).
4. **Zero Orphan Pages:** Every indexable route is reachable via header navigation, footer navigation tree, and in-content contextual links.

---

## 2. In-Content Contextual Internal Link Map

| Source URL | Target URL | Proposed Anchor Text | Context / Rationale |
|---|---|---|---|
| `/` (Homepage) | `/blog/what-is-tdee/` | `What Is TDEE? — Meaning, 4 Components & Full Explanation` | Found in the intro and "What Is TDEE" definition section for searchers wanting foundational theory. |
| `/` (Homepage) | `/blog/how-to-calculate-tdee/` | `How to Calculate TDEE` | Guides users to step-by-step mathematical calculations and worked examples. |
| `/` (Homepage) | `/blog/mifflin-st-jeor-equation/` | `Mifflin-St Jeor equation` | Links directly from the formula citation in the calculator results panel and editorial trust box. |
| `/` (Homepage) | `/how-we-calculate/` | `View our complete mathematical methodology` | Positioned in the calculator results disclaimer card for scientific transparency. |
| `/` (Homepage) | `/bmr-calculator/` | `BMR Calculator` | Links from the results card where estimated BMR is displayed. |
| `/` (Homepage) | `/maintenance-calorie-calculator/` | `Maintenance Calorie Calculator` | Links from the results explanation to the specialized weight maintenance tool. |
| `/` (Homepage) | `/calorie-deficit-calculator/` | `Calorie Deficit Calculator` | Links from the Goal Simulator's fat loss target cards. |
| `/` (Homepage) | `/macro-calculator/` | `Macro Calculator` | Links from the Macronutrient Allocation card to the standalone macro builder. |
| `/blog/what-is-tdee/` | `/` | `main TDEE calculator` | Allows readers who landed on the definition guide to immediately compute their expenditure. |
| `/blog/what-is-tdee/` | `/bmr-calculator/` | `calculate your Basal Metabolic Rate` | Contextual link in the BMR component section. |
| `/blog/what-is-tdee/` | `/blog/tdee-vs-bmr/` | `detailed comparison between TDEE and BMR` | Direct cross-link to clarify the difference between resting and daily expenditure. |
| `/blog/what-is-tdee/` | `/calories-burned-calculator/` | `daily physical activity and exercise burn` | Contextual link in the NEAT and EAT component sections. |
| `/blog/how-to-calculate-tdee/` | `/` | `interactive online calculator` | Lead-in link enabling searchers to calculate their TDEE automatically after seeing manual steps. |
| `/blog/how-to-calculate-tdee/` | `/blog/mifflin-st-jeor-equation/` | `clinical Mifflin-St Jeor formula` | Links directly to the mathematical proof and study validation. |
| `/blog/how-to-calculate-tdee/` | `/how-we-calculate/` | `scientific formulas and calculation assumptions` | Direct methodology citation in the formula breakdown section. |
| `/blog/tdee-vs-bmr/` | `/bmr-calculator/` | `BMR Calculator` | Prominent call-to-action allowing users to test their personal BMR floor. |
| `/blog/tdee-vs-bmr/` | `/` | `calculate your Total Daily Energy Expenditure` | Essential link to calculate total energy burn after learning why BMR is only resting burn. |
| `/blog/tdee-vs-bmr/` | `/blog/tdee-for-weight-loss/` | `safe calorie deficit guidelines` | Advises users why consuming below BMR is dangerous and links to proper deficit planning. |
| `/blog/tdee-for-weight-loss/` | `/calorie-deficit-calculator/` | `Calorie Deficit Calculator` | Primary conversion link enabling users to calculate -15%, -22%, or -30% targets. |
| `/blog/tdee-for-weight-loss/` | `/macro-calculator/` | `protein and macronutrient distribution` | Explains the importance of high protein (1.6–2.2g/kg) during fat loss to spare lean muscle mass. |
| `/blog/tdee-for-weight-loss/` | `/#calibration-lab` | `Adaptive TDEE Calibration Lab` | Advises users experiencing weight loss plateaus to track calorie intake and weight trends. |
| `/tdee-for-muscle-building/` | `/calorie-surplus-calculator/` | `Calorie Surplus Calculator` | Links to the dedicated hypertrophy surplus calculator for calculating a +10% to +15% buffer. |
| `/tdee-for-muscle-building/` | `/macro-calculator/` | `macronutrient allocation calculator` | Guides lifters to optimize protein (2.0–2.2g/kg) and carbohydrate intake for glycogen replenishment. |
| `/tdee-for-weight-gain/` | `/tdee-for-muscle-building/` | `TDEE for Muscle Building` | Cross-links weight gain searchers looking to gain lean tissue rather than excess body fat. |
| `/bmr-calculator/` | `/` | `TDEE Calculator` | Guides users from their resting metabolic baseline to calculating total daily burn. |
| `/bmr-calculator/` | `/how-we-calculate/` | `Mifflin-St Jeor and Katch-McArdle formulas` | Links to clinical citations and formula limitations. |
| `/maintenance-calorie-calculator/`| `/calorie-deficit-calculator/` | `Calorie Deficit Calculator` | Logical progression for users whose maintenance calories indicate a need for weight loss. |
| `/maintenance-calorie-calculator/`| `/tdee-for-weight-gain/` | `Weight Gain Calculator` | Logical progression for users looking to exit maintenance into a lean surplus. |
| `/calorie-deficit-calculator/` | `/macro-calculator/` | `Macro Calculator` | Enables deficit searchers to allocate grams of protein, carbs, and fats to their calorie target. |
| `/macro-calculator/` | `/healthy-food-and-healthy-life/` | `whole-food nutrition and meal planning guide` | Contextual link from macronutrient numbers to real-world micronutrient-rich food sources. |
| `/calories-burned-calculator/` | `/` | `homepage Movement Questionnaire` | Directs users to calibrate their occupational step count and activity multiplier. |
| `/how-we-calculate/` | `/sources/` | `peer-reviewed clinical bibliography` | Connects methodology explanations with formal PubMed scientific citations. |

---

## 3. Orphan Page Prevention & Navigation Verification

Our audit of incoming internal links across the repository confirmed:
- **Homepage (`/`):** 93 incoming internal links.
- **Top Calculators (`/bmr-calculator/`, `/macro-calculator/`, etc.):** 54 to 67 incoming links each.
- **Informational Guides (`/blog/*`):** 50 to 55 incoming links each.
- **Trust & Legal Pages (`/about/`, `/sources/`, etc.):** 24 to 82 incoming links each.
- **Orphan Status:** **Zero orphan pages detected.** Every route is reachable within 1–2 clicks from the homepage through crawlable semantic HTML `<a href="...">` anchor tags.
