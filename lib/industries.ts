// Industry solution data — every use case here is one that current-generation
// voice calling agents (STT + LLM + TTS with Indian telephony, CRM + WhatsApp
// Business API, Hindi/English/Hinglish + regional languages) handle reliably in
// production. Deal-closing, negotiation, diagnosis and liability-bearing advice
// are intentionally excluded — the agent's job ends at a warm human handoff.

export type UseCaseGroup = {
  name: string;
  items: { title: string; desc: string }[];
};

export type Industry = {
  slug: string;
  /** short label for nav, tabs and cards */
  name: string;
  /** long descriptive title for hero + SEO */
  fullName: string;
  icon: string;
  /** one-line positioning under the card */
  tag: string;
  headline: string;
  tagline: string;
  sample: { label: string; agent: string; user: string; agent2: string; outcome: string };
  outcomes: [string, string][];
  groups: UseCaseGroup[];
  /** which cross-industry templates this industry leans on */
  patterns: string[];
  /** where the agent stops and a human takes over */
  escalation: string;
  faqs: { q: string; a: string }[];
  keywords: string[];
};

export const patterns = [
  {
    id: "notify-confirm",
    name: "Notify + confirm",
    desc: "Reminders, status updates, outage and delay alerts — the agent informs and captures a yes/no.",
    examples: "EMI reminders · lab report ready · service outage · delivery ETA",
  },
  {
    id: "qualify-route",
    name: "Qualify + route",
    desc: "A fixed question tree that scores intent and hands warm leads to the right human.",
    examples: "Loan pre-qualification · symptom-to-department triage · churn-signal capture",
  },
  {
    id: "schedule",
    name: "Schedule + reschedule",
    desc: "Offer slots, book into the calendar/HMIS/CRM, confirm, and rebook no-shows.",
    examples: "OPD appointments · site visits · service slots · doorstep pickups",
  },
  {
    id: "bounded-kb",
    name: "Answer from a bounded KB",
    desc: "FAQ lines and status read-outs where the knowledge base is finite and known.",
    examples: "RERA & possession FAQ · plan comparison · claim status readout",
  },
  {
    id: "collect-data",
    name: "Collect structured data",
    desc: "Surveys, feedback and verification where every answer maps to a field.",
    examples: "CSAT / NPS · address verification · promise-to-pay logging",
  },
  {
    id: "fixed-menu",
    name: "Fixed-menu offer",
    desc: "Present a pre-approved offer from a fixed matrix — a bounded offer, never a negotiation.",
    examples: "AMC / warranty interest · room-upgrade menu · retention matrix · prepaid nudge",
  },
] as const;

