// ─────────────────────────────────────────────────────────────
//  CONTENT — edit this file to make the portfolio your own.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Alex Morgan',
  handle: 'alexmorgan',
  roles: ['Full-stack engineer', 'Creative developer', '3D web enthusiast', 'Systems tinkerer'],
  tagline: 'I build fast, beautiful software and make it feel alive in 3D.',
  location: 'Remote · UTC',
  email: 'hello@example.com',
  availability: 'Open to freelance & full-time roles',
  resumeUrl: '#',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'X / Twitter', href: 'https://x.com/' },
  ],
};

export const stats = [
  { value: 6, suffix: '+', label: 'Years building for the web' },
  { value: 40, suffix: '+', label: 'Products shipped' },
  { value: 18, suffix: 'M', label: 'Users reached' },
  { value: 99, suffix: '%', label: 'Lighthouse perf target' },
];

export type SkillNode = { name: string; level: number; ring: 0 | 1 | 2; color: string };

// Rings drive the 3D orbit: inner (0) → outer (2)
export const skills: SkillNode[] = [
  { name: 'TypeScript', level: 95, ring: 0, color: '#3178c6' },
  { name: 'React', level: 95, ring: 0, color: '#61dafb' },
  { name: 'Node.js', level: 90, ring: 0, color: '#86c94a' },
  { name: 'Three.js', level: 88, ring: 1, color: '#ffffff' },
  { name: 'GLSL', level: 75, ring: 1, color: '#c36bff' },
  { name: 'PostgreSQL', level: 85, ring: 1, color: '#5aa7d6' },
  { name: 'Python', level: 80, ring: 1, color: '#ffd43b' },
  { name: 'Docker', level: 82, ring: 2, color: '#2496ed' },
  { name: 'AWS', level: 80, ring: 2, color: '#ff9900' },
  { name: 'GraphQL', level: 78, ring: 2, color: '#e535ab' },
  { name: 'Rust', level: 65, ring: 2, color: '#f74c00' },
];

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  year: string;
  accent: string;
  href: string;
  metric: string;
};

export const projects: Project[] = [
  {
    title: 'Orbital Analytics',
    summary: 'Real-time telemetry dashboard rendering 2M+ data points per second with a WebGL instancing pipeline.',
    tags: ['React', 'WebGL', 'Rust/WASM'],
    year: '2025',
    accent: '#22d3ee',
    href: '#',
    metric: '2M pts/s',
  },
  {
    title: 'Neon Commerce',
    summary: 'Headless storefront with 3D product configurators, edge rendering and sub-second page loads.',
    tags: ['Next.js', 'R3F', 'Stripe'],
    year: '2024',
    accent: '#a78bfa',
    href: '#',
    metric: '-62% TTI',
  },
  {
    title: 'Pulse Realtime',
    summary: 'Multiplayer collaboration engine with CRDT-based sync and offline-first conflict resolution.',
    tags: ['Node.js', 'CRDT', 'PostgreSQL'],
    year: '2024',
    accent: '#a3e635',
    href: '#',
    metric: '<40ms sync',
  },
  {
    title: 'Vault Edge',
    summary: 'Zero-trust secrets platform deployed across 30 edge regions with automated key rotation.',
    tags: ['Go', 'Docker', 'AWS'],
    year: '2023',
    accent: '#f472b6',
    href: '#',
    metric: '30 regions',
  },
];

export const experience = [
  {
    period: '2023 — Now',
    role: 'Senior Frontend Engineer',
    company: 'Nebula Labs',
    points: ['Led the WebGL rendering platform used by 3M+ monthly users.', 'Mentored a team of 6 across 3 time zones.'],
  },
  {
    period: '2021 — 2023',
    role: 'Full-stack Engineer',
    company: 'Quantum Foundry',
    points: ['Shipped a realtime collaboration suite from zero to GA.', 'Cut API p95 latency by 45% with caching and query tuning.'],
  },
  {
    period: '2019 — 2021',
    role: 'Software Developer',
    company: 'Pixel Harbor',
    points: ['Built interactive marketing sites and design-system tooling.', 'Introduced automated visual regression testing.'],
  },
];
