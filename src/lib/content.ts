export const SITE = {
  title: "The Connection",
  brandSecondary: "The Other Chair",
  tagline: "One opportunity. Two people. A world of possibilities.",
  email: "aaron.man0905@gmail.com",
  description:
    "I'm a software developer seeking English-speaking partners for international remote software work—especially US and UK. I build. You lead conversations. We share 60/40.",
} as const;

export const SCENES = [
  {
    id: "threshold",
    label: "Signal",
    eyebrow: "Scene 01 · The Signal",
    title: "I build software. You lead conversations. We win projects together.",
    line1: "I BUILD SOFTWARE.",
    line2: "YOU LEAD CONVERSATIONS.",
    line3: "WE WIN PROJECTS TOGETHER.",
    body: "I'm looking for English-speaking partners to pursue international remote software opportunities, especially in the US and UK.",
    cue: "Scroll to follow the opportunity",
    splitHint: "Developer 60% · Partner 40%",
    cta: "See how we work",
  },
  {
    id: "partner",
    label: "Chair",
    eyebrow: "Scene 02 · The empty chair",
    title: "One person can build the software.",
    body: "But who will lead the conversation?",
  },
  {
    id: "markets",
    label: "World",
    eyebrow: "Scene 03 · The world opens",
    title: "Your country. US. UK. Worldwide.",
    body: "We search together for suitable software opportunities.",
    disclaimer:
      "Illustrative focus — not a placement guarantee. Authorized remote collaboration only.",
  },
  {
    id: "interview",
    label: "Room",
    eyebrow: "Scene 04 · The interview",
    title: "You lead the conversation. I support the technical preparation.",
    body: "Transparent roles. No impersonation. Technical participation only when authorized.",
  },
  {
    id: "delivery",
    label: "Build",
    eyebrow: "Scene 05 · The build",
    title: "You handle communication. I handle development. We deliver together.",
    body: "One project. Two synchronized timelines.",
  },
  {
    id: "split",
    label: "Share",
    eyebrow: "Scene 06 · The split",
    title: "60 / 40",
    body: "Project revenue divides by responsibility: 60% development and delivery, 40% interviews, client communication, and coordination.",
    closing: "Different responsibilities. Shared results.",
    disclaimer:
      "Figures are illustrative only — not guaranteed earnings. Payment basis and expenses must be agreed in advance.",
  },
  {
    id: "invite",
    label: "Chair",
    eyebrow: "Scene 07 · Your chair",
    title: "Your English. My code. Our next opportunity.",
    line1: "YOUR ENGLISH.",
    line2: "MY CODE.",
    line3: "OUR NEXT OPPORTUNITY.",
    body: "Let's explore whether we can build a long-term international software partnership together.",
    cta: "Become a partner",
  },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

export const SIGNAL_FORMS: Record<
  SceneId,
  { label: string; form: string }
> = {
  threshold: { label: "01", form: "Notification" },
  partner: { label: "02", form: "Connection" },
  markets: { label: "03", form: "Route" },
  interview: { label: "04", form: "Call link" },
  delivery: { label: "05", form: "Timeline" },
  split: { label: "06", form: "Revenue" },
  invite: { label: "07", form: "Your chair" },
};

export const ROLE_CREDITS = {
  technical: {
    title: "Developer — me",
    lines: [
      "Frontend & backend engineering",
      "Architecture & problem solving",
      "Interview preparation support",
      "Implementation & testing",
      "Project delivery",
    ],
  },
  communication: {
    title: "Communication partner — you",
    lines: [
      "Confident English communication",
      "Interviews & client meetings",
      "Relationship management",
      "Requirements & coordination",
      "Local + international search",
    ],
  },
} as const;

export const MARKET_BEATS = [
  {
    id: "us",
    index: "01",
    title: "United States",
    detail: "Primary focus — remote software contracts under authorized terms.",
  },
  {
    id: "uk",
    index: "02",
    title: "United Kingdom",
    detail: "Primary focus — remote software contracts under authorized terms.",
  },
  {
    id: "home",
    index: "03",
    title: "Your home country",
    detail: "Local language fit and opportunities that match how you already work.",
  },
  {
    id: "world",
    index: "04",
    title: "Worldwide",
    detail: "Other remote projects wherever collaboration is clean and legal.",
  },
] as const;

export const ILLUSTRATIVE_LISTINGS = [
  {
    id: "us-1",
    market: "US · Remote",
    title: "Web application team (illustrative)",
    note: "Fictional example used for this film — not a live opening",
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
    label: "01 · Review",
    detail: "We read the opportunity and mark communication vs technical work.",
  },
  {
    id: "tech",
    label: "02 · Technical ground",
    detail: "I translate architecture into plain talking points.",
  },
  {
    id: "practice",
    label: "03 · Practice",
    detail: "You rehearse. I stress-test hard technical questions.",
  },
  {
    id: "roles",
    label: "04 · Agree roles",
    detail: "Before any call, we agree who speaks to what — and stay truthful.",
  },
] as const;

export const INTERVIEW_FLOW = [
  { id: "prepare", label: "Prepare" },
  { id: "connect", label: "Connect" },
  { id: "discuss", label: "Discuss" },
  { id: "agree", label: "Agree" },
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
    detail: "Explanations, architecture context, rehearsal.",
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

export const DEV_PIPELINE = [
  "Architecture",
  "Code",
  "Test",
  "Fix",
  "Deliver",
] as const;

export const PARTNER_PIPELINE = [
  "Requirements",
  "Meetings",
  "Updates",
  "Feedback",
  "Approval",
] as const;

export const APPLY_FIELDS = {
  honestyLabel:
    "I agree that profiles, interviews, and client agreements must represent our roles honestly.",
  noGuaranteeLabel:
    "I understand opportunities are not guaranteed and any engagement depends on mutual fit, authorization, and agreement.",
  submitLabel: "Become a partner",
  arrangement:
    "Proposed arrangement: I handle software engineering, architecture, implementation, testing, and delivery. You lead interviews, client communication, and coordination. Proposed share is 60% development / 40% communication.",
} as const;

export const ENGLISH_CONFIDENCE = [
  { value: "conversational", label: "Conversational" },
  { value: "professional", label: "Professional" },
  { value: "native-level", label: "Native-level" },
] as const;

export const OPPORTUNITY_INTERESTS = [
  { value: "us-uk", label: "US & UK remote contracts (primary)" },
  { value: "local", label: "My home-country opportunities" },
  { value: "global", label: "Other worldwide remote projects" },
] as const;