export const industries: Industry[] = [
  {
    slug: "bfsi-lending",
    name: "BFSI & Lending",
    fullName: "Banking, Financial Services, Insurance, Cards & Lending",
    icon: "🏦",
    tag: "Collections, qualification & servicing — TRAI & RBI-compliant by construction.",
    headline: "Collections that convert, compliance that holds.",
    tagline:
      "Loan qualification, EMI reminders, early-bucket collections, KYC and insurance renewals — structured, scripted flows that run inside TRAI windows with DND scrubbing and PII masking on every single dial.",
    sample: {
      label: "EMI reminder · pre-delinquency",
      agent: "Namaste Rohan ji! Aapki ₹4,500 ki EMI kal due hai — kya main abhi WhatsApp par payment link bhej du?",
      user: "Haan bhejo, aaj shaam kar dunga.",
      agent2: "Perfect, link bhej diya. Kal subah gentle reminder aayega. Thank you, have a great day!",
      outcome: "Promise-to-pay logged · payment link sent · disposition synced to LMS",
    },
    outcomes: [
      ["3.2x", "more payment promises vs SMS-only reminders"],
      ["90%", "connect rate with propensity-based dialing"],
      ["100%", "TRAI-window & DND-compliant dials"],
    ],
    groups: [
      {
        name: "Lending",
        items: [
          { title: "Loan lead pre-qualification", desc: "Capture income range, employment type, city and loan amount on a fixed question tree; route qualified leads to human advisors." },
          { title: "Incomplete-application follow-up", desc: "Call applicants who dropped off mid-form, identify the blocker, and push a resume link on WhatsApp." },
          { title: "Document collection reminders", desc: "\"Your ITR and Form 16 are still pending\" — and book a doorstep pickup slot." },
          { title: "Loan status updates", desc: "Pull status from the LMS and read it out, deflecting a huge share of inbound call volume." },
          { title: "EMI due-date reminders", desc: "Polite pre-delinquency reminders 3–5 days before due date with an instant payment-link push." },
          { title: "Disbursement & welcome calls", desc: "Confirm funds received, explain first EMI date and repayment channels." },
          { title: "Balance-transfer interest check", desc: "Gauge interest, capture current lender and rate, and book a human callback." },
        ],
      },
      {
        name: "Collections — early stage only",
        items: [
          { title: "Early-bucket collections (1–30 DPD)", desc: "Soft reminder, capture the reason for delay, log the promise-to-pay and send a payment link — RBI Fair-Practices compliant by construction." },
          { title: "Promise-to-pay follow-up", desc: "Confirm the promised payment happened, or reschedule it." },
          { title: "Payment confirmation & receipt calls", desc: "Confirm receipt and answer CIBIL-impact FAQs." },
        ],
      },
      {
        name: "Cards, accounts & insurance",
        items: [
          { title: "Card activation & onboarding", desc: "Walk new cardholders through activation, PIN setup and app download." },
          { title: "KYC / re-KYC reminders", desc: "Schedule video-KYC or branch slots before the deadline." },
          { title: "Credit-card due reminders", desc: "With a clear minimum-due vs total-due explanation." },
          { title: "Insurance renewal reminders", desc: "Lapse alerts, payment link and grace-period explanation." },
          { title: "Policy-servicing FAQ", desc: "Coverage basics, network-hospital lookup and claim-document checklists (not adjudication)." },
          { title: "Claim status updates", desc: "Read status from the TPA/insurer API; escalate disputes to humans." },
          { title: "FD / RD maturity alerts", desc: "Inform maturity date and capture renew-vs-payout preference for a human to execute." },
          { title: "Fraud-alert verification callbacks", desc: "\"Did you make this transaction?\" with immediate card-block action on a 'no'." },
          { title: "Dormant-account reactivation", desc: "Inform, gauge intent and book a branch appointment." },
          { title: "CSAT / NPS surveys", desc: "3–5 question structured feedback after any interaction." },
        ],
      },
    ],
    patterns: ["Notify + confirm", "Qualify + route", "Collect structured data", "Fixed-menu offer"],
    escalation:
      "Final deal-closing, negotiation, and complex dispute resolution stay with humans. The agent qualifies, reminds and collects the easy money — then warm-transfers with full context.",
    faqs: [
      {
        q: "Is voice AI collections compliant with RBI and TRAI rules?",
        a: "Yes — by construction. Speaksy only runs early-bucket (1–30 DPD) soft-reminder flows that are scripted, respect TRAI calling windows, scrub DND, mask PII and follow RBI Fair Practices. There is no aggressive or improvised language because the agent never leaves its script.",
      },
      {
        q: "Can the agent take a payment or push a payment link on the call?",
        a: "It doesn't take card details on the call, but it pushes a secure UPI/payment link on WhatsApp mid-conversation and logs the promise-to-pay to your LMS — which is exactly what lifts payment-promise rates over SMS-only reminders.",
      },
      {
        q: "What happens when a customer disputes a charge or gets angry?",
        a: "Disputes and negotiations are out of scope by design. The agent captures the reason, logs the disposition and warm-transfers to a human collections officer with the full context and recording attached.",
      },
      {
        q: "How fast can a lending campaign go live?",
        a: "With a pre-built EMI-reminder or qualification template, the same day. A custom flow wired to your LMS/CRM typically goes live in 3–5 days, and you can test it on your own phone before the first customer dial.",
      },
    ],
    keywords: [
      "voice AI collections India", "EMI reminder bot", "loan qualification voice agent",
      "RBI compliant collections automation", "insurance renewal voice bot", "BFSI voice AI",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    fullName: "Real Estate & Property",
    icon: "🏠",
    tag: "Instant lead response, site-visit booking and cold-lead revival at scale.",
    headline: "Answer every portal lead in seconds — before it dies.",
    tagline:
      "40%+ of property leads die from slow response. Speaksy calls every 99acres, MagicBricks and Housing inquiry within seconds, qualifies budget and configuration, books the site visit and revives six-month-old CRM leads at scale.",
    sample: {
      label: "Portal lead · instant response",
      agent: "Hi Anita! You just enquired about a 2 BHK in Wakad — is a ₹75–90 lakh budget about right, and are you looking to move in this year?",
      user: "Yes, around there. This year ideally.",
      agent2: "Great — I can book you a site visit this Saturday at 11 and WhatsApp you the location pin and brochure. Shall I lock it?",
      outcome: "Lead qualified & scored · site visit booked · brochure sent · routed to closer",
    },
    outcomes: [
      ["<10s", "speed-to-lead on portal inquiries, 24/7"],
      ["30–45%", "fewer site-visit no-shows with reminder calls"],
      ["6-month", "cold CRM leads re-qualified at scale"],
    ],
    groups: [
      {
        name: "Capture & qualify",
        items: [
          { title: "Instant portal-lead response", desc: "Answer 99acres / MagicBricks / Housing inquiries within seconds, 24/7 — the single highest-ROI use case in real estate." },
          { title: "Lead qualification", desc: "Budget, preferred location, configuration (1/2/3 BHK), timeline and loan need; scored and routed to sales." },
          { title: "Old / cold lead revival", desc: "Re-qualify six-month-old CRM leads at scale — humans only get the warm ones back." },
          { title: "Rental inquiry qualification", desc: "Budget, move-in date, family/bachelor and viewing schedule for rental platforms and managers." },
        ],
      },
      {
        name: "Site visits",
        items: [
          { title: "Site-visit booking", desc: "Offer slots, book into the calendar and WhatsApp the location pin plus brochure." },
          { title: "Visit reminder & confirmation", desc: "Day-before and morning-of confirmations — proven to cut no-shows 30–45%." },
          { title: "Cab pickup coordination", desc: "Confirm pickup point and time for the site visit." },
          { title: "No-show reactivation", desc: "Call missed visitors, capture the reason and rebook." },
          { title: "Post-visit feedback", desc: "Structured liked/disliked, budget-fit and next-step capture, logged to CRM for the closer." },
        ],
      },
      {
        name: "Nurture, booking & service",
        items: [
          { title: "Project FAQ hotline", desc: "RERA number, possession date, carpet area, amenities, price range and payment plans from a bounded KB." },
          { title: "New-launch & price-revision calls", desc: "Inform the existing lead base, capture interest and book visits." },
          { title: "Channel-partner coordination", desc: "Confirm broker event attendance and share inventory updates." },
          { title: "Booking-stage document reminders", desc: "KYC, PAN and agreement-signing appointment scheduling." },
          { title: "Possession & milestone updates", desc: "Proactive construction-milestone updates that deflect angry inbound volume." },
          { title: "Maintenance request intake", desc: "Log a society/tenant complaint, create a ticket and read back the ticket number." },
        ],
      },
    ],
    patterns: ["Qualify + route", "Schedule + reschedule", "Notify + confirm", "Answer from a bounded KB"],
    escalation:
      "Price negotiation, closing the booking and legal disputes over delayed possession stay human. The agent qualifies and schedules; a human closes.",
    faqs: [
      {
        q: "How fast can the agent respond to a new property lead?",
        a: "Within seconds of the lead landing, around the clock. Since 40%+ of property leads die from slow response, calling instantly — even at midnight — is the single biggest ROI lever in real estate.",
      },
      {
        q: "Can it reduce site-visit no-shows?",
        a: "Yes. Day-before and morning-of confirmation calls are proven to cut site-visit no-shows by 30–45%, and the agent automatically reactivates and rebooks anyone who misses.",
      },
      {
        q: "Will it close the booking or negotiate price?",
        a: "No — and that's deliberate. The agent qualifies, books visits, revives cold leads and answers project FAQs. Negotiation and closing are warm-transferred to your human sales team with full context.",
      },
      {
        q: "Can it revive our old CRM leads?",
        a: "Yes. It re-qualifies six-month-old lead lists at scale — checking if budget, location and timeline still fit — so your closers only spend time on the ones that came back warm.",
      },
    ],
    keywords: [
      "real estate voice AI", "property lead qualification bot", "site visit booking automation",
      "99acres MagicBricks lead response", "real estate telecalling AI", "cold lead revival voice agent",
    ],
  },
  {
    slug: "education",
    name: "Education & EdTech",
    fullName: "Education, EdTech & Coaching",
    icon: "🎓",
    tag: "Admissions, demo bookings, fee reminders and retention nudges.",
    headline: "Every lead called in 60 seconds, in their language.",
    tagline:
      "Admission inquiries answered 24/7, demo classes booked and reminded, fee installments nudged, and dormant students re-engaged — at a cost per qualified lead that finally makes EdTech unit economics work.",
    sample: {
      label: "Demo class booking",
      agent: "Aapne coding course ke liye enquiry ki thi — kya main aapke liye free demo class Saturday 5 baje book kar du?",
      user: "Haan, Saturday theek rahega.",
      agent2: "Booked! Reminder 24 ghante aur 1 ghanta pehle aayega. Joining link WhatsApp par bhej diya. All the best!",
      outcome: "Demo booked · reminders scheduled · hot lead routed to counselor",
    },
    outcomes: [
      ["<60s", "speed-to-lead on new signups"],
      ["2.7x", "demo bookings vs manual calling"],
      ["1/4th", "cost per qualified lead"],
    ],
    groups: [
      {
        name: "Admissions & leads",
        items: [
          { title: "Admission inquiry handling (24/7)", desc: "Course details, eligibility check (12th %, stream, graduation score), fee structure and next steps." },
          { title: "Lead qualification for counselors", desc: "Capture goal (job / upskilling / degree), budget and timeline; route hot leads to human counselors." },
          { title: "Application drop-off follow-up", desc: "Call students who started but didn't submit, resolve the blocker and resend the link." },
          { title: "Scholarship & entrance-exam FAQ", desc: "Deadlines, eligibility and documents needed, from a bounded knowledge base." },
        ],
      },
      {
        name: "Demos, scheduling & docs",
        items: [
          { title: "Webinar / demo-class booking", desc: "Book and remind 24h and 1h before — a big attendance lift." },
          { title: "Demo no-show reactivation", desc: "Rebook missed demo attendees automatically." },
          { title: "Counseling appointment scheduling", desc: "Book slots with human counselors and handle rescheduling." },
          { title: "Document-verification reminders", desc: "Marksheets and ID proofs pending for enrollment." },
          { title: "Batch/schedule change notifications", desc: "Outbound at scale with confirmation capture." },
        ],
      },
      {
        name: "Payments, retention & feedback",
        items: [
          { title: "Fee reminders & installment follow-ups", desc: "Due dates, payment links and EMI-option explanation." },
          { title: "Onboarding calls", desc: "LMS login help, batch start date and orientation details post-enrollment." },
          { title: "Engagement / dormancy nudges", desc: "\"You haven't logged in for 2 weeks\" — with reason capture; a proven retention lever." },
          { title: "Deadline reminders", desc: "Exam and assignment deadlines with FAQ handling." },
          { title: "Parent communication calls", desc: "Attendance alerts, PTM scheduling and fee reminders — very effective in K-12 and coaching." },
          { title: "Alumni & placement surveys", desc: "Structured data gathering for NAAC / placement reports." },
          { title: "Completion feedback & NPS", desc: "Course-completion feedback and NPS surveys at scale." },
        ],
      },
    ],
    patterns: ["Qualify + route", "Schedule + reschedule", "Notify + confirm", "Collect structured data"],
    escalation:
      "The final conversion call for a high-ticket course stays with a human counselor. The agent warms up and books the counseling session; a human closes.",
    faqs: [
      {
        q: "How does voice AI lower our cost per qualified lead?",
        a: "It calls every new signup in under 60 seconds, in the student's own language, and books demos at roughly 2.7x the rate of manual calling — driving cost per qualified lead to about a quarter of a human-only telecalling team.",
      },
      {
        q: "Can it improve demo-class attendance?",
        a: "Yes. It books the demo, then sends confirmation calls 24 hours and 1 hour before, and automatically rebooks no-shows — which meaningfully lifts attend rates versus SMS reminders.",
      },
      {
        q: "Is it useful for K-12 schools and coaching, not just EdTech?",
        a: "Very. Parent communication — attendance alerts, PTM scheduling and fee reminders — is one of the highest-value use cases, alongside student dormancy nudges for retention.",
      },
      {
        q: "Will it close a high-ticket course sale?",
        a: "No. High-ticket conversion is warm-transferred to a human counselor. The agent qualifies intent, books the counseling call and handles reminders and payments around it.",
      },
    ],
    keywords: [
      "EdTech voice AI", "admission inquiry bot", "demo class booking automation",
      "fee reminder voice agent", "student engagement calls AI", "education telecalling automation",
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    fullName: "Healthcare, Hospitals & Diagnostics",
    icon: "🏥",
    tag: "24/7 appointment booking, reminders and post-discharge follow-ups.",
    headline: "Front desks that never put patients on hold.",
    tagline:
      "OPD booking and rescheduling, appointment reminders, pre-procedure instructions, lab-report notifications and post-discharge follow-ups — handled 24/7 with a calm, patient voice and strict human-escalation rules for anything clinical.",
    sample: {
      label: "OPD appointment booking",
      agent: "Namaste! Aapko kis department ke liye appointment chahiye — aur koi preferred doctor ya time?",
      user: "Dr. Meena ke saath, Saturday morning.",
      agent2: "Dr. Meena's Saturday 10:30 slot is confirmed. Fasting instructions aur location WhatsApp par bhej diye. Take care!",
      outcome: "Slot booked into HMIS · pre-visit instructions sent · confirmation logged",
    },
    outcomes: [
      ["24/7", "booking without extra front-desk staff"],
      ["41%", "fewer no-shows with reminder calls"],
      ["0", "missed inbound calls after hours"],
    ],
    groups: [
      {
        name: "Appointments",
        items: [
          { title: "OPD appointment booking (24/7)", desc: "Department/doctor selection, slot booking into HMIS and SMS/WhatsApp confirmation — the workhorse use case." },
          { title: "Rescheduling & cancellations", desc: "Including automatic waitlist-backfill calls when a slot opens." },
          { title: "Appointment reminders", desc: "24h-before calls with confirm/reschedule capture; a big no-show reduction." },
          { title: "Doctor availability FAQ", desc: "Timings, consultation fees and which doctor sits when." },
          { title: "Health-checkup package booking", desc: "Package contents, price, prep instructions and slot booking." },
          { title: "Symptom-to-department triage", desc: "Routing only — \"chest pain → cardiology / emergency\" — never diagnosis, with aggressive emergency escalation." },
        ],
      },
      {
        name: "Clinical logistics & reminders",
        items: [
          { title: "Pre-visit / pre-procedure instructions", desc: "Fasting requirements, what to bring and arrival time — read from protocol, so it's safe and reliable." },
          { title: "Lab-report readiness alerts", desc: "\"Your reports are ready\" with collection/download steps — never interpretation." },
          { title: "Post-discharge follow-up", desc: "Structured checklist — medication taken? follow-up booked? red-flag symptom → escalate to a nurse." },
          { title: "Medication adherence reminders", desc: "Especially chronic care — diabetes, hypertension and TB programs." },
          { title: "Vaccination due reminders", desc: "Pediatric schedules and flu shots, with booking." },
          { title: "Surgery/procedure confirmations", desc: "Logistics only — time, fasting and whether an attendant is needed." },
        ],
      },
      {
        name: "Outreach & feedback",
        items: [
          { title: "Insurance / TPA desk support", desc: "Cashless network verification, claim-status readout and pre-auth document checklists." },
          { title: "Camp & screening outreach", desc: "Invite target populations to health camps and book slots." },
          { title: "Pharmacy refill reminders", desc: "For hospital-attached or chain pharmacies, with order capture." },
          { title: "Patient feedback & CSAT", desc: "Structured surveys post-visit and post-discharge." },
        ],
      },
    ],
    patterns: ["Schedule + reschedule", "Notify + confirm", "Answer from a bounded KB", "Collect structured data"],
    escalation:
      "No diagnosis, no medical advice, no breaking sensitive results, and no mental-health crisis lines without human oversight. Triage is routing only, and every red-flag symptom escalates to a nurse or emergency immediately.",
    faqs: [
      {
        q: "Does the voice agent give any medical advice or diagnosis?",
        a: "Never. It books appointments, reads pre-procedure instructions from protocol, notifies report readiness and runs post-discharge checklists. Any clinical question, sensitive result or red-flag symptom is escalated to a nurse or emergency line under strict rules.",
      },
      {
        q: "How does it reduce no-shows?",
        a: "It calls patients 24 hours before with a confirm-or-reschedule prompt, and when a slot frees up it backfills from the waitlist automatically — a proven ~41% no-show reduction versus no reminder.",
      },
      {
        q: "Can it book directly into our HMIS?",
        a: "Yes. It selects department and doctor, books the slot straight into your HMIS, and sends the SMS/WhatsApp confirmation with any prep instructions — 24/7, without extra front-desk staff.",
      },
      {
        q: "Is post-discharge follow-up safe to automate?",
        a: "It's a proven model when escalation rules are strict. The agent runs a fixed checklist — medication taken, follow-up booked, any red-flag symptom — and immediately routes anything concerning to a human nurse.",
      },
    ],
    keywords: [
      "healthcare voice AI", "OPD appointment booking bot", "patient reminder calls AI",
      "hospital front desk automation", "post discharge follow up voice agent", "HMIS appointment automation",
    ],
  },
  {
    slug: "retail-automotive",
    name: "Retail & Auto",
    fullName: "Consumer Goods, Retail & Automobiles",
    icon: "🛒",
    tag: "COD confirmation, NDR rescue, service reminders and post-service feedback.",
    headline: "Kill RTO and no-shows before they kill your margins.",
    tagline:
      "COD confirmation minutes after checkout, NDR address fixes, delivery scheduling, dealership service reminders and OEM-mandated post-service feedback — synced with your OMS/DMS in real time and proven to recover pure ROI.",
    sample: {
      label: "COD order confirmation",
      agent: "Hi! Your GlowKart order for ₹2,199 is ready to ship to your Andheri address — shall I confirm the cash-on-delivery for Thursday?",
      user: "Yes, Thursday works.",
      agent2: "Confirmed! Want to prepay by UPI and save the handling fee? I can send a link — else Thursday COD it is. Thank you!",
      outcome: "Order verified · address confirmed · prepaid nudge offered · RTO risk cleared",
    },
    outcomes: [
      ["20–30%", "RTO reduction on confirmed COD orders"],
      ["Same-day", "NDR recovery of failed deliveries"],
      ["100%", "of post-service feedback calls covered"],
    ],
    groups: [
      {
        name: "Automotive",
        items: [
          { title: "Service due reminders", desc: "The classic dealership use case — km/time-based; book the slot and arrange pickup/drop." },
          { title: "Service confirmation & rescheduling", desc: "Confirm the booked service appointment or move it." },
          { title: "Doorstep pickup/drop coordination", desc: "Confirm address and time window for the vehicle." },
          { title: "Service status updates", desc: "\"Your car is ready\" or a delay notification with a revised ETA." },
          { title: "Post-service feedback (PSF)", desc: "OEM-mandated structured questionnaire; escalate detractors to the service manager. High-volume, perfect fit." },
          { title: "Vehicle insurance renewal reminders", desc: "Expiry alerts, capture renewal interest and route to a human." },
          { title: "Test-drive booking & reminders", desc: "Qualify budget, model and exchange car, then book the test drive." },
          { title: "Delivery milestone updates", desc: "Car allotted, in transit and delivery-slot confirmation." },
          { title: "AMC / extended-warranty alerts", desc: "Inform and capture interest; a human closes the sale." },
          { title: "Recall / campaign outreach", desc: "Call affected VIN owners at scale and book the mandatory service." },
        ],
      },
      {
        name: "E-commerce & retail",
        items: [
          { title: "COD order confirmation", desc: "Verify intent and address on high-value COD orders — a proven 20–30% RTO reduction, pure ROI." },
          { title: "Address verification / fixing", desc: "Correct incomplete addresses before dispatch." },
          { title: "NDR resolution calls", desc: "\"Courier couldn't reach you\" — confirm address/reattempt slot and recover the delivery same-day." },
          { title: "Delivery-slot scheduling", desc: "For large items — furniture and appliances; confirm someone will be home." },
          { title: "Order status & tracking hotline", desc: "Deflect the #1 support query category on inbound." },
          { title: "Return / exchange pickup scheduling", desc: "Book the reverse pickup slot and explain the refund timeline." },
          { title: "Refund status updates", desc: "Read from the OMS; escalate disputes to humans." },
          { title: "Abandoned-cart recovery", desc: "For high-AOV carts — capture the blocker and offer assistance or a payment link, assistive not pushy." },
          { title: "Prepaid conversion nudges", desc: "Offer a small incentive to convert COD to UPI on the confirmation call." },
          { title: "Store & product FAQ", desc: "Availability, store hours and store locator on inbound." },
          { title: "Installation & demo scheduling", desc: "Appliances and furniture assembly — book the technician slot." },
          { title: "Warranty & AMC reminders", desc: "Registration and renewal reminder calls." },
          { title: "Post-purchase NPS", desc: "Structured feedback and NPS surveys after purchase." },
        ],
      },
    ],
    patterns: ["Notify + confirm", "Schedule + reschedule", "Collect structured data", "Fixed-menu offer"],
    escalation:
      "Complaints that need goodwill decisions, high-value refund disputes and any negotiation go to a human. The agent confirms, schedules, recovers deliveries and collects feedback — then escalates detractors with full context.",
    faqs: [
      {
        q: "How much RTO can a COD confirmation agent actually save?",
        a: "Verifying intent and address on high-value COD orders within minutes of checkout is a proven 20–30% RTO reduction. Because it also nudges customers to prepay by UPI, it's one of the clearest pure-ROI use cases in retail.",
      },
      {
        q: "Can it recover failed deliveries?",
        a: "Yes. On an NDR (non-delivery report), the agent calls the customer, confirms the address and reattempt slot, and recovers the delivery the same day instead of it bouncing back.",
      },
      {
        q: "Why is post-service feedback (PSF) a good fit for dealerships?",
        a: "PSF is OEM-mandated, extremely high-volume and fully structured — a perfect fit. The agent runs the questionnaire consistently and escalates detractors straight to the service manager.",
      },
      {
        q: "Does it integrate with our OMS or DMS?",
        a: "Yes. It reads order/service status live from your OMS or dealership DMS, writes back dispositions, and syncs confirmations so your systems stay the single source of truth.",
      },
    ],
    keywords: [
      "COD confirmation bot", "RTO reduction voice AI", "NDR resolution automation",
      "dealership service reminder AI", "post service feedback calls", "ecommerce voice agent India",
    ],
  },
  {
    slug: "telecom-it",
    name: "Telecom & IT",
    fullName: "Telecom, Media, OTT & IT Services",
    icon: "📡",
    tag: "Recharge reminders, L0/L1 troubleshooting, outage alerts and IT helpdesk.",
    headline: "Handle the high-volume calls humans shouldn't have to.",
    tagline:
      "Plan-expiry and bill reminders, L0 network troubleshooting, proactive outage notifications, OTT renewals and the most proven enterprise use case of all — L1 IT helpdesk password and MFA resets with identity verification.",
    sample: {
      label: "Plan expiry reminder",
      agent: "Hi Sameer! Your ₹239 plan expires tomorrow. Want me to send a recharge link now, or tell you about the ₹299 pack with extra OTT?",
      user: "What's in the 299 one?",
      agent2: "28 days, 2GB/day, plus Hotstar and Zee5. Should I send the link for that one?",
      outcome: "Plan explained from KB · recharge link pushed · upsell captured",
    },
    outcomes: [
      ["Fully", "scripted, high-volume recharge & bill reminders"],
      ["Massive", "inbound-spike deflection on outages"],
      ["#1", "proven enterprise use case: L1 password resets"],
    ],
    groups: [
      {
        name: "Telecom",
        items: [
          { title: "Plan-expiry reminders", desc: "Recharge/renewal reminders with a payment-link push — high-volume and fully scripted." },
          { title: "Plan explanation & comparison FAQ", desc: "Data limits, validity, OTT bundles and FUP rules, on inbound." },
          { title: "Postpaid bill reminders & collection", desc: "Due reminders with an instant payment link." },
          { title: "SIM activation / onboarding", desc: "Verify delivery and guide the activation steps." },
          { title: "Bill explanation calls", desc: "\"Why is my bill higher this month?\" — read itemized charges from the billing API; escalate disputes." },
          { title: "L0 network troubleshooting", desc: "APN settings, restart/SIM-reseat scripts and pincode coverage checks; escalate with a pre-filled ticket." },
          { title: "Outage notification calls", desc: "Proactive outbound in affected areas — massively deflects inbound spikes." },
          { title: "Broadband installation scheduling", desc: "Book the technician, confirm availability and send a day-before reminder." },
          { title: "Churn-signal capture", desc: "Capture the reason on port-out/expiry, present a pre-approved retention offer, route real negotiations to humans." },
        ],
      },
      {
        name: "Media, OTT & entertainment",
        items: [
          { title: "Subscription renewal reminders", desc: "OTT/DTH expiry with a payment link." },
          { title: "DTH recharge & pack changes", desc: "Bounded catalog actions on inbound." },
          { title: "Ticket booking confirmations", desc: "Event and show ticket confirmations and reminders." },
          { title: "Win-back calls for lapsed subscribers", desc: "A structured offer from a fixed list, capturing objection reasons." },
        ],
      },
      {
        name: "IT services / enterprise IT",
        items: [
          { title: "L1 password & MFA resets", desc: "Identity verification plus Active Directory action — the most proven enterprise voice use case." },
          { title: "Ticket logging & status hotline", desc: "Create ServiceNow/Jira tickets with the right category and priority, and read back numbers and SLA." },
          { title: "VPN / access request intake", desc: "Capture request details and trigger the approval workflow." },
          { title: "P1 / outage escalation calls", desc: "Call the on-call engineer chain until someone acknowledges." },
          { title: "Maintenance notifications", desc: "Scheduled-maintenance alerts to affected users." },
          { title: "Resolution confirmation & CSAT", desc: "\"Was your issue resolved?\" before auto-closing the ticket." },
          { title: "Employee onboarding IT setup", desc: "Checklist walkthrough for new joiners." },
        ],
      },
    ],
    patterns: ["Notify + confirm", "Answer from a bounded KB", "Schedule + reschedule", "Fixed-menu offer"],
    escalation:
      "Genuine bill disputes, retention negotiations beyond the fixed offer matrix, and persistent technical faults escalate to humans — the agent hands over a pre-filled ticket so nobody repeats themselves.",
    faqs: [
      {
        q: "Is L1 IT helpdesk automation actually reliable?",
        a: "Password and MFA resets are the most proven enterprise voice use case: identity verification followed by a bounded Active Directory action. It's structured, repeatable and auditable, which is exactly where voice agents match or beat human consistency.",
      },
      {
        q: "How does it help during a network outage?",
        a: "It makes proactive outbound calls to everyone in the affected area with status updates, which massively deflects the inbound call spike that would otherwise overwhelm your support lines.",
      },
      {
        q: "Can it handle retention and churn without discounting recklessly?",
        a: "Yes. On a port-out or expiry signal it captures the reason and presents a pre-approved offer from a fixed retention matrix — never an open-ended negotiation. Genuine negotiations route to a human.",
      },
      {
        q: "Can it create tickets in ServiceNow or Jira?",
        a: "Yes. It logs tickets with the correct category and priority, reads back the ticket number and SLA, and for anything it can't resolve it escalates with a pre-filled ticket attached.",
      },
    ],
    keywords: [
      "telecom voice AI", "recharge reminder bot", "L1 IT helpdesk automation",
      "password reset voice agent", "outage notification calls", "OTT renewal voice bot",
    ],
  },
  {
    slug: "travel-hospitality",
    name: "Travel & Hospitality",
    fullName: "Tourism, Hospitality, Travel & Leisure",
    icon: "✈️",
    tag: "Direct bookings, pre-arrival calls, trip qualification and reservation reminders.",
    headline: "Recover the OTA commission on every missed call.",
    tagline:
      "Direct hotel booking inquiries answered 24/7, pre-arrival and upsell calls, trip qualification across NRI time zones, table and activity reservations, and pre-departure information — bounded, structured flows that capture revenue humans miss.",
    sample: {
      label: "Direct hotel booking inquiry",
      agent: "Thanks for calling Lake View Resort! We have a Deluxe Lake-facing room for your dates at ₹6,500 a night — shall I hold it for you?",
      user: "Does that include breakfast?",
      agent2: "I can add breakfast for two at ₹500 — want me to include it and confirm the booking?",
      outcome: "Availability checked · upsell offered · booking held · OTA commission saved",
    },
    outcomes: [
      ["24/7", "direct booking capture, no missed calls"],
      ["OTA", "commission recovered on direct bookings"],
      ["Sharp", "drop in restaurant & hotel no-shows"],
    ],
    groups: [
      {
        name: "Hotels",
        items: [
          { title: "Direct booking inquiries (24/7)", desc: "Room types, rates, availability lookup and hold/booking creation — recovers OTA commission on missed calls alone." },
          { title: "Booking confirmation & pre-arrival", desc: "Confirm dates, capture arrival time, airport-pickup need and special requests." },
          { title: "Modification & cancellation", desc: "Within policy rules; edge cases go to humans." },
          { title: "Pre-arrival upsell (structured)", desc: "Room upgrade, breakfast add-on or early check-in from a fixed-price menu — a bounded offer, not a negotiation." },
          { title: "Hotel FAQ line", desc: "Check-in/out times, parking, pet policy, breakfast hours and directions." },
          { title: "No-show prevention", desc: "Day-before arrival confirmation calls." },
          { title: "Post-checkout feedback & reviews", desc: "Feedback and review-request calls after departure." },
          { title: "Waitlist callback", desc: "\"A room opened up for your dates.\"" },
          { title: "Group / corporate intake", desc: "Capture rooms, dates and budget, and route to a sales manager." },
        ],
      },
      {
        name: "Travel agencies & OTAs",
        items: [
          { title: "Trip inquiry qualification", desc: "Destination, dates, pax, budget band and vibe — 24/7 incl. NRI time zones; send matching packages on WhatsApp and book a consultant callback." },
          { title: "Itinerary & quote follow-up", desc: "\"Did you receive the itinerary? Any questions?\" — capture objections for the human consultant." },
          { title: "Booking payment reminders", desc: "Token and balance payment due dates with payment links." },
          { title: "Document & visa checklist reminders", desc: "Passport validity, photos and forms pending — checklist reading, not visa advice." },
          { title: "Pre-departure information", desc: "Flight time, baggage rules, pickup details and weather." },
          { title: "Flight delay / change notifications", desc: "Proactive outbound with rebooking-desk routing." },
          { title: "Post-trip feedback & reviews", desc: "Feedback and review collection after the trip." },
          { title: "Travel insurance FAQ & opt-in", desc: "Explain fixed plans and capture the add-on opt-in." },
        ],
      },
      {
        name: "Restaurants & leisure",
        items: [
          { title: "Table reservations & reminders", desc: "Booking, confirmation and reminders — cuts restaurant no-shows sharply." },
          { title: "Activity / tour slot booking", desc: "Theme parks, safaris and experiences — availability, pricing, booking and weather-hold notifications." },
          { title: "Membership renewal reminders", desc: "Clubs, gyms and resorts — expiry alerts with a payment link." },
          { title: "Event RSVP & reminders", desc: "Weddings, venues and banquets — confirm attendance and dietary preferences." },
        ],
      },
    ],
    patterns: ["Answer from a bounded KB", "Schedule + reschedule", "Notify + confirm", "Fixed-menu offer"],
    escalation:
      "Bespoke luxury itinerary curation and pricing negotiation stay with human consultants. The agent qualifies, schedules, upsells from a fixed menu and reminds; a human curates and closes.",
    faqs: [
      {
        q: "How does a voice agent recover OTA commission?",
        a: "Every direct-booking inquiry a hotel misses after hours usually ends up rebooked through an OTA at 15–25% commission. Answering those calls 24/7 and creating the booking directly captures that revenue at cost.",
      },
      {
        q: "Can it handle NRI travel inquiries across time zones?",
        a: "Yes — that's a strength. It qualifies trip inquiries round the clock, so a customer in a different time zone gets an instant response, matching packages on WhatsApp and a booked callback with a human consultant.",
      },
      {
        q: "Will it give visa advice?",
        a: "No. It reads back a visa/document checklist — passport validity, photos, forms pending — but any actual visa advice or bespoke itinerary curation is warm-transferred to a human consultant.",
      },
      {
        q: "Does it reduce restaurant and hotel no-shows?",
        a: "Yes. Day-before confirmation calls for table reservations and hotel arrivals sharply cut no-shows, and the pre-arrival upsell menu adds revenue on the same call.",
      },
    ],
    keywords: [
      "hotel booking voice AI", "travel agency voice agent", "restaurant reservation bot",
      "pre-arrival upsell automation", "OTA commission recovery", "hospitality voice AI India",
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
