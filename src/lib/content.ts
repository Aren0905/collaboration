export const SITE = {
  title: "The Connection",
  brandSecondary: "The Other Chair",
  tagline: "One opportunity. Two people. A world of possibilities.",
  email: "aaron.man0905@gmail.com",
  description:
    "I'm a software developer seeking English-speaking partners for international remote software work—especially US and UK. We manage outreach accounts together with your approval. You lead interviews. I build. We share 60/40.",
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
    body: "I'm looking for English-speaking partners to pursue international remote software opportunities, especially in the US and UK. We can work together to secure jobs and share the earnings.",
    cue: "Scroll to follow the opportunity",
    splitHint: "Developer 60% · Partner 40%",
    cta: "See how we work",
  },
  {
    id: "partner",
    label: "Chair",
    eyebrow: "Scene 02 · The empty chair",
    title: "I can build the software.",
    body: "But, I am not able to communicate confidently — who will end up doing this work instead?",
  },
  {
    id: "markets",
    label: "World",
    eyebrow: "Scene 03 · The world opens",
    title: "Your country. US. UK. Worldwide.",
    body: "I find suitable job openings and submit applications on your behalf. When an interview is scheduled, you will attend it yourself, and I will provide the necessary support throughout that process.",
    disclaimer:
      "",
  },
  {
    id: "interview",
    label: "Room",
    eyebrow: "Scene 04 · The interview",
    title: "You lead the interview. I support remotely.",
    body: "Once we join forces, you will take the lead in the conversation. I will prepare technical discussion topics and provide support using a few specific tools.",
  },
  {
    id: "delivery",
    label: "Build",
    eyebrow: "Scene 05 · The build",
    title: "The call becomes the product.",
    body: "Watch the customer dashboard come to life — navigation, table, charts, then tests.",
  },
  {
    id: "change",
    label: "Change",
    eyebrow: "Scene 06 · The change request",
    title: "Then the client asks for one more thing.",
    body: "The partner clarifies. You implement. The client approves. Real partnership is how we handle the unexpected.",
  },
  {
    id: "split",
    label: "Share",
    eyebrow: "Scene 07 · The split",
    title: "60 / 40",
    body: "Project revenue divides by responsibility: 60% development and delivery, 40% outreach, interviews, client communication, and coordination.",
    closing: "Different responsibilities. Shared results.",
    disclaimer:
      "Figures are illustrative only — not guaranteed earnings. Payment basis and expenses must be agreed in advance.",
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
  delivery: { label: "05", form: "IDE" },
  change: { label: "06", form: "Task card" },
  split: { label: "07", form: "Revenue" },
};

/** Shared outreach workflow before an interview is booked. */
export const OUTREACH_STEPS = [
  {
    id: "accounts",
    label: "01 · Accounts",
    detail:
      "We can create your accounts on platforms such as LinkedIn (or other recruitment sites). I setup and manage them remotely.",
  },
  {
    id: "target",
    label: "02 · Target",
    detail:
      "I identify software-related opportunities in the U.S., the U.K., and other regions that align with our situation.",
  },
  {
    id: "apply",
    label: "03 · Apply",
    detail:
      "I can apply and manage your schedule using your company account.",
  },
  {
    id: "interview",
    label: "04 · Interview",
    detail:
      "Once the recruiter schedules a call, you will proceed with the interview. I can help you prepare the technical foundation and provide support using a few tools.",
  },
] as const;

export const MARKET_BEATS = [
  {
    id: "us",
    index: "01",
    title: "United States",
    detail: "Remote software jobs",
  },
  {
    id: "uk",
    index: "02",
    title: "United Kingdom",
    detail: "Remote Software jobs",
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
    title: "Build a customer management dashboard",
    note: "Selected example · illustrative scenario — not a live opening",
    selected: true,
  },
  {
    id: "uk-1",
    market: "UK · Remote",
    title: "Platform engineer · consulting team",
    note: "Illustrative listing — not a live opening",
    selected: false,
  },
] as const;

export const PREP_STEPS = [
  {
    id: "jd",
    label: "01 · Review",
    detail:
      "I review the opportunity from the  account and mark communication vs technical work.",
  },
  {
    id: "tech",
    label: "02 · Technical ground",
    detail: "I translate architecture into plain talking points for you.",
  },
  {
    id: "practice",
    label: "03 · Practice",
    detail: "You rehearse the interview. I stress-test hard technical questions.",
  },
  {
    id: "Meeting",
    label: "interview",
    detail:
      "Please attend the meeting. I will provide support remotely.",
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
    label: "You lead the interview",
    detail:
      "Once the application converts to a call, you run the room in professional English.",
  },
  {
    id: "prep",
    label: "I support remotely",
    detail:
      "Account co-management beforehand, then technical prep and rehearsal for the call.",
  },
  {
    id: "join",
    label: "I join when appropriate",
    detail: "Technical discussions only when the client authorizes it.",
  },
  {
    id: "honesty",
    label: "Honest representation",
    detail:
      "Accounts stay in your name. If asked who codes, we answer plainly. No impersonation.",
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
  "Accounts",
  "Applications",
  "Interviews",
  "Updates",
  "Approval",
] as const;
