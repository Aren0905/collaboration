/**
 * One fictional project that persists across every film event.
 * Marked illustrative — not a live opening.
 */
export const STORY_PROJECT = {
  id: "senior-fullstack-us",
  label: "Illustrative job posting · not a live opening",
  market: "REMOTE FULL-STACK DEVELOPER · UNITED STATES",
  client: "Northline Labs (US tech company)",
  title: "Senior Full-Stack Developer",
  summary:
    "We are looking for an experienced Full-Stack Developer to join our remote engineering team. You will build and maintain modern web applications, develop scalable backend services, integrate APIs, and collaborate with product and engineering teams.",
  stack: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "AWS"
  ] as const,
  budgetExample: 130000,
  duration: "Full-Time · 100% Remote",
  recruiter: {
    name: "Jordan Hale",
    role: "Technical Recruiter",
    company: "Northline Labs",
  },
  partner: {
    name: "You",
    role: "Communication partner",
  },
  developer: {
    name: "Aaron",
    role: "Software developer",
  },
  changeRequest: {
    from: "Jordan Hale · Northline Labs",
    message: "Could we also add a customer activity filter?",
    clarified:
      "Filter customers by last activity window: 7 / 30 / 90 days.",
    implemented: "Activity filter shipped on the Customers view.",
    approved: "Looks good — approved. Let's proceed to delivery.",
  },
} as const;

export const INTERVIEW_CAPTIONS = [
  {
    id: "ring",
    speaker: "System",
    text: "Incoming call · Northline Labs",
  },
  {
    id: "join",
    speaker: "Partner",
    text: "Thanks for joining.",
  },
  {
    id: "tech",
    speaker: "Aaron",
    text: "Tell me about yourself",
  },
  {
    id: "agree",
    speaker: "Jordan",
    text: "I am AI Full Stack Engineer with 8 year of experience in building scalable and efficient web applications."
  },
] as const;

export const BUILD_STEPS = [
  { id: "blank", label: "Blank canvas", detail: "Scaffold ready" },
  { id: "nav", label: "Navigation", detail: "Sidebar + routes" },
  { id: "table", label: "Customer table", detail: "List + search" },
  { id: "charts", label: "Charts", detail: "Activity trends" },
  { id: "test", label: "Testing", detail: "Checks passing" },
] as const;

export const CODE_LINES = [
  "export function CustomersPage() {",
  "  const rows = useCustomers({ range });",
  "  return (",
  "    <DashboardShell title=\"Customers\">",
  "      <ActivityFilter value={range} onChange={setRange} />",
  "      <CustomerTable rows={rows} />",
  "      <ActivityChart series={rows} />",
  "    </DashboardShell>",
  "  );",
  "}",
] as const;

export const DASHBOARD_CUSTOMERS = [
  { id: "c1", name: "Avery Chen", company: "Brightline Co", activity: 3, plan: "Pro" },
  { id: "c2", name: "Sam Ortega", company: "Harbor Soft", activity: 18, plan: "Team" },
  { id: "c3", name: "Riley Moss", company: "Northwind", activity: 42, plan: "Starter" },
  { id: "c4", name: "Jordan Lee", company: "Cascade Ops", activity: 7, plan: "Pro" },
  { id: "c5", name: "Casey Quinn", company: "Lumen Studio", activity: 61, plan: "Team" },
] as const;
