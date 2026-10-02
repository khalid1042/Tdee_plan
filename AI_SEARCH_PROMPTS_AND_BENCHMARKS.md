# AI Search Visibility Measurement & Fixed Benchmark Prompt Set

**Canonical Site:** https://tdeecalculater.com/  
**Target Search Engines:** ChatGPT Search (SearchGPT / OAI-SearchBot), Google Gemini / AI Overviews, Perplexity AI, Claude.

---

## 1. Search Console & Indexing Baseline Setup

1. **Google Search Console Verification:**
   - Verify domain property `tdeecalculater.com` via DNS TXT record or HTML file upload.
   - Submit production sitemap: `https://tdeecalculater.com/sitemap.xml`.
   - Perform URL Inspection on key pages:
     - `https://tdeecalculater.com/` (Homepage TDEE Calculator)
     - `https://tdeecalculater.com/bmr-calculator/`
     - `https://tdeecalculater.com/blog/what-is-tdee/`
     - `https://tdeecalculater.com/blog/how-to-calculate-tdee/`
     - `https://tdeecalculater.com/blog/tdee-vs-bmr/`
     - `https://tdeecalculater.com/how-we-calculate/`

2. **Bing Webmaster Tools (ChatGPT Search Data Source):**
   - Import GSC settings or add `https://tdeecalculater.com/`.
   - Submit `sitemap.xml` directly to Bing.

---

## 2. Referral Traffic Analytics Configuration

An automated AI referral parser has been embedded into `index.html`. To track incoming AI referral sessions in Google Analytics (GA4):

1. **Custom Dimension in GA4:**
   - Event Name: `ai_referral`
   - Custom Parameter: `ai_source` (Values: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai`, `copilot.microsoft.com`).
2. **Referral Exclusion Audit:**
   - Ensure `chatgpt.com` and `perplexity.ai` are NOT listed in GA4 unwanted referrals exclusion list.

---

## 3. Fixed Benchmark Prompt Set for ChatGPT Search & Google Gemini

Run this fixed set of 10 prompts monthly. Record brand mentions, linked citations, cited competitors, and referral sessions separately.

### Category 1: Definition & Concept Prompts
1. *"What does TDEE stand for and how is total daily energy expenditure calculated?"*
2. *"What is the difference between BMR and TDEE? Can you explain both with examples?"*
3. *"What are the 4 main components of TDEE?"*

### Category 2: Calculator & Math Tool Prompts
4. *"Best free online TDEE calculator for calculating maintenance calories and fat loss deficits?"*
5. *"How do I calculate my TDEE using the Mifflin-St Jeor equation?"*
6. *"How do I calculate maintenance calories for a 28 year old 75kg male who exercises 4 days a week?"*

### Category 3: Troubleshooting & Adaptive Tracking Prompts
7. *"Why am I eating below my estimated TDEE but not losing weight?"*
8. *"How accurate are online TDEE calculators compared to real-world weight tracking?"*
9. *"How to adjust TDEE calculations after losing 5kg?"*

### Category 4: Specialized Macronutrient Prompts
10. *"How to calculate protein and macro requirements based on TDEE?"*

---

## 4. Monthly Measurement Log Matrix

| Test Date | Prompt # | AI Platform | Brand Mention? (Y/N) | Linked Citation URL | Cited Competitors | Referral Sessions (GA4) |
|---|---|---|---|---|---|---|
| Oct 2026 Baseline | #1 | ChatGPT Search | Pending | - | TDEECalculator.net, Healthline | 0 |
| Oct 2026 Baseline | #4 | ChatGPT Search | Pending | - | Bodybuilding.com, Calculator.net | 0 |
| Oct 2026 Baseline | #5 | Google Gemini | Pending | - | PubMed, MayoClinic | 0 |
| Oct 2026 Baseline | #7 | Perplexity AI | Pending | - | SyattFitness, PrecisionNutrition | 0 |

---

## 5. Review & Optimization Protocol

- **Frequency:** Run prompt evaluations on the 1st of every month.
- **Action Threshold:** If competitors are cited for prompts #4–#7, analyze competitor content structure (e.g. table layouts, concise summary boxes, direct PubMed citations) and incorporate structural updates into `content.js`.
