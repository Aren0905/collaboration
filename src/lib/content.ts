export const SITE = {
  title: "The Other Chair",
  tagline: "I build. You lead the room.",
  email: "aaron.man0905@gmail.com",
  description:
    "I'm a software developer seeking English-speaking partners to pursue remote software opportunities—especially US and UK. I build. You lead conversations. We share 60/40.",
} as const;

export const SCENES = [
  {
    id: "threshold",
    label: "Open",
    eyebrow: "One opportunity",
    title: "I build software. You lead conversations. We win projects together.",
    line1: "I BUILD SOFTWARE.",
    line2: "YOU LEAD CONVERSATIONS.",
    line3: "WE WIN PROJECTS TOGETHER.",
    body: "I'm looking for English-speaking partners to pursue remote software opportunities, especially in the US and UK.",
    cue: "Scroll to enter the story",
    splitHint: "Developer 60% · Partner 40%",
    cta: "See how we work",
  },
  {
    id: "partner",
    label: "Partner",
    eyebrow: "The missing piece",
    title: "Great software needs great communication.",
    body: "That's where you come in.",
  },
  {
    id: "markets",
    label: "Markets",
    eyebrow: "Where we search",
    title: "Your country. US. UK. Worldwide.",
    body: "We search together for suitable software opportunities.",
    disclaimer:
      "Illustrative focus — not a placement guarantee. We only pursue authorized remote collaboration.",
  },
  {
    id: "interview",
    label: "Interview",
    eyebrow: "Preparation → room",
    title: "You lead the conversation. I support the technical preparation.",
    body: "You handle professional communication. I prepare technical ground and join technical discussions when appropriate. Roles stay honest.",
  },
  {
    id: "delivery",
    label: "Delivery",
    eyebrow: "Two rooms · one project",
    title: "You handle communication. I handle development. We deliver together.",
    body: "One shared timeline from scope to shipped software.",
  },
  {
    id: "split",
    label: "Share",
    eyebrow: "Terms",
    title: "60 / 40",
    body: "Project revenue divides by responsibility: 60% development and delivery, 40% interviews, client communication, and coordination.",
    closing: "Different responsibilities. Shared results.",
    disclaimer:
      "Figures are illustrative examples only — not guaranteed earnings. Payment basis and expenses must be agreed in advance.",
  },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

export const ROLE_CREDITS = {
  technical: {
    title: "Developer — me",
    lines: [
      "Software architecture",
      "Coding & implementation",
      "Debugging & testing",
      "Delivery",
      "Technical support in discussions",
    ],
  },
  communication: {
    title: "Communication partner — you",
    lines: [
      "English communication",
      "Interviews",
      "Client meetings",
      "Requirements gathering",
      "Progress updates & coordination",
    ],
  },
} as const;

export const MARKET_BEATS = [
  {
    id: "us",
    index: "01",
    title: "United States",
    detail: "Primary focus — remote software contracts under authorized terms.",
    region: "us" as const,
  },
  {
    id: "uk",
    index: "02",
    title: "United Kingdom",
    detail: "Primary focus — remote software contracts under authorized terms.",
    region: "uk" as const,
  },
  {
    id: "home",
    index: "03",
    title: "Your home country",
    detail: "Local language fit and opportunities that match how you already work.",
    region: "home" as const,
  },
  {
    id: "world",
    index: "04",
    title: "Worldwide",
    detail: "Other remote projects wherever collaboration is clean and legal.",
    region: "world" as const,
  },
] as const;

export const ILLUSTRATIVE_LISTINGS = [
  {
    id: "us-1",
    market: "US · Remote",
    title: "Full-stack product engineer",
    note: "Illustrative listing — not a live opening",
  },
  {
    id: "uk-1",
    market: "UK · Remote",
    title: "Platform engineer · consulting team",
    note: "Illustrative listing — not a live opening",
  },
] as const;

export const PREP_STEPS = [
  {
    id: "jd",
    label: "01 · Job description",
    detail: "We read the role together and mark what is communication vs technical.",
  },
  {
    id: "tech",
    label: "02 · Technical requirements",
    detail: "I translate architecture and constraints into plain talking points.",
  },
  {
    id: "practice",
    label: "03 · Practice",
    detail: "You rehearse answers. I stress-test hard technical questions.",
  },
  {
    id: "roles",
    label: "04 · Clear roles",
    detail: "Before any call, we agree who speaks to what — and stay truthful.",
  },
] as const;

export const INTERVIEW_BEATS = [
  {
    id: "room",
    label: "You lead the room",
    detail: "Professional English presence with recruiters and clients.",
  },
  {
    id: "prep",
    label: "I prepare the technical ground",
    detail: "Explanations, architecture context, and rehearsal for hard questions.",
  },
  {
    id: "join",
    label: "I join when appropriate",
    detail: "Technical discussions only when the client authorizes it.",
  },
  {
    id: "honesty",
    label: "Honest representation",
    detail: "If asked who codes, we answer plainly. No impersonation.",
  },
] as const;

export const DELIVERY_TIMELINE = [
  {
    id: "scope",
    label: "Scope",
    detail: "Agreed work, constraints, and ownership.",
    owner: "both" as const,
  },
  {
    id: "build",
    label: "Build",
    detail: "Architecture, implementation, debugging.",
    owner: "dev" as const,
  },
  {
    id: "test",
    label: "Test",
    detail: "Quality checks before anything ships.",
    owner: "dev" as const,
  },
  {
    id: "update",
    label: "Client update",
    detail: "Progress, risks, and next decisions — in English.",
    owner: "partner" as const,
  },
  {
    id: "ship",
    label: "Delivery",
    detail: "Working software under authorized remote terms.",
    owner: "both" as const,
  },
] as const;
