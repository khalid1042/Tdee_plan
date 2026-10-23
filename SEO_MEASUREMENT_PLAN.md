# TDEECalculator.com — SEO Measurement Plan & Search Console Evaluation

**Project:** TDEECalculator.com  
**Website:** `https://tdeecalculater.com/`  
**Execution Environment:** Google Antigravity  
**Measurement Cadence:** Weekly Pulse Check · Monthly Performance Review · Quarterly Strategic Re-indexing  

---

## 1. Ethical Measurement Mandate

In strict accordance with PRD Section 13 and Antigravity core guidelines:
* **No Fabricated Data:** We do not invent fictional baseline clicks, impressions, keyword difficulty scores, or projected traffic increases.
* **Empirical Verification:** True search performance can only be evaluated through live Google Search Console (GSC) properties and privacy-conscious analytics once access or export data is connected.
* **Separation of Metrics:** Measurement must segregate the Homepage `/` from Supporting Silo Pages to avoid skewing long-tail analysis.

---

## 2. Google Search Console & Webmaster Configuration

### 2.1 Verification & Sitemap Submission
1. **Property Ownership:**
   - Verify domain-level property `sc-domain:tdeecalculater.com` in Google Search Console via DNS TXT record or HTML file upload.
   - Verify matching property in Bing Webmaster Tools (essential data provider for ChatGPT Search / SearchGPT).
2. **Sitemap Indexing:**
   - Submit `https://tdeecalculater.com/sitemap.xml` directly to GSC.
   - Verify that all 24 production URLs are submitted and have zero indexation blocks.
3. **Canonical & URL Inspection Baseline Checklist:**
   - Inspect `https://tdeecalculater.com/` → Confirm Google-selected canonical matches user-declared canonical.
   - Inspect `https://tdeecalculater.com/blog/what-is-tdee/` → Confirm clean indexation without redirect conflict.
   - Inspect `https://tdeecalculater.com/bmr-calculator/` → Confirm rich snippet eligibility for WebApplication and FAQPage.

---

## 3. Core Measurement Dimensions & Metrics

| Category | Specific Metric | Primary Data Source | Evaluation Purpose | Healthy Target Threshold |
|---|---|---|---|---|
| **Crawlability & Technical Health** | Valid Pages in Index | GSC Page Indexing Report | Ensure all 24 valid pages are indexed without "Page with redirect" or "Duplicate without user-selected canonical" errors. | 100% of sitemap URLs indexed |
| **Search Visibility (Head Term)** | Homepage Impressions & Average Position | GSC Performance (Filter: Page `/`) | Track visibility for primary keywords ("TDEE Calculator", "calculate TDEE", "TDEE calculator formula"). | Gradual upward trajectory; initial impressions in top 50 |
| **Long-Tail Discovery** | Subpage Impressions & Queries | GSC Performance (Filter: Pages `/blog/*`, `/bmr-calculator/`, etc.) | Measure organic query count for long-tail intents (activity levels, physical jobs, adaptive tracking, weight loss deficits). | Increasing query count month-over-month |
| **Click-Through Rate (CTR)** | Average CTR by Query & Page | GSC Performance Report | Evaluate the real-world effectiveness of updated page titles and meta descriptions. | 3.5%–6.0%+ on top-10 ranked queries |
| **Calculator User Engagement** | Calculations Completed | Local Session Analytics (Privacy-Conscious) | Measure the percentage of homepage visitors who interact with the form, change units, or simulate goals. | >45% calculation completion rate |
| **Differentiator Adoption** | Questionnaire & Calibration Usage | Local Custom Events (`wizard_completed`, `calibration_run`) | Evaluate how many users take the Movement Questionnaire or run the 14-Day Calibration Lab. | >15% engagement on advanced tools |
| **AI Platform Discovery** | AI Referral Sessions | GA4 Custom Event (`ai_referral`) | Track organic citations and click referrals originating from ChatGPT, Perplexity, Gemini, and Claude. | Baseline capture and weekly trend monitoring |

---

## 4. Segmented Reporting Matrix

To maintain diagnostic clarity, performance data must be reported in distinct segments:

### Segment A: The Homepage (`https://tdeecalculater.com/`)
* **Primary Query Cluster:** "TDEE Calculator", "Total Daily Energy Expenditure Calculator", "Daily Calorie Burn Calculator".
* **Success Indicator:** Increasing impression volume on high-competition head terms and steady position consolidation.

### Segment B: Specialized Calculator Silos
* **URLs:** `/bmr-calculator/`, `/maintenance-calorie-calculator/`, `/calorie-deficit-calculator/`, `/calorie-surplus-calculator/`, `/macro-calculator/`, `/calories-burned-calculator/`.
* **Primary Query Cluster:** "BMR Calculator", "Maintenance Calorie Calculator", "Calorie Deficit Calculator for Fat Loss", "Macro Calculator for Bulking".
* **Success Indicator:** Capturing high-intent searchers seeking immediate specific mathematical results.

### Segment C: Informational Guides & E-E-A-T
* **URLs:** `/blog/what-is-tdee/`, `/blog/how-to-calculate-tdee/`, `/blog/tdee-vs-bmr/`, `/blog/tdee-for-weight-loss/`, `/blog/mifflin-st-jeor-equation/`, `/how-we-calculate/`.
* **Primary Query Cluster:** Informational queries ("what does TDEE mean", "how to calculate TDEE manually", "why am I not losing weight on deficit").
* **Success Indicator:** High user time-on-page, citation in generative search engines (Gemini AI Overviews, Perplexity), and assisted conversions back to the homepage calculator.

---

## 5. Review Cadence & Iteration Decision Rules

### Weekly Pulse Check (Every Monday)
1. Check GSC Coverage / Indexing for newly reported 404s, redirect errors, or mobile usability issues.
2. Review top 20 queries with highest impressions but low CTR (<2.0% in positions 1–10). Flag for meta title/description refinement.

### Monthly Evaluation (Every 30 Days)
1. Run the 10 fixed AI search benchmark prompts documented in `AI_SEARCH_PROMPTS_AND_BENCHMARKS.md` across Google Gemini, Perplexity, and ChatGPT.
2. Compare 28-day vs previous 28-day organic clicks and impressions in GSC.
3. Identify top 5 emerging queries in GSC with impressions >100 and position between 11–30. Evaluate whether existing content adequately answers their intent or needs dedicated sections.

### Decision Rules for Content & Tool Iterations
* **Rule 1 (The Title Adjustment Rule):** If a page maintains average position between 4–10 for 30 consecutive days with CTR below 2.5%, test an updated title emphasizing clear user benefits or concrete outputs.
* **Rule 2 (The Search Intent Rule):** If a supporting guide ranks for queries demanding immediate calculations (e.g. users searching "macro calculator" landing on an article), ensure the interactive calculator widget is prominently mounted above the fold.
* **Rule 3 (The Domain Typo Evaluation Rule):** Record branded search volume ("tdeecalculater", "tdee calculater") vs non-branded volume monthly. Do NOT initiate a domain migration unless verified GSC data indicates branded confusion or severe CTR penalties that outweigh the risk of link equity loss.
