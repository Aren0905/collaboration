/** Photoreal film plates for THE CONNECTION. */
export const FILM_ASSETS = {
  developerNight: {
    src: "/images/dev-night-24.jpg",
    alt: "Aaron, a 24-year-old software developer, working late in a navy sweatshirt at his desk",
    width: 1920,
    height: 1080,
  },
  emptyChair: {
    src: "/images/dev-empty-24.jpg",
    alt: "Developer workspace with an empty second chair for a communication partner",
    width: 1920,
    height: 1080,
  },
  partnerDay: {
    src: "/images/partner-english-man.jpg",
    alt: "English-speaking male communication partner in a bright daylight home office",
    width: 1920,
    height: 1080,
  },
  worldMap: {
    src: "/images/world-map-signal.jpg",
    alt: "Cinematic world map with United States and United Kingdom illuminated",
    width: 1920,
    height: 1080,
  },
  interview: {
    src: "/images/partner-english-man.jpg",
    alt: "English-speaking male communication partner prepared for a professional video interview",
    width: 1920,
    height: 1080,
  },
  coding: {
    src: "/images/dev-coding-24.jpg",
    alt: "Aaron coding a web application in a charcoal hoodie at dual monitors",
    width: 1920,
    height: 1080,
  },
  sharedProject: {
    src: "/images/shared-dual-24.jpg",
    alt: "Developer and communication partner workspaces linked by one project Signal",
    width: 1920,
    height: 1080,
  },
  invitation: {
    src: "/images/your-chair-24.jpg",
    alt: "Empty visitor chair between the developer and communication partner",
    width: 1920,
    height: 1080,
  },
  portraitAaron: {
    src: "/images/ref/aaron.jpg",
    alt: "Portrait of Aaron, software developer",
    width: 800,
    height: 1000,
  },
} as const;

/** Fictional example project used as the film’s through-line. */
export const EXAMPLE_PROJECT = {
  label: "Illustrative example · not a live opening",
  client: "US-based product team",
  title: "Remote web application build",
  scope: "Small software team · transparent collaboration",
} as const;
