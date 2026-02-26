import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter, Facebook, ArrowRight } from "lucide-react";

// Article data
const articles = {
  "ai-automation-data-entry-reduction": {
    title: "How AI-Powered Automation Reduced Manual Data Entry by 85% for UAE Enterprises",
    excerpt: "A deep dive into how machine learning algorithms and intelligent document processing are eliminating repetitive tasks across finance, HR, and operations departments in the Middle East.",
    category: "AI & Automation",
    readTime: "7 min read",
    date: "Dec 15, 2024",
    author: "Mohammed Al Rashid",
    authorRole: "AI Solutions Architect",
    authorBio: "Mohammed Al Rashid has spent over a decade architecting AI and automation solutions for enterprise clients across the UAE and GCC. He has led 30+ intelligent document processing deployments and is a regular speaker at GITEX Technology Week.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    content: `
## The Hidden Cost of Manual Data Entry

Walk into any finance department in Dubai and you'll find the same scene: rows of accountants hunched over keyboards, manually keying invoice numbers into ERP systems, re-typing the same customer details they've entered a hundred times before. It feels normal because it *is* normal — but that doesn't mean it's acceptable.

Our analysis of 50+ enterprise clients across the UAE revealed a startling figure: the average business spends **23% of total operational hours** on manual data processing. For a 100-person company paying an average UAE salary, that translates to roughly **AED 2.3 million annually** in hidden productivity costs — money spent on work that adds zero strategic value.

> "The biggest competitive advantage of the next decade won't be technology itself — it will be how quickly organisations eliminate the gap between data capture and decision-making."

The good news? That gap is now closable in weeks, not years.

## The AI-Powered Solution

Modern AI automation isn't a single product — it's a layered stack of three complementary technologies, each solving a distinct bottleneck in the data flow.

### 1. Intelligent Document Processing (IDP)

Traditional OCR reads text. IDP *understands* it.

By combining optical character recognition with natural language processing, IDP extracts structured data from unstructured documents — invoices, purchase orders, delivery notes, customs declarations — regardless of layout or template. It knows that "Invoice Date," "Bill Date," and "تاريخ الفاتورة" all mean the same thing.

**Real-world impact:** A Dubai-based trading company with 800 invoices per month reduced processing time from 12 minutes to 45 seconds per document — a **94% reduction**. Their finance team of six was reassigned to analysis and vendor negotiation within 60 days.

### 2. Machine Learning Classification

Every business has documents flowing in from dozens of sources: email attachments, portal downloads, scanned paper, WhatsApp photos. ML classification automatically routes each document to the right workflow without human triage.

What makes modern ML classifiers different from rule-based systems is their ability to improve continuously. The model learns from every correction, achieving:

| Milestone | Accuracy |
|-----------|----------|
| Day 1 (out of the box) | 91% |
| After 30 days | 96.4% |
| After 90 days | 99.2% |

Zero configuration required for new document types — the model generalises from what it already knows.

### 3. Robotic Process Automation (RPA)

IDP extracts the data. ML routes it. RPA does the actual work of entering it into your systems — ERP, CRM, accounting software, government portals — at machine speed, with zero fatigue errors.

RPA is especially critical for businesses running older ERP versions or government-connected systems where modern APIs don't exist. The bot operates the same interface a human would, just 24 hours a day at the cost of a single software licence.

## Implementation Roadmap

The fastest path to automation is never a full-scale deployment on day one. It's a deliberate sequence that builds confidence and delivers quick wins.

**Phase 1: Process Discovery (Week 1–2)**
Map current workflows, identify the highest-volume repetitive processes, and calculate the baseline cost of each. Prioritise by ROI potential — typically invoice processing and customer onboarding surface first.

**Phase 2: Pilot Implementation (Week 3–4)**
Deploy IDP for one document type. Train the ML model on 3–6 months of historical data. Configure RPA bots for the target system. This phase alone typically delivers 60–70% of the total ROI.

**Phase 3: Scale & Optimise (Week 5–8)**
Expand to additional document types, integrate with existing approval workflows, and establish exception-handling queues for the edge cases the model flags for human review.

## Results You Can Expect

Based on our UAE implementations across finance, HR, and supply chain:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Processing time per document | 8–15 min | 30–90 sec | 85–95% |
| Error rate | 3–5% | <0.5% | 90%+ |
| Employee satisfaction | 62% | 89% | +43% |
| Cost per transaction | AED 12 | AED 1.80 | 85% |

The employee satisfaction number is worth dwelling on. When staff are freed from tedious data entry, they report higher engagement and lower turnover intention. In the UAE's competitive talent market, that's a retention benefit with real financial value.

## Getting Started

The right starting point is always the process that hurts most right now. For most businesses that's invoice processing, employee onboarding documents, or customs and trade documentation.

Our 14-day implementation programme includes process assessment, custom AI model training, integration with your existing systems, team training, and 90 days of post-implementation support.

Ready to eliminate manual data entry? [Book a free consultation](/book-consultation) to discuss your specific use case.
    `,
    relatedArticles: ["vat-phase-2-compliance-guide", "erp-implementation-failures"],
  },

  "vat-phase-2-compliance-guide": {
    title: "The Complete Guide to VAT Phase 2 Compliance in Saudi Arabia",
    excerpt: "With the Saudi ZATCA e-invoicing mandate now in full effect, businesses must adapt their ERP systems. Here's everything you need to know about achieving full compliance.",
    category: "Compliance",
    readTime: "12 min read",
    date: "Dec 10, 2024",
    author: "Fatima Hassan",
    authorRole: "Compliance Director",
    authorBio: "Fatima Hassan leads the compliance practice at SGC TECH AI, advising multinational corporations on tax technology and regulatory reporting across the GCC. She has guided over 80 businesses through ZATCA Phase 1 and Phase 2 certification and holds an ACCA qualification with a specialisation in indirect tax.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    content: `
## The Mandate You Cannot Ignore

On January 1, 2023, the Saudi Zakat, Tax and Customs Authority (ZATCA) began a phased rollout of the most demanding e-invoicing requirement in the Middle East. Phase 2 — the Integration Phase — doesn't just require you to generate compliant invoices. It requires your ERP system to be directly connected to ZATCA's Fatoora platform in real time, with every invoice cryptographically signed and validated before it reaches your customer.

> "ZATCA Phase 2 is not a reporting obligation. It is a system integration requirement. Businesses that treat it as a filing exercise will face rejections, penalties, and operational disruption."

With fines reaching **SAR 100,000 per invoice** for continued violations, the stakes are unambiguous. Here is everything you need to know.

## Understanding the Phase 2 Scope

Phase 2 applies to all businesses subject to VAT in Saudi Arabia that were selected by ZATCA for integration. ZATCA is rolling this out in waves, notifying businesses 6 months before their compliance date.

The mandate covers four invoice types:
- Standard tax invoices (B2B transactions)
- Simplified tax invoices (B2C transactions, retail)
- Credit notes linked to original invoices
- Debit notes linked to original invoices

## Key Technical Requirements

### Real-Time Clearance for B2B Invoices

Every B2B invoice must be submitted to ZATCA's API, validated, and "cleared" before it is legally valid to share with your buyer. The sequence is:

1. Generate invoice in your ERP
2. Sign with your cryptographic certificate
3. Submit to ZATCA Fatoora API
4. Receive clearance stamp (UUID + QR code)
5. Deliver cleared invoice to customer

ZATCA targets a response time under 1 second for most validations, but your system must handle retry logic for API timeouts.

### Reporting-Only for B2C Invoices

Simplified B2C invoices do not require pre-clearance. Instead, they must be reported to ZATCA within **24 hours** of issuance. This creates a different workflow: generate, issue to customer, then batch-report via API.

### Mandatory Technical Standards

Your ERP integration must support:

| Requirement | Standard |
|-------------|----------|
| Invoice format | UBL 2.1 XML |
| QR code | TLV-encoded, Base64 |
| Digital signature | ECDSA with secp256k1 |
| Certificate authority | ZATCA-approved CA only |
| API protocol | REST over HTTPS |

## Implementation Steps

### Step 1: System Assessment (Week 1–2)

Before any development begins, assess your current ERP:
- Does it export UBL 2.1 XML natively?
- Can it call external REST APIs synchronously during invoice creation?
- Does it support certificate storage and digital signature workflows?
- Can it handle real-time API failures gracefully (fallback, queue, retry)?

Most SAP, Oracle, and older Odoo installations require middleware or custom connectors. Cloud-native Odoo 16+ has built-in ZATCA support.

### Step 2: Obtain Your CCSID

Register on ZATCA's Fatoora portal to receive your Cryptographic Stamp Identifier (CCSID). This process involves:
- Submitting your VAT registration number
- Completing a device registration for each integration point
- Generating a Certificate Signing Request (CSR)
- Receiving your compliance certificate

Allow **10–14 business days** for ZATCA's certificate authority to process your application.

### Step 3: Integration Development

Your development team — or implementation partner — must build:
- XML invoice generation in UBL 2.1 format with all 70+ mandatory fields
- QR code generation using ZATCA's TLV encoding specification
- ECDSA digital signature implementation
- API integration with Fatoora (clearance + reporting endpoints)
- Error handling for rejection scenarios

### Step 4: Compliance Testing

ZATCA provides a sandbox (Simulation Environment) that mirrors production. You must achieve:
- Successful clearance for at least 10 standard invoices
- Successful reporting for at least 10 simplified invoices
- Correct handling of at least 3 rejection scenarios
- QR code scannable by ZATCA's official app

### Step 5: Go-Live and Monitoring

Post go-live, monitor:
- Clearance success rate (target >99.5%)
- Average clearance response time
- Rejection reasons — ZATCA provides specific error codes
- Certificate expiration dates (renew before expiry or invoicing stops)

## Common Compliance Pitfalls

**Incorrect rounding:** ZATCA validates VAT to 2 decimal places using specific rounding rules. Discrepancies of even 0.01 SAR cause rejections.

**Missing mandatory fields:** UBL 2.1 has 70+ required fields. A missing buyer TRN or incorrect supply type code will reject every invoice.

**Certificate management failures:** When your CCSID expires, Fatoora rejects all submissions instantly. Build automated renewal alerts at 30, 14, and 7 days before expiry.

**Treating clearance as asynchronous:** B2B invoice clearance is synchronous — you cannot give the customer an invoice until it is cleared. Your ERP workflow must block invoice delivery until the clearance UUID is received.

## Penalties for Non-Compliance

ZATCA's penalty framework is progressive and serious:

| Violation | Penalty |
|-----------|---------|
| First offence | Formal warning |
| Second offence | SAR 5,000–50,000 fine |
| Continued violations | Up to SAR 100,000 per invoice |
| Persistent non-compliance | Business activity suspension |

## How SGC TECH AI Can Help

Our ZATCA compliance module for Odoo includes pre-certified UBL 2.1 generation, Fatoora API integration, QR code generation, automatic certificate management, a compliance dashboard with real-time rejection alerts, and ongoing support for regulation updates.

[Contact our compliance team](/book-consultation) to ensure your business meets all ZATCA Phase 2 requirements before your wave deadline.
    `,
    relatedArticles: ["ai-automation-data-entry-reduction", "erp-implementation-failures"],
  },

  "erp-implementation-failures": {
    title: "Why Traditional ERP Implementations Fail: Lessons from 50+ Projects",
    excerpt: "After analyzing implementation data from over 50 enterprise projects, we identified the top 5 reasons ERP deployments exceed budget and timeline—and how to avoid them.",
    category: "Implementation",
    readTime: "9 min read",
    date: "Dec 5, 2024",
    author: "Raj Patel",
    authorRole: "Head of Implementation",
    authorBio: "Raj Patel has led ERP implementations across manufacturing, retail, and real estate sectors in the UAE, India, and the UK. With 15 years of hands-on project management experience and certifications in both Odoo and SAP, he specialises in rescuing troubled implementations and designing failure-proof deployment frameworks.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    content: `
## The Statistic Nobody Likes to Say Out Loud

Seventy percent of ERP projects fail to meet their original objectives. Not "partially miss targets" — fail. Cost overruns average 189% of the original budget. Timelines stretch to 230% of what was planned. And 35% of organisations report *decreased* productivity in the 12 months after go-live.

These aren't industry scare tactics. They're the findings of Panorama Consulting, Gartner, and our own data from 50+ GCC implementations. If you've lived through a failed ERP rollout, none of this surprises you. If you haven't — you need to understand why this happens before you start.

> "Every failed ERP project had warning signs that were visible from the first week. The problem is that nobody wanted to be the one to raise them."

## The Top 5 Reasons ERP Projects Fail

After working through 50+ implementations — including inheriting several mid-collapse — the failure patterns repeat with depressing consistency.

### 1. Insufficient Requirements Gathering

**The pattern:** The executive team decides they need an ERP. A vendor is selected based on a demo and a spreadsheet comparison. Implementation begins. Three months later, someone asks: "Wait — can it handle our intercompany billing?"

**Real example:** A Dubai manufacturer selected an ERP based on a competitor's recommendation. Six months into implementation, the team discovered it couldn't handle their multi-currency pricing model with volume discount tiers — a core business requirement that affected every single sale. The project was effectively restarted.

**The fix:** Spend 4–6 weeks on discovery before vendor selection. Document every workflow, not just the obvious ones. Include frontline staff — the warehouse team who built an Excel sheet to track what the ERP couldn't, the sales coordinator whose workarounds became undocumented business logic. Create a prioritised requirements list distinguishing must-have from nice-to-have. Then evaluate vendors against *your* requirements, not their feature list.

### 2. Underestimating Data Migration Complexity

**The pattern:** "We just need to move the data across." This sentence has sunk more ERP projects than any technical failure.

**The reality:** A typical mid-size business has data spread across an ERP, a CRM, multiple spreadsheets, legacy systems that predate the current ERP, and human memory. That data contains duplicate records, inconsistent formats, missing required fields, and 15 years of accumulated exceptions.

**Real example:** A retail chain's planned 2-month data migration took 8 months. Their customer records contained 47 different address formats and 12,000 duplicate entries. Each had to be resolved before the new system could go live.

**The fix:** Audit your data in week one, not month six. Build migration scripts that can run repeatedly (you will run them dozens of times). Allocate 30% more time than your estimate for data quality remediation. And critically — agree with the business on what "clean enough" means before migration begins, or the goalposts will move indefinitely.

### 3. Inadequate Change Management

**The pattern:** The IT team implements the system. On go-live day, the users see it for the first time.

**The real project:** Technology is perhaps 40% of an ERP implementation. The rest is people — getting them to understand why the change is happening, what it means for their day, and how to use the new system effectively. Skip this and the system goes live but is never truly adopted. Shadow spreadsheets multiply. Workarounds appear. The ROI evaporates.

**The fix:** Appoint change champions in every department before the project starts. Communicate early, often, and honestly — including about disruptions. Involve users in testing. Deliver role-specific training, not generic product overviews. Celebrate the first successful month-end close in the new system publicly.

### 4. Scope Creep Without Governance

**The pattern:** "While we're at it, can we also add...?" Eight words responsible for billions in project overruns globally.

Every additional requirement after sign-off adds development time, testing complexity, integration risk, and future maintenance burden. In a fixed-price project, it breaks the budget. In a time-and-materials engagement, it has no natural ceiling.

**The fix:** Establish a change control process on day one. Every change request must have a written business case, impact assessment, and explicit budget/timeline adjustment before approval. The change control board — not the most senior person in the room — approves or defers. Phase 2 enhancements exist for a reason.

### 5. Choosing the Wrong Implementation Partner

**The pattern:** The partner wins the deal with their most experienced consultants in the room. After contract signing, those consultants move to the next pursuit. Your project is handed to recent graduates with two months of product training.

**Red flags to screen for:**
- Promising timelines that seem unusually fast (but have no methodology to back them up)
- No industry-specific reference clients
- Vague or generic project methodology
- Reluctance to introduce the actual delivery team before contract signing
- No clear knowledge-transfer plan at project close

**The fix:** Ask to meet the specific individuals who will work on your project before you sign anything. Check references from clients with similar size and industry, not the partner's headline case study. Verify that the methodology is documented, not improvised. And require knowledge transfer to be a contractual deliverable.

## The SGC TECH AI Difference

Our 14-day implementation framework was built specifically to eliminate these failure modes:

- **Pre-built industry templates** replace months of configuration from scratch
- **AI-powered data migration** identifies and resolves quality issues automatically
- **Embedded training** runs in parallel with implementation, not after go-live
- **Agile sprint structure** keeps scope controlled and stakeholders informed weekly
- **Guaranteed results** — if we miss the timeline, you don't pay for overages. If ROI isn't achieved in 6 months, we continue supporting at no cost.

Ready to see what a successful implementation looks like? [Schedule your consultation](/book-consultation) today.
    `,
    relatedArticles: ["ai-automation-data-entry-reduction", "vat-phase-2-compliance-guide"],
  },

  "real-estate-crm-integration": {
    title: "Real Estate CRM Integration: Connecting Yardi, PropertyFinder, and Bayut",
    excerpt: "A technical walkthrough of building seamless integrations between property management systems and major UAE real estate portals for automated listing syndication.",
    category: "Integration",
    readTime: "8 min read",
    date: "Nov 28, 2024",
    author: "Sarah Thompson",
    authorRole: "Integration Specialist",
    authorBio: "Sarah Thompson is a property technology specialist with 12 years of experience connecting real estate management platforms to listing portals, CRMs, and financial systems across the UAE and UK markets. She has designed integration architectures for some of Dubai's largest brokerage firms and property developers.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    content: `
## The Listing Management Problem Nobody Talks About

A property coordinator at a mid-size Dubai agency typically manages listings across five portals simultaneously: PropertyFinder, Bayut, Dubizzle, the company website, and at least one international platform. Creating a single new listing takes between 15 and 45 minutes per portal. Updating a price takes five separate logins. Marking a property as sold — if it gets done at all before the phone calls start — takes the better part of an afternoon.

Multiply that across a portfolio of 200 active listings, and you have a team spending most of its week on data entry rather than deals.

> "The agents who close the most transactions in today's market aren't the best negotiators — they're the ones whose listings are always accurate, always live, and always responding first to enquiries."

Portal integration eliminates the friction between winning a listing and having it generate qualified leads.

## The Integration Architecture

A well-designed integration layer sits between your CRM or property management system and all your listing portals through a single synchronisation hub. The flow looks like this:

\`\`\`
┌─────────────────────┐
│   Yardi / Odoo CRM  │
│   (Single Source)   │
└──────────┬──────────┘
           │
      ┌────▼────┐
      │  API Hub │  ← Business logic, mapping, error handling
      └────┬────┘
           │
  ┌────────┼────────┬────────┐
  ▼        ▼        ▼        ▼
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│Bayut │ │PF    │ │Dubiz │ │Website│
└──────┘ └──────┘ └──────┘ └──────┘
\`\`\`

Every change made in your CRM — price update, status change, new photos, availability — propagates to all portals automatically within minutes.

## Key Integration Features

### Bidirectional Synchronisation

The integration isn't one-way. Enquiries, viewing requests, and lead data flow *back* from each portal into your CRM, automatically tagged with source, listing reference, and agent assignment. A PropertyFinder lead and a Bayut lead on the same property arrive in the same place, ready for follow-up.

### Intelligent Media Management

Each portal has different image requirements — minimum dimensions, maximum file sizes, specific aspect ratios. The integration layer handles automatic resizing, format conversion, and watermark application per portal specification. Upload once, publish everywhere.

### Real-Time Availability Updates

When a property goes under offer or is taken off market, a single status change in your CRM propagates to all portals within 60 seconds. This eliminates phantom listings — one of the most common sources of buyer frustration and wasted agent time in the UAE market.

## Technical Implementation

### PropertyFinder REST API

PropertyFinder offers a REST API for programmatic listing management:

\`\`\`javascript
const publishListing = async (listing) => {
  const pfPayload = transformToPFFormat(listing);

  const response = await fetch(
    'https://api.propertyfinder.ae/v2/listings',
    {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pfPayload)
    }
  );

  return response.json();
};
\`\`\`

The transformation layer handles the mapping between your CRM's internal property schema and PropertyFinder's required field structure, including currency formatting, area unit conversion (sqft vs sqm), and bedroom/bathroom enumeration.

### Bayut XML Feed

Bayut operates on a scheduled XML feed model rather than real-time API calls:

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<properties>
  <property>
    <reference>PROP-2024-001</reference>
    <title>Luxury 3BR Villa in Palm Jumeirah</title>
    <price currency="AED">15000000</price>
    <bedrooms>3</bedrooms>
    <bathrooms>4</bathrooms>
    <area unit="sqft">4200</area>
    <status>available</status>
    <images>
      <image>https://cdn.example.com/prop-001-main.jpg</image>
    </images>
  </property>
</properties>
\`\`\`

Feeds are regenerated and submitted every 30 minutes, ensuring listings are never more than half an hour out of date.

### Enquiry Webhook Handling

\`\`\`javascript
app.post('/webhooks/enquiry', async (req, res) => {
  const { source, listing_ref, customer } = req.body;

  const listing = await CRM.findByReference(listing_ref);
  const lead = await CRM.createLead({
    source,
    listing_id: listing.id,
    customer_name: customer.name,
    customer_phone: customer.phone,
    customer_email: customer.email,
    assigned_agent: listing.agent_id,
  });

  await notifyAgent(listing.agent_id, lead);
  res.json({ success: true });
});
\`\`\`

## Measurable Impact

The business case for integration is straightforward:

| Metric | Before Integration | After Integration |
|--------|--------------------|-------------------|
| Time to publish new listing | 45 minutes | 5 minutes |
| Listings managed per coordinator | 40–60 | 200+ |
| Enquiry response time | 4–6 hours | 15 minutes |
| Listing accuracy rate | 78% | 99.5% |
| Phantom listings (sold but still live) | 8–12% of portfolio | <0.5% |

The response time improvement alone typically increases lead conversion by 20–30%, since buyers in the UAE market make fast decisions and agents who respond first win disproportionately.

## Supported Platforms

Our pre-built integration modules connect to Yardi Voyager, PropertyMatrix, Salesforce, and custom CRMs via API. Portal connectors are available for PropertyFinder, Bayut, Dubizzle, and major company website CMS platforms.

[Contact us](/book-consultation) for a demo of our real estate integration platform.
    `,
    relatedArticles: ["ai-automation-data-entry-reduction", "measuring-digital-transformation-roi"],
  },

  "measuring-digital-transformation-roi": {
    title: "Measuring Digital Transformation ROI: Beyond the Spreadsheet",
    excerpt: "Traditional ROI calculations miss 60% of digital transformation value. Learn the comprehensive framework for measuring operational efficiency, employee productivity, and customer satisfaction gains.",
    category: "Strategy",
    readTime: "6 min read",
    date: "Nov 20, 2024",
    author: "Ahmed Al Mansoori",
    authorRole: "Strategy Director",
    authorBio: "Ahmed Al Mansoori advises GCC businesses on digital transformation strategy, having led initiatives across real estate, trading, and financial services sectors. He holds an MBA from INSEAD and has been recognised by Forbes Middle East as one of the region's top technology strategists.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    content: `
## Why Your ROI Calculation Is Probably Wrong

Most organisations calculate digital transformation ROI with the same formula they'd apply to a new photocopier:

\`\`\`
ROI = (Cost Savings − Investment) ÷ Investment × 100
\`\`\`

This captures direct labour savings and maybe a reduction in paper costs. But for a transformation that changes how your entire organisation operates, it misses the majority of the value — typically **60% or more** according to McKinsey's Global Institute research.

The result is predictable: finance teams see a negative ROI in year one and cut digital programmes that would have delivered strong returns by year three. Competitors who measure more broadly pull ahead. The business that optimised its spreadsheet falls behind the business that transformed its model.

> "Organisations that measure transformation value comprehensively are 2.5x more likely to continue investing through year two — and 4x more likely to achieve their original objectives by year three."

## The Four Pillars of Transformation Value

### Pillar 1: Operational Efficiency

This is what traditional ROI captures. It's real, it's immediate, and it's the easiest to justify:

- Reduced manual processing time
- Lower error rates and rework costs
- Faster cycle times and throughput
- Decreased overtime and contractor spend

**Example calculation:** 10 employees saving 2 hours per day × AED 50/hour × 250 working days = **AED 250,000 per year.** Visible, measurable, defensible.

### Pillar 2: Revenue Enablement

Digital transformation often unlocks revenue that was structurally impossible before. This is where the real leverage lives — and where traditional ROI calculations go completely blind.

- Faster quoting and proposal generation leads to higher win rates
- Real-time inventory visibility enables cross-sell and upsell
- Customer portal access increases retention and repeat purchase
- Data quality improvements enable market expansion

**Real example:** A construction company's new project bidding module reduced quote preparation from 5 days to 4 hours. Win rates increased from 15% to 23%. Additional annual contract value: **AED 4.2 million.** That revenue never appeared in the original ROI model.

### Pillar 3: Risk Reduction

Avoided costs are real cash flows, even if they never appear on a P&L. Digital transformation reduces exposure in ways that are quantifiable if you do the work:

- Compliance violations avoided (ZATCA fines, FTA penalties)
- Audit findings reduced (lower audit costs, fewer adjustments)
- Fraud detection improvements
- System reliability gains (reduced downtime costs)

**Example:** Automated ZATCA compliance monitoring prevented an estimated **AED 1.2 million** in potential Phase 2 penalties for a mid-size trading company in Riyadh. The ERP investment paid for itself entirely through risk reduction before a single efficiency saving was counted.

### Pillar 4: Strategic Optionality

This pillar is the hardest to quantify, but strategically the most important. A modern, well-integrated digital infrastructure changes what your business can *do* in the future:

- **Scalability:** Add 50 new employees without adding 50 new data entry clerks
- **Agility:** Launch a new product line in weeks instead of months
- **Decision quality:** Make strategy calls with real-time data instead of last month's report
- **Talent attraction:** Top professionals choose modern environments over legacy systems

## The Comprehensive ROI Framework

### Step 1: Establish a Baseline

Before implementation begins, document the current state in measurable terms: process cycle times, error rates, employee hours by task category, system uptime, compliance incident frequency. Without a baseline, post-implementation measurement is just storytelling.

### Step 2: Define KPIs for Each Pillar

| Pillar | Representative KPIs |
|--------|---------------------|
| Operational | Processing time, error rate, headcount per transaction |
| Revenue | Win rate, time-to-quote, average deal size, cross-sell rate |
| Risk | Compliance incidents, audit findings, system downtime hours |
| Strategic | Employee NPS, time-to-hire, new product launch velocity |

Two to three KPIs per pillar is sufficient. More creates measurement overhead without improving insight.

### Step 3: Set Attribution Rules in Advance

Not every improvement after go-live is caused by the digital transformation. Market conditions change. Staff turns over. You need attribution rules agreed before the project starts — otherwise post-implementation reviews become political rather than analytical.

Common approaches: control groups (same function in a non-digitised region), before/after comparison adjusted for external factors, and stakeholder attribution surveys.

### Step 4: Build a Time-Horizon Model

Different benefits materialise at different points:

- **0–3 months:** Operational efficiency gains (immediate, visible)
- **3–12 months:** Risk reduction benefits (as incidents don't occur)
- **12–24 months:** Revenue enablement gains (as capabilities translate to wins)
- **24+ months:** Strategic optionality value (as new initiatives become possible)

A 12-month ROI measurement will always understate transformation value. Model at least 3 years.

## A Complete Real-World Example

**Client:** Mid-size trading company, 150 employees, Dubai
**Investment:** AED 850,000 (Odoo ERP + AI automation)

**Year 1 Value — Comprehensive Model:**

| Value Category | Amount | Measurement Method |
|----------------|--------|---------------------|
| Labour efficiency gains | AED 420,000 | Time tracking before/after |
| Error reduction (rework eliminated) | AED 180,000 | Rework log comparison |
| Faster collections (DSO improvement) | AED 95,000 | Finance data |
| Compliance penalties avoided | AED 150,000 | Gap analysis × penalty schedule |
| Revenue from faster quoting | AED 340,000 | Attribution survey + deal data |
| **Total Year 1 Value** | **AED 1,185,000** | |

**Traditional ROI:** (AED 420,000 − AED 850,000) ÷ AED 850,000 = **−51%** ← Looks like failure.

**Comprehensive ROI:** (AED 1,185,000 − AED 850,000) ÷ AED 850,000 = **+39%** ← Clearly positive.

The project is identical. The measurement framework is different. One gets cut in year two; the other gets scaled.

## Start Measuring Today

The businesses winning at digital transformation aren't those with the biggest budgets — they're the ones who can demonstrate and defend the value they're creating.

[Schedule a consultation](/book-consultation) for a customised ROI framework built around your specific investment and business context.
    `,
    relatedArticles: ["erp-implementation-failures", "legacy-to-cloud-manufacturing"],
  },

  "legacy-to-cloud-manufacturing": {
    title: "From Legacy Systems to Cloud: A Manufacturing Company's 18-Month Journey",
    excerpt: "Case study of how a 200-employee manufacturing firm in Jebel Ali Free Zone migrated from on-premise SAP to cloud-native Odoo while maintaining zero production downtime.",
    category: "Case Study",
    readTime: "11 min read",
    date: "Nov 12, 2024",
    author: "Chen Wei",
    authorRole: "Manufacturing Solutions Lead",
    authorBio: "Chen Wei leads SGC TECH AI's manufacturing and industrial practice, having delivered ERP and MES implementations for precision engineering, food production, and logistics companies across the UAE, Singapore, and mainland China. He holds a degree in Industrial Engineering and a Lean Six Sigma Black Belt certification.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80",
    content: `
## The Company That Couldn't Afford to Stand Still

In the precision metal fabrication industry, a single hour of unplanned production downtime can cost AED 80,000 or more in delayed deliveries, expedited materials, and customer penalties. When a 200-employee manufacturer in Jebel Ali Free Zone came to us with 12-year-old SAP Business One running on ageing on-premise servers, the business case for migration was clear — but the operational risk was equally obvious.

The company generated AED 85 million in annual revenue, employed 120 production staff, and had over 800,000 transactions in their existing system. Their customers included aerospace suppliers, oil and gas contractors, and medical equipment manufacturers — all with zero tolerance for delivery delays.

> "Our IT manager told us we had two choices: migrate to a modern system, or spend the next three years patching a platform that SAP was no longer supporting. There was really only one choice."

## Why the Legacy System Had to Go

The company's challenges were structural, not operational. Their SAP version had reached end of extended support, meaning:

- **No more security patches** — a critical risk given increasing UAE cybersecurity regulations
- **No mobile access** — shop floor supervisors were still printing work orders and walking them to machines
- **No API connectivity** — IoT sensors on their CNC machines had no way to feed data into the ERP
- **Infrastructure costs:** AED 180,000 per year for server maintenance, backups, and on-site IT support

After evaluating five alternatives, the company selected cloud-native Odoo 16 for its modern REST API architecture, native mobile apps, strong manufacturing module set, and significantly lower total cost of ownership.

## Phase 1: Discovery and Planning (Months 1–3)

### Uncovering the Shadow Systems

The first surprise of every implementation is the unofficial infrastructure that has grown up around the official one. Here, we found:

- **17 active Excel spreadsheets** tracking rework, scrap, and quality holds that the ERP couldn't capture
- **Three WhatsApp groups** used for urgent material requests between production supervisors and purchasing
- **Paper-based quality checklists** that were photographed, WhatsApp'd to the quality manager, and filed in physical binders

Each of these represented a real business requirement that the new system had to address. Shadow systems don't appear because employees are lazy — they appear because the official system failed to meet a need. Document them, understand them, and build them properly into the new platform.

### Data Audit Findings

The SAP database contained 847,000 transactions, 12,400 products, 2,100 customers, and 1,800 vendors accumulated over 12 years. The audit revealed:

- 23% duplicate customer records (created during system upgrades and acquisitions)
- 340 products with inconsistent units of measure (some in kg, some in grams, some in "pieces" that were actually kg)
- 12 different date formats in imported supplier data
- 1,200 inactive products still appearing in BOM searches

Data cleansing was scoped as a parallel workstream — four weeks of dedicated effort by a data analyst before migration scripts were written.

### The Parallel Operation Decision

Rather than a "big bang" cutover, we designed a phased migration where both systems ran simultaneously for the first three months of go-live. SAP remained as a read-only archive; Odoo handled all new transactions.

The cost of running two systems simultaneously — approximately AED 45,000 in additional IT resource — was the best insurance policy we could have purchased.

## Phase 2: Development and Customisation (Months 4–8)

Standard Odoo MRP is designed for discrete manufacturing. Precision metal fabrication required four significant enhancements:

**Multi-level work orders:** The standard Odoo work order model is flat. Precision machining involves nested operations with dependencies — roughing before finishing, inspection before surface treatment. We built a dependency engine that generates the correct work order sequence from the BOM automatically.

**Mandatory quality checkpoints:** ISO 9001 compliance required documented quality inspections at specific production stages. We added configurable checkpoint rules to the work order module, with photo upload capability on the mobile app. Supervisors can no longer close a work order stage without completing the inspection record.

**Full lot traceability:** Aerospace customers require material traceability from raw stock to finished component. We extended Odoo's lot tracking to capture the heat number from the raw material certificate through every operation, automatically generating the traceability report customers require with each delivery.

**CNC machine integration:** OEE data from 14 Fanuc and Mazak CNC machines now feeds directly into Odoo's maintenance module via MQTT protocol. Planned vs actual production time is visible in real time on the shop floor dashboard.

## Phase 3: Testing and Training (Months 9–12)

### User Acceptance Testing

150 test cases covering all critical workflows were executed with actual production staff — not just the IT team and project sponsors. Shop floor supervisors tested on Android tablets. Finance ran the month-end close procedure in the UAT environment. The planning team ran a complete 4-week production schedule.

Stress testing at 10x normal transaction volume confirmed the cloud infrastructure could handle peak periods without degradation.

### Role-Specific Training

| Role | Duration | Format | Outcome |
|------|----------|--------|---------|
| Shop Floor Operators | 4 hours | Hands-on with tablets | Work order execution, material scanning |
| Production Supervisors | 8 hours | Classroom + workshop | Scheduling, quality checkpoints, OEE dashboard |
| Planning & Procurement | 16 hours | Intensive workshop | MRP, purchase orders, inventory management |
| Finance | 12 hours | Process-focused | Costing, invoicing, month-end close |
| Management | 4 hours | Dashboard orientation | KPI review, report navigation |

Training was delivered in English and Arabic. All process documentation was bilingual.

## Phase 4: Phased Go-Live (Months 13–18)

**Month 13 — Purchasing and Inventory:** Lowest risk, immediate value. Purchase orders created in Odoo, goods receipts recorded in both systems daily, inventory reconciled weekly. Zero incidents.

**Month 14 — Sales and CRM:** Customer quotations generated from Odoo's product configurator for the first time. The sales team's quote preparation time dropped from 3 days to 4 hours immediately.

**Months 15–16 — Production:** The critical phase. Shop floor tablets deployed, work orders flowing from Odoo, CNC integration live. SAP remained on in read-only mode for supervisor reference. After 6 weeks, the supervisors stopped consulting it.

**Months 17–18 — Finance and Full Cutover:** Financial transactions fully in Odoo. SAP server transitioned to archive mode. Server hardware decommissioned.

## Results After 6 Months

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Order-to-delivery cycle | 18 days | 12 days | −33% |
| Inventory accuracy | 89% | 98.5% | +10.7% |
| Quality rejection rate | 4.2% | 1.8% | −57% |
| IT infrastructure cost | AED 180K/yr | AED 48K/yr | −73% |
| Quote preparation time | 3 days | 4 hours | −94% |
| Employee productivity index | Baseline | +23% | +23% |

The infrastructure saving alone — AED 132,000 annually — pays for the implementation in under three years. The productivity and quality gains compound on top of that.

## Four Lessons for Every Migration

**Parallel operation is worth every dirham.** The insurance cost of running two systems simultaneously is a fraction of the cost of a botched cutover and emergency rollback.

**Data quality is its own project.** Scope it, resource it, and timeline it separately from the implementation. Every hour invested in data cleansing before migration saves ten hours of exception handling after.

**Shop floor buy-in determines manufacturing ERP success.** If the operators don't trust the system, they'll maintain parallel paper records indefinitely. Involve them early, listen to their concerns, and design the tablet interface around their workflow — not the consultant's preference.

**Document the shadow systems.** They represent your real requirements. The official process documentation tells you what *should* happen. The Excel sheets and WhatsApp groups tell you what *actually* happens. Build the new system around reality.

## Ready for Your Migration?

[Book a discovery session](/book-consultation) to discuss your legacy system modernisation project. We'll assess your current state, identify the risks, and design a migration approach that keeps your operations running throughout.
    `,
    relatedArticles: ["erp-implementation-failures", "ai-automation-data-entry-reduction"],
  },
};

