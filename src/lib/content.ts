export const SITE = {
  title: "The Other Chair",
  tagline: "I build. You lead the room.",
  email: "aaron.man0905@gmail.com",
  description:
    "A cinematic explanation of transparent remote software collaboration: technical delivery and English communication as complementary roles across global markets.",
} as const;

export const SCENES = [
  {
    id: "threshold",
    label: "Enter",
    eyebrow: "Opening",
    title: "What if your strongest skill isn't coding?",
    body: "What if it could still become part of a software business?",
    cue: "Scroll to discover.",
    bridge: "Two people. Different strengths. One transparent practice.",
  },
  {
    id: "strengths",
    label: "Strengths",
    eyebrow: "Scene A",
    title: "Two strengths. One practice.",
    body: "Different countries. Complementary work. Clear ownership.",
  },
  {
    id: "markets",
    label: "Markets",
    eyebrow: "Scene B",
    title: "Where opportunity can live",
    body: "We look for authorized remote work where your voice and our delivery can meet honestly.",
  },
  {
    id: "prepare",
    label: "Prepare",
    eyebrow: "Scene C",
    title: "Find. Prepare. Align.",
    body: "We shape accurate profiles, applications, portfolios, and materials together—before anyone enters a room.",
  },
  {
    id: "interview",
    label: "Interview",
    eyebrow: "Scene D",
    title: "Lead the conversation. Stay truthful.",
    body: "You lead communication. I prepare the technical ground—and join when appropriate. Roles stay honest.",
  },
  {
    id: "delivery",
    label: "Delivery",
    eyebrow: "Scene E",
    title: "From yes to shipped work",
    body: "I implement and test. You carry project communication. The timeline stays visible between both rooms.",
  },
  {
    id: "split",
    label: "Split",
    eyebrow: "Terms",
    title: "60 / 40",
    body: "Project revenue enters as one stream, then divides by responsibility: 60% development and delivery, 40% interviews, client communication, and coordination.",
    closing: "Different responsibilities. Shared results.",
    disclaimer:
      "Figures below are illustrative examples only—not guaranteed earnings. Payment basis and expenses must be agreed in advance.",
  },
  {
    id: "chemistry",
    label: "Chemistry",
    eyebrow: "Fit",
    title: "Chemistry, not a quiz",
    body: "A few situations. No score. Only how we operate together.",
  },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

export const ROLE_CREDITS = {
  technical: {
    title: "Developer",
    lines: [
      "Software engineering",
      "Architecture",
      "Implementation",
      "Testing",
      "Delivery",
    ],
  },
  communication: {
    title: "Communication partner",
    lines: [
      "Communication",
      "Interviews",
      "Meetings",
      "Requirements",
      "Coordination",
    ],
  },
} as const;

export const MARKET_BEATS = [
  {
    id: "home",
    index: "01",
    title: "Partner's home country",
    detail:
      "Local connections, language fit, and opportunities that suit how you already work.",
    region: "home" as const,
  },
  {
    id: "us-uk",
    index: "02",
    title: "United States & United Kingdom",
    detail:
      "International remote contracts pursued under authorized terms—never misrepresented roles.",
    region: "atlantic" as const,
  },
  {
    id: "world",
    index: "03",
    title: "Worldwide",
    detail:
      "Distributed teams, consulting, and remote projects wherever the collaboration is clean and legal.",
    region: "world" as const,
  },
] as const;

export const PREPARE_ITEMS = [
  {
    id: "profiles",
    label: "Profiles",
    detail: "Accurate role descriptions that state who builds and who communicates.",
  },
  {
    id: "applications",
    label: "Applications",
    detail: "Materials prepared together so the story matches the real partnership.",
  },
  {
    id: "portfolios",
    label: "Portfolios",
    detail: "Evidence of delivery and communication craft—without borrowed credit.",
  },
  {
    id: "briefs",
    label: "Shared briefs",
    detail: "Aligned talking points before outreach, interviews, or client calls.",
  },
] as const;

export const INTERVIEW_BEATS = [
  {
    id: "room",
    label: "The room",
    detail: "You lead the live conversation with clarity and presence.",
  },
  {
    id: "prep",
    label: "Technical preparation",
    detail: "I provide explanations, architecture context, and rehearsal for hard questions.",
  },
  {
    id: "coach",
    label: "Communication coaching",
    detail: "We refine how complex ideas are spoken—without changing who owns the work.",
  },
  {
    id: "honesty",
    label: "Honest representation",
    detail: "If asked who codes, we answer plainly. Misrepresentation is not part of this practice.",
  },
] as const;

export const DELIVERY_TIMELINE = [
  {
    id: "scope",
    label: "Scope locked",
    detail: "Agreed work, constraints, and ownership.",
  },
  {
    id: "build",
    label: "Build & test",
    detail: "Implementation, review, and quality checks on my side.",
  },
  {
    id: "update",
    label: "Client updates",
    detail: "You communicate progress, risks, and next decisions.",
  },
  {
    id: "ship",
    label: "Delivery",
    detail: "Working software handed over under authorized remote terms.",
  },
] as const;

export const CHEMISTRY_SIDES = [
  {
    id: "timeline",
    prompt: "A client asks for a timeline you know is unsafe.",
    principle:
      "We protect trust: you surface the risk; I provide a credible technical path—not a hopeful date.",
  },
  {
    id: "who-codes",
    prompt: "An interviewer probes who actually codes.",
    principle:
      "We answer plainly. I build. You lead communication. Misrepresentation ends the engagement.",
  },
  {
    id: "scope",
    prompt: "Scope expands mid-call.",
    principle:
      "You hold the room; we pause to re-scope with me before promising delivery.",
  },
] as const;
