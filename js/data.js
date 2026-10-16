/* =====================================================================
   EDIT HERE — all content & links live in this file.
   ===================================================================== */

/* Fill these in. Empty links show a small "link not set" notice instead of opening. */
window.CONFIG = {
  email: "vinasabrinaa@gmail.com",
  linkedin: "https://www.linkedin.com/in/vinasabrina",
  photo: "assets/photo.jpg", // optional profile photo (falls back to initials if missing)
  docs: {                   // links for the "Read the … (pdf)" buttons
    ayam: "assets/docs/ayam-mantap-77-requirement.pdf",
    traveloka_pdf: "assets/docs/traveloka-okr.pdf",
    traveloka_ppt: "",
    shopee_brd: "assets/docs/brd-shopee-live-checkout.pdf",
    shopee_fsd: "assets/docs/fsd-shopee-live-checkout.pdf",
    shopee_prd: "assets/docs/prd-shopee-live-checkout.pdf",
    sehatkerja: "assets/docs/sehatkerja-scrum-plan.pdf"
  }
};

window.PROJECTS = [
  /* ------------------------------------------------------------ 01 */
  {
    id: "ayam-mantap",
    no: "01",
    tag: "Requirement Gathering / Product",
    title: "Ayam Mantap 77 — Digital Food Ordering System",
    short: "Translating restaurant operational challenges into system requirements through stakeholder elicitation, process modeling, and acceptance criteria.",
    thumb: "assets/img/ayam-tobe.webp",
    thumbPos: "top",
    highlight: { v: "8", l: "testable acceptance criteria" },
    chips: ["Requirements Prioritization", "DACI & RACI", "Acceptance Criteria", "Draw.io"],
    meta: [
      ["What it is", "Requirement Gathering"],
      ["Tools & methods", "Requirements Prioritization, DACI & RACI Charts, Acceptance Criteria, Draw.io"],
      ["Who", "Group project"],
      ["Context", "dibimbing BA and Product Strategy Bootcamp"]
    ],
    problem: "Ayam Mantap 77's manual ordering and communication processes create risks of recording errors, service delays, limited order-status visibility, and inefficient sales reporting. Through stakeholder elicitation, requirement prioritization, and To-Be process modeling, these operational challenges are translated into functional and non-functional requirements and 8 testable acceptance criteria.",
    sections: [
      { type: "stats", items: [
        { v: "≤5s", l: "to add or update a menu item", d: "Proposed target" },
        { v: "100%", l: "sales report accuracy", d: "Proposed target" },
        { v: "8", l: "acceptance criteria", d: "Specific, measurable, testable" }
      ], note: "Targets are subject to validation against operational baselines and system testing." },
      { type: "steps", title: "How the work unfolded", items: [
        { t: "Business Problem", d: "Recording errors and process delays." },
        { t: "Requirement Elicitation", d: "Eliciting stakeholder requirements and understanding the actual business processes." },
        { t: "Requirements & Prioritization", d: "Defining Functional Requirements (FRs), Non-Functional Requirements (NFRs), and feature priorities." },
        { t: "To-Be Process & Acceptance Criteria", d: "Designing a new workflow after implementing a system, User Stories, and 8 Acceptance Criteria as a basis for feature testing and UAT." }
      ]},
      { type: "compare", title: "From manual (As-Is) to real-time (To-Be)",
        head: ["Aspect", "As-Is", "To-Be"],
        rows: [
          ["Ordering", "Manual record-keeping", "Order entry through the system"],
          ["Kitchen communication", "Relies on communication between employees", "Orders are recorded and forwarded through the system"],
          ["Order status", "Difficult to monitor in real time", "Order statuses can be updated and monitored in real time"],
          ["Payment", "Prone to recording discrepancies", "Transactions are recorded in an integrated system"],
          ["Sales report", "Requires manual reporting", "Reports can be generated automatically"]
        ]},
      { type: "table", title: "Requirements prioritization",
        head: ["Priority", "Requirement", "Link to business goal"],
        rows: [
          ["High — FR", "Digital menus, online ordering, order forwarding to the kitchen, and menu availability validation", "Digitize the ordering process and reduce recording errors"],
          ["High — FR", "Payment processing and transaction recording", "Accelerate transaction completion while maintaining data accuracy"],
          ["Medium — FR", "Order status tracking and menu management", "Improve process transparency and operational efficiency"],
          ["Medium — FR", "Automated sales reporting", "Support performance evaluation and data-driven business decision-making"],
          ["High — NFR", "Performance: a maximum response time of 3–5 seconds for core functions", "Maintain service speed and enhance the user experience"],
          ["High — NFR", "Reliability & Security", "Maintain the integrity of orders, transactions, and user data"],
          ["Medium — NFR", "Usability & Compatibility", "Ensure ease of use across smartphones, tablets, and computers"],
          ["Medium — NFR", "Availability & Scalability", "Support restaurant operations and accommodate transaction volume growth"]
        ]},
      { type: "cards", title: "Key insights", items: [
        { t: "Requirements must be driven by business problems", d: "The root problems go beyond \"needing a web app\": the risk of recording errors, service delays, difficulty tracking order statuses, and inefficient sales reporting. Manual recording alone is not the reason to build a system." },
        { t: "Requirement elicitation", d: "Stakeholder requirements are interconnected and form the foundation of the To-Be design. The proposed system is evaluated with measurable indicators: order response time, order forwarding time to the kitchen, recording accuracy, order status visibility, and sales report generation time." },
        { t: "Prioritize by business value", d: "Digital ordering, menu availability validation, and order forwarding to the kitchen come first because they directly address the operational issues. Sales reports and supporting features follow, based on business need and available resources." },
        { t: "To-Be process & acceptance criteria", d: "The To-Be process digitizes the workflow from ordering and payment to order processing and sales reporting. Eight acceptance criteria give each function a specific, measurable, testable outcome — a reference for requirement validation and UAT." }
      ]},
      { type: "gallery", title: "Artifacts", items: [
        { src: "assets/img/ayam-asis.webp", cap: "As-Is process (manual)" },
        { src: "assets/img/ayam-tobe.webp", cap: "To-Be process (digital)" },
        { src: "assets/img/ayam-priority.webp", cap: "Prioritized requirements" }
      ]}
    ],
    docs: [{ label: "Read the Requirement (pdf)", key: "ayam" }],
    next: "The system's success would be validated against predefined acceptance criteria through functional testing and User Acceptance Testing (UAT)."
  },

  /* ------------------------------------------------------------ 02 */
  {
    id: "traveloka-okr",
    no: "02",
    tag: "Vision & Mission, Success Metrics and OKRs / Product",
    title: "Metrics and OKRs for Traveloka",
    short: "Traveloka's engagement is concentrated around trip events and drops sharply afterward. OKRs and retention metrics designed to increase repeat bookings, reactivate users, and drive long-term loyalty.",
    thumb: "assets/img/okr-slide.webp",
    thumbPos: "contain",
    highlight: { v: "2", l: "objectives · 6 key results" },
    chips: ["OKRs", "AARRR (Pirate Metrics)", "Retention", "Engagement"],
    meta: [
      ["What it is", "Success metrics and OKRs"],
      ["Tools & methods", "OKRs, Pirate metrics (AARRR)"],
      ["Who", "Group project"],
      ["Context", "dibimbing BA and Product Strategy Bootcamp"]
    ],
    problem: "Traveloka's engagement is concentrated around trip events and drops sharply afterward. We designed OKRs and retention and engagement metrics to increase repeat bookings, reactivate users, and drive long-term customer loyalty.",
    sections: [
      { type: "note", text: "This project uses a hypothesis-driven approach, with baseline estimates from public data or explicit assumptions. Improvement targets will be validated through cohort analysis, experimentation, and statistical analysis. All findings remain unvalidated pending supporting data." },
      { type: "okr", title: "The OKRs", objectives: [
        { o: "Be the travel app people trust for every trip", krs: [
          { m: "Repeat booking within 90 days", t: "28% → 38%", d: "Increase by 10 percentage points through personalized recommendations, reminders, and easier rebooking." },
          { m: "Churn 30 days after first purchase", t: "60% → 45%", d: "Reduce churn by 15 percentage points through improved post-booking experiences (e.g. a 3-step onboarding flow for new buyers) and relevant content." },
          { m: "Still active after 12 months", t: "28% → 40%", d: "Increase by 12 percentage points through loyalty programs and repeat-user benefits." }
        ]},
        { o: "Get people using the app beyond booking", krs: [
          { m: "App opens per month", t: "2 → 4 sessions", d: "Increase usage frequency from 2 to 4 times per month through itinerary planning and destination discovery features." },
          { m: "Monthly active users", t: "+15% / month for one quarter", d: "Increase the DAU/MAU ratio from 9% to 15% (equivalent to growing daily active users from 1.6 million to 2.4 million)." },
          { m: "DAU/MAU", t: "≈3.3% → 5%", d: "Improve the DAU/MAU ratio through features that encourage repeat visits." }
        ]}
      ]},
      { type: "cards", title: "From metric to initiative", items: [
        { t: "Personalized post-trip messages", d: "Each key result is linked to a concrete product initiative — starting with messages that bring users back after their trip." },
        { t: "Tiered loyalty points program", d: "Rewards that make repeat bookings and long-term activity worth it." },
        { t: "Destination inspiration feed", d: "A feed designed to encourage users to return to the app beyond booking moments." }
      ]}
    ],
    docs: [
      { label: "Read the Project (pdf)", key: "traveloka_pdf" },
      { label: "Read the Project (ppt)", key: "traveloka_ppt" }
    ],
    next: "Pick one North Star Metric to tie the OKRs together — for example, completed trips booked per month."
  },

  /* ------------------------------------------------------------ 03 */
  {
    id: "shopee-brd-fsd",
    no: "03",
    tag: "BRD and FSD / Requirements",
    title: "Shopee Live Real-Time Checkout Enablement — from BRD to FSD",
    short: "Designed digital product solutions by translating business requirements into structured Business Requirements Documents (BRD) and Functional Specification Documents (FSD).",
    thumb: "assets/img/brd-doc.webp",
    thumbPos: "top",
    highlight: { v: "19 + 8", l: "functional & non-functional requirements" },
    chips: ["BRD", "FSD", "API design", "Microservices", "ERD"],
    meta: [
      ["What it is", "BRD and FSD / Requirements"],
      ["Tools & methods", "BRD, FSD, API design"],
      ["Who", "Individual project"],
      ["Context", "dibimbing BA and Product Strategy Bootcamp"]
    ],
    problem: "Shopee Live faces a bottleneck in the checkout-to-pay process that lowers Watch → Buy conversion. The goal: raise the conversion rate by speeding up checkout and reducing failures caused by stock-outs. Scope covers checkout-to-pay flow optimization, real-time stock validation and reservation, stock-status information, and success/failure feedback for transactions during Shopee Live sessions.",
    sections: [
      { type: "split",
        left: { title: "The business side (BRD)", kicker: "Business Requirements Document",
          text: "Developed a BRD to identify business problems in the Shopee Live checkout process, analyze the root causes of transaction failures, and define business objectives, scope, requirements, and proposed solutions based on the current (As-Is) and proposed (To-Be) processes.",
          stats: [
            { v: "7–9", l: "clicks to check out" },
            { v: "102s", l: "avg. failed-checkout duration" },
            { v: "58%", l: "checkout failure rate" }
          ],
          list: [
            "Established targets: checkout time ≤55 seconds, checkout failure ≤40%, conversion rate from 1.8% to ≥2.5%.",
            "Proposed One-Tap Flash Checkout, Smart Checkout, Auto Voucher Apply, and Flash Stock Reservation.",
            "Defined project scope, requirement prioritization, stakeholders, and proposed business processes."
          ]},
        right: { title: "The technical side (FSD)", kicker: "Functional Specification Document",
          text: "Expanded the BRD into functional and technical specifications detailing how the proposed solution would operate within the system: requirements, system architecture, data structures (ERD), and API contracts for inter-service integration.",
          stats: [
            { v: "19", l: "functional requirements" },
            { v: "8", l: "non-functional requirements" },
            { v: "7", l: "key APIs documented" }
          ],
          list: [
            "Designed a microservices overview and integration flows for Checkout, Voucher, Seller Inventory, Payment, Order, and Notification services.",
            "Designed the Checkout Session and Stock Reservation data structures, including fields, data types, and constraints.",
            "APIs cover checkout initiation, voucher application, stock reservation, payment processing, order confirmation, and reservation release.",
            "Standardized error responses for out-of-stock items, failed reservations, payment failures, and timeouts."
          ]}
      },
      { type: "callout", title: "Traceability", text: "Every BRD requirement, traced from business need to delivered solution." },
      { type: "gallery", title: "Artifacts", items: [
        { src: "assets/img/brd-doc.webp", cap: "Business Requirements Document" },
        { src: "assets/img/fsd-doc.webp", cap: "Functional Specification Document" },
        { src: "assets/img/traceability.webp", cap: "BRD → FSD traceability matrix" }
      ]},
      { type: "cards", title: "My role as a Product Manager", items: [
        { t: "Business alignment", d: "Ensure alignment with business objectives and validate feature scope and prioritization." },
        { t: "Flows & feasibility", d: "Define user flows and assess technical feasibility and risks." },
        { t: "Stakeholder agreement", d: "Align KPIs, acceptance criteria, and alternative scenarios so the BRD and FSD are ready to serve as references for product development." }
      ]}
    ],
    docs: [
      { label: "Read the BRD (pdf)", key: "shopee_brd" },
      { label: "Read the FSD (pdf)", key: "shopee_fsd" }
    ],
    next: ""
  },

  /* ------------------------------------------------------------ 04 */
  {
    id: "shopee-prd",
    no: "04",
    tag: "Lean PRD / Product",
    title: "From Live to Paid — Real-Time Checkout Enablement for Shopee Live",
    short: "Reducing checkout friction through smarter payments, real-time stock validation, and seamless purchasing. A five-feature checkout flow with a Figma-designed, Lovable-built prototype.",
    thumb: "assets/img/checkout-flow.webp",
    thumbPos: "center",
    highlight: { v: "58% → ≤35%", l: "predicted checkout failure rate" },
    chips: ["Lean PRD", "Figma", "Lovable prototype", "A/B test plan"],
    meta: [
      ["What it is", "Lean PRD"],
      ["Tools & methods", "Lean PRD, Figma"],
      ["Who", "Individual project"],
      ["Context", "dibimbing BA and Product Strategy Bootcamp"]
    ],
    problem: "High purchase intent, but too much friction between product discovery and payment. Shopee Live lets users discover products and interact with sellers in real time — but the experience loses momentum when users hit slow checkouts, payment failures, or stock unavailability.",
    sections: [
      { type: "stats", title: "Four problems identified", items: [
        { v: "102s", l: "Checkout takes too long", d: "Average completion time for failed payments vs. 55s for successful ones." },
        { v: "58%", l: "Payment failures", d: "26 of 45 — failed attempts generate zero revenue and reduce Watch-to-Purchase conversion." },
        { v: "51%", l: "Stock isn't guaranteed", d: "23 of 45 users in the sample experienced out-of-stock issues." },
        { v: "70%", l: "Drop-off at confirmation", d: "Drop-off occurs on the voucher and payment confirmation page." }
      ], note: "The figures above are based on simulated case-study data and do not represent official Shopee metrics." },
      { type: "callout", title: "How I framed the opportunity", text: "How can we reduce friction between purchase intent and successful payment without compromising stock accuracy or transaction status clarity?" },
      { type: "features", title: "What I proposed",
        intro: "A five-feature real-time checkout flow designed to reduce purchase friction, prevent stock-related failures, and improve conversion during Shopee Live sessions. The screens are from the prototype I built in Lovable, translating the PRD into a tangible user experience.",
        items: [
          { t: "One-Tap Flash Checkout", d: "Eligible buyers complete checkout in fewer steps using saved delivery and payment details.", o: "Checkout interactions from 7–9 clicks to ≤4–5 clicks; successful checkout duration from 55 to ≤45 seconds." },
          { t: "Smart Checkout & Auto-Voucher", d: "The system displays a clear order summary and automatically applies the best eligible voucher.", o: "Drop-off at voucher/payment confirmation from 70% to ≤40%." },
          { t: "Real-Time Stock Validation", d: "The system checks stock availability before payment to prevent checkout attempts for unavailable products.", o: "Stock-out-related failures from 51% to ≤20%." },
          { t: "Flash Stock Reservation", d: "Available stock is temporarily reserved during checkout and automatically released when the reservation expires.", o: "Prevent overselling — zero confirmed overselling incidents during controlled testing." },
          { t: "Checkout Status & Error Handling", d: "Buyers receive clear pending, successful, or failed payment statuses, with actionable error messages and a safe retry flow.", o: "Checkout failure from 58% to ≤35%; successful checkout rate from 42% to ≥65%." }
        ]},
      { type: "gallery", title: "User flow & metrics", items: [
        { src: "assets/img/checkout-flow.webp", cap: "Real-time checkout user flow", wide: true },
        { src: "assets/img/metrics-table.webp", cap: "Baseline → prediction → expected impact", wide: true }
      ]},
      { type: "cards", title: "How I'd measure it", items: [
        { t: "A/B test", d: "Compare the current checkout flow (Control) with the Real-Time Checkout Enablement flow (Treatment), monitoring payment success, stock accuracy, and duplicate transactions as guardrail metrics." },
        { t: "Pre-launch usability test", d: "Test the prototype with 10–15 users, targeting a task success rate of ≥85%, a maximum of 5 clicks, and a completion time of ≤45 seconds." }
      ], note: "All targets are experiment predictions, not measured results. Baselines and denominators should be validated before testing; overlapping failure categories should not be added together." }
    ],
    docs: [{ label: "Read the PRD (pdf)", key: "shopee_prd" }],
    next: "Close the gaps between the PRD, BRD, and FSD by adding Checkout Information Display, Feature Analytics, and Checkout Monitoring. Strengthen payment retry and idempotency rules, clarify stock reservation release and pending-payment handling, and align data schemas with the end-to-end checkout flow before development and UAT."
  },

  /* ------------------------------------------------------------ 05 */
  {
    id: "sehatkerja",
    no: "05",
    tag: "Product Goal, Backlog and Sprint Plan / Project Delivery, Product",
    title: "SehatKerja — planning a workplace wellness app in Scrum",
    short: "Employees at PT Sukses Terus were tired, sitting all day and losing motivation. We planned a simple app in three two-week sprints, each one usable on its own.",
    thumb: "assets/img/sprint-plan.webp",
    thumbPos: "top",
    highlight: { v: "14", l: "user stories · 3 sprints" },
    chips: ["Scrum", "User Stories", "Story Points", "Sprint Planning"],
    meta: [
      ["What it is", "Product goal, backlog and sprint plan"],
      ["Tools & methods", "Scrum, User stories, Story points"],
      ["Who", "Individual project"],
      ["Context", "dibimbing BA and Product Strategy Bootcamp"]
    ],
    problem: "Employees at PT Sukses Terus were tired, sitting all day and losing motivation. The plan: a simple wellness app, delivered in three two-week sprints, each one usable on its own.",
    sections: [
      { type: "callout", title: "Product goal", text: "Help employees build healthy daily habits at work through reminders, light activity, healthier eating and peer support, and raise their energy levels within three months." },
      { type: "stats", title: "Success measures", items: [
        { v: "60%", l: "of employees use the app every week" },
        { v: "+20%", l: "average daily energy score vs. the first month" },
        { v: "40%", l: "of employees join a team challenge" }
      ]},
      { type: "steps", title: "Backlog and sprints", intro: "14 user stories, estimated in story points, with a team capacity of about 20 points per two-week sprint. Sprints are grouped by effort and dependency rather than strictly by impact.",
        items: [
          { t: "Sprint 1 · 19 SP", d: "Builds individual habits — basic desk habits: water and break reminders, stretching guides, a one-tap energy check-in and a streak." },
          { t: "Sprint 2 · 21 SP", d: "Introduces shared motivation and progress tracking — team challenges, a leaderboard, healthy canteen menus and an HR dashboard of energy trends." },
          { t: "Sprint 3 · 21 SP", d: "Focuses on sustaining those habits over time — invite colleagues, HR wellness events, reward points and smartwatch sync." }
        ]},
      { type: "gallery", title: "Artifacts", items: [
        { src: "assets/img/sprint-plan.webp", cap: "Sprint plan" },
        { src: "assets/img/backlog.webp", cap: "Product backlog" },
        { src: "assets/img/sprint-goals.webp", cap: "Sprint goals & points", wide: true },
        { src: "assets/img/done-when.webp", cap: "Acceptance criteria → Definition of Done", wide: true }
      ]},
      { type: "callout", title: "Acceptance criteria", text: "Adding acceptance criteria for the top stories made the Definition of Done testable." }
    ],
    docs: [{ label: "Read the Plan (pdf)", key: "sehatkerja" }],
    next: "Write acceptance criteria for every story, not just the top ones — clear and testable, so each sprint delivers usable, validated increments."
  }
];