const categoryColors: Record<string, string> = {
  "AI & Automation": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Compliance": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Implementation": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Integration": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Strategy": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "Case Study": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

const getAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D1B2A&color=C9A84C&size=96&bold=true&font-size=0.4`;

// Proper markdown renderer
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const isSeparatorRow = (row: string) =>
  /^\|[\s|:-]+\|?\s*$/.test(row.trim());

const renderContent = (content: string): string => {
  const lines = content.split("\n");
  const result: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeLang = "";
  let inTable = false;
  let tableRows: string[] = [];

  const flushTable = () => {
    // Filter out separator rows (e.g. |---|---|)
    const dataRows = tableRows.filter(r => !isSeparatorRow(r));
    if (dataRows.length < 1) { tableRows = []; inTable = false; return; }
    const [headerRow, ...bodyRows] = dataRows;

    const parseCells = (row: string) =>
      row.split("|")
        .map(c => c.trim())
        .filter((_, i, arr) => !(i === 0 && arr[0] === "") && !(i === arr.length - 1 && arr[arr.length - 1] === ""))
        .filter(c => c !== "");

    const headers = parseCells(headerRow)
      .map(c => `<th class="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-gold/90 bg-white/5 whitespace-nowrap">${escapeHtml(c)}</th>`)
      .join("");
    const rows = bodyRows
      .map((r, idx) => {
        const cells = parseCells(r)
          .map(c => `<td class="px-5 py-3 text-sm text-foreground-muted whitespace-nowrap">${escapeHtml(c)}</td>`)
          .join("");
        const stripe = idx % 2 === 0 ? "" : "bg-white/[0.03]";
        return `<tr class="border-t border-white/10 ${stripe} hover:bg-white/5 transition-colors">${cells}</tr>`;
      })
      .join("");
    result.push(
      `<div class="overflow-x-auto my-8 rounded-xl border border-white/10 shadow-lg">` +
      `<table class="w-full text-sm border-collapse">` +
      `<thead class="border-b border-white/15"><tr>${headers}</tr></thead>` +
      `<tbody>${rows}</tbody>` +
      `</table></div>`
    );
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block start/end
    if (line.trimStart().startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = line.replace(/```/, "").trim();
        codeLines = [];
      } else {
        inCodeBlock = false;
        const escaped = codeLines.join("\n").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        result.push(`<pre class="bg-white/5 border border-border/50 rounded-lg p-4 overflow-x-auto my-6 text-sm font-mono"><code class="text-emerald-300">${escaped}</code></pre>`);
        codeLines = [];
      }
      continue;
    }
    if (inCodeBlock) { codeLines.push(line); continue; }

    // Tables
    if (line.includes("|") && line.trim().startsWith("|")) {
      if (!inTable) { inTable = true; tableRows = []; }
      tableRows.push(line);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Blockquote
    if (line.trimStart().startsWith("> ")) {
      const text = applyInline(line.replace(/^>\s*/, ""));
      result.push(`<blockquote class="border-l-4 border-gold/60 bg-gold/5 pl-5 pr-4 py-3 my-6 rounded-r-lg italic text-foreground-muted text-lg leading-relaxed">${text}</blockquote>`);
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      result.push(`<h2 class="text-2xl font-bold text-foreground mt-12 mb-5 pb-2 border-b border-border/40">${applyInline(line.slice(3))}</h2>`);
      continue;
    }
    // H3
    if (line.startsWith("### ")) {
      result.push(`<h3 class="text-lg font-bold text-foreground mt-8 mb-3">${applyInline(line.slice(4))}</h3>`);
      continue;
    }

    // Unordered list item
    if (/^[-*] /.test(line.trimStart())) {
      result.push(`<li class="ml-5 mb-1 text-foreground-muted list-disc">${applyInline(line.replace(/^[-*]\s/, "").trimStart())}</li>`);
      continue;
    }
    // Ordered list item
    if (/^\d+\. /.test(line.trimStart())) {
      result.push(`<li class="ml-5 mb-1 text-foreground-muted list-decimal">${applyInline(line.replace(/^\d+\.\s/, "").trimStart())}</li>`);
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      result.push(`<div class="mt-4"></div>`);
      continue;
    }

    // Paragraph
    result.push(`<p class="text-foreground-muted leading-relaxed mb-4">${applyInline(line)}</p>`);
  }

  if (inTable) flushTable();

  return result.join("\n");
};

const applyInline = (text: string): string => {
  return text
    .replace(/`([^`]+)`/g, `<code class="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-emerald-300">$1</code>`)
    .replace(/\*\*([^*]+)\*\*/g, `<strong class="text-foreground font-semibold">$1</strong>`)
    .replace(/\*([^*]+)\*/g, `<em>$1</em>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" class="text-gold hover:underline font-medium">$1</a>`);
};

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug as keyof typeof articles] : null;

  if (!article) return <Navigate to="/resources" replace />;

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://sgctech.ai/article/${slug}`;
  const shareText = encodeURIComponent(article.title);

  const parseArticleDate = (dateStr: string): string => new Date(dateStr).toISOString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { "@type": "Person", name: article.author, jobTitle: article.authorRole },
    publisher: {
      "@type": "Organization",
      name: "SGC TECH AI",
      logo: { "@type": "ImageObject", url: "https://sgctech.ai/sgc-tech-ai-logo-full-color.png" },
    },
    datePublished: parseArticleDate(article.date),
    dateModified: parseArticleDate(article.date),
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://sgctech.ai/article/${slug}` },
    articleSection: article.category,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://sgctech.ai/" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://sgctech.ai/resources" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://sgctech.ai/article/${slug}` },
    ],
  };

  const relatedData = article.relatedArticles
    .map(s => articles[s as keyof typeof articles] ? { slug: s, ...articles[s as keyof typeof articles] } : null)
    .filter(Boolean) as (typeof article & { slug: string })[];

  return (
    <div className="page-container min-h-screen relative">
      <SEO
        title={article.title}
        description={article.excerpt}
        canonical={`https://sgctech.ai/article/${slug}`}
        ogType="article"
        ogImage={article.image}
        article={{ publishedTime: parseArticleDate(article.date), author: article.author, section: article.category }}
        schema={[articleSchema, breadcrumbSchema]}
      />
      <BackgroundAnimation />
      <Header />

      <main className="pt-32 pb-4xl relative z-10">
        <div className="container max-w-4xl">

          {/* Breadcrumb */}
          <div className="mb-xl animate-fade-in">
            <Link to="/resources" className="inline-flex items-center gap-2 text-foreground-muted hover:text-gold transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-xl animate-fade-in stagger-1">
            <div className="flex items-center gap-md mb-lg flex-wrap">
              <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${categoryColors[article.category] ?? "bg-gold/20 text-gold border-gold/30"}`}>
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-foreground-subtle">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-lg leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-foreground-muted mb-xl leading-relaxed">
              {article.excerpt}
            </p>

            {/* Author + date row */}
            <div className="flex flex-wrap items-center justify-between gap-lg pb-xl border-b border-border/50">
              <div className="flex items-center gap-md">
                <img
                  src={getAvatarUrl(article.author)}
                  alt={article.author}
                  className="w-12 h-12 rounded-full ring-2 ring-gold/30"
                />
                <div>
                  <p className="font-semibold text-foreground">{article.author}</p>
                  <p className="text-sm text-foreground-muted">{article.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <Calendar className="w-4 h-4" />
                {article.date}
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="mb-3xl rounded-2xl overflow-hidden animate-fade-in stagger-2">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <div
            className="animate-fade-in stagger-3"
            dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
          />

          {/* Share Section */}
          <div className="glass rounded-xl p-xl my-3xl animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-lg">
              <div className="flex items-center gap-md">
                <Share2 className="w-5 h-5 text-gold" />
                <span className="font-semibold text-foreground">Share this article</span>
              </div>
              <div className="flex items-center gap-md">
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-gold/20 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-foreground-muted" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-gold/20 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5 text-foreground-muted" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-gold/20 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5 text-foreground-muted" />
                </a>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="glass rounded-2xl p-xl mb-3xl animate-fade-in">
            <div className="flex items-start gap-lg">
              <img
                src={getAvatarUrl(article.author)}
                alt={article.author}
                className="w-16 h-16 rounded-full ring-2 ring-gold/30 flex-shrink-0"
              />
              <div>
                <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">About the Author</p>
                <p className="font-bold text-foreground text-lg">{article.author}</p>
                <p className="text-sm text-gold mb-md">{article.authorRole}, SGC TECH AI</p>
                <p className="text-foreground-muted text-sm leading-relaxed">{article.authorBio}</p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedData.length > 0 && (
            <div className="mb-3xl animate-fade-in">
              <h3 className="text-xl font-bold text-foreground mb-lg">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-lg">
                {relatedData.map(related => (
                  <Link
                    key={related.slug}
                    to={`/article/${related.slug}`}
                    className="glass rounded-xl overflow-hidden group interactive-card flex flex-col"
                  >
                    <div className="h-36 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-lg flex-1 flex flex-col">
                      <span className={`self-start px-2 py-0.5 rounded-full border text-xs font-semibold mb-sm ${categoryColors[related.category] ?? "bg-gold/20 text-gold border-gold/30"}`}>
                        {related.category}
                      </span>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-gold transition-colors line-clamp-2 leading-snug mb-md flex-1">
                        {related.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-foreground-subtle pt-sm border-t border-border/40 mt-auto">
                        <span>{related.readTime}</span>
                        <span className="flex items-center gap-1 text-gold font-medium">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="glass rounded-2xl p-xl md:p-3xl text-center animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-md">Ready to Transform Your Business?</h3>
            <p className="text-foreground-muted mb-xl max-w-lg mx-auto">
              Book a free consultation to discuss how these insights apply to your organisation.
            </p>
            <Button variant="hero" size="lg" className="pulse-glow" asChild>
              <Link to="/book-consultation">Book Free Consultation</Link>
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
