// thoda zada ts ho gya idhar
export enum SkillNames {
  JS = "js",
  TS = "ts",
  PYTHON = "python",
  JAVA = "java",
  C = "c",
  REACT = "react",
  NEXTJS = "nextjs",
  VUE = "vue",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  FIREBASE = "firebase",
  DOCKER = "docker",
  GIT = "git",
  GITHUB = "github",
  NPM = "npm",
  LINUX = "linux",
  NGINX = "nginx",
  AWS = "aws",
  GCP = "gcp",
  VERCEL = "vercel",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  /** Invert black logos so they stay visible on a dark background */
  invertOnDark?: boolean;
};

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "yeeting code into the DOM since '95, no cap! 💯🚀",
    color: "#f0db4f",
    icon: `${D}/javascript/javascript-original.svg`,
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "JavaScript's overachieving cousin who's always flexing 💯🔒",
    color: "#007acc",
    icon: `${D}/typescript/typescript-original.svg`,
  },
  [SkillNames.PYTHON]: {
    id: 3,
    name: "python",
    label: "Python",
    shortDescription: "indentation as a religion, and honestly? valid. 🐍✨",
    color: "#3776ab",
    icon: `${D}/python/python-original.svg`,
  },
  [SkillNames.JAVA]: {
    id: 4,
    name: "java",
    label: "Java",
    shortDescription: "write once, debug everywhere — still shipping though ☕",
    color: "#ed8b00",
    icon: `${D}/java/java-original.svg`,
  },
  [SkillNames.C]: {
    id: 5,
    name: "c",
    label: "C",
    shortDescription: "pointers, segfaults, and character development 🧠",
    color: "#a8b9cc",
    icon: `${D}/c/c-original.svg`,
  },
  [SkillNames.REACT]: {
    id: 6,
    name: "react",
    label: "React",
    shortDescription: `"use using" 
using use = useUsing("use")`,
    color: "#61dafb",
    icon: `${D}/react/react-original.svg`,
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "the drama queen of front-end frameworks, and we stan! 👑📜",
    color: "#fff",
    icon: `${D}/nextjs/nextjs-original.svg`,
    invertOnDark: true,
  },
  [SkillNames.VUE]: {
    id: 8,
    name: "vue",
    label: "Vue",
    shortDescription:
      "the chill pill for your frontend, it hits different! 🟢😌",
    color: "#41b883",
    icon: `${D}/vuejs/vuejs-original.svg`,
  },
  [SkillNames.TAILWIND]: {
    id: 9,
    name: "tailwind",
    label: "Tailwind",
    shortDescription: "utility classes hitting different fr fr 🌪️🔥",
    color: "#38bdf8",
    icon: `${D}/tailwindcss/tailwindcss-original.svg`,
  },
  [SkillNames.NODEJS]: {
    id: 10,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript said 'sike, I'm backend now', deadass! 🔙🔚",
    color: "#6cc24a",
    icon: `${D}/nodejs/nodejs-original.svg`,
  },
  [SkillNames.EXPRESS]: {
    id: 11,
    name: "express",
    label: "Express",
    shortDescription: "middlewares go dummy hard, no cap! 🚂💨",
    color: "#fff",
    icon: `${D}/express/express-original.svg`,
    invertOnDark: true,
  },
  [SkillNames.POSTGRES]: {
    id: 12,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "SQL but make it fashion, purr 💅🐘",
    color: "#336791",
    icon: `${D}/postgresql/postgresql-original.svg`,
  },
  [SkillNames.MONGODB]: {
    id: 13,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "flexin' with that NoSQL drip, respectfully! 💪🍃",
    color: "#47a248",
    icon: `${D}/mongodb/mongodb-original.svg`,
  },
  [SkillNames.FIREBASE]: {
    id: 14,
    name: "firebase",
    label: "Firebase",
    shortDescription:
      "your app's ultimate wingman, but watch out, vendor lock-in vibes! 🔥👌",
    color: "#ffca28",
    icon: `${D}/firebase/firebase-original.svg`,
  },
  [SkillNames.DOCKER]: {
    id: 15,
    name: "docker",
    label: "Docker",
    shortDescription: "The best containerization! 🐳🔥",
    color: "#2496ed",
    icon: `${D}/docker/docker-original.svg`,
  },
  [SkillNames.GIT]: {
    id: 16,
    name: "git",
    label: "Git",
    shortDescription: "the code's personal bodyguard, no cap! 🕵️‍♂️🔄",
    color: "#f1502f",
    icon: `${D}/git/git-original.svg`,
  },
  [SkillNames.GITHUB]: {
    id: 17,
    name: "github",
    label: "GitHub",
    shortDescription: "sliding into those pull requests, IYKYK! 🐙",
    color: "#fff",
    icon: "https://cdn.simpleicons.org/github/FFFFFF",
  },
  [SkillNames.NPM]: {
    id: 18,
    name: "npm",
    label: "NPM",
    shortDescription: "package manager said 'I gotchu fam', period! 📦💯",
    color: "#cb3837",
    icon: `${D}/npm/npm-original-wordmark.svg`,
  },
  [SkillNames.LINUX]: {
    id: 19,
    name: "linux",
    label: "Linux",
    shortDescription: "where 'chmod 777' is the ultimate flex 🔓🙌",
    color: "#fcc624",
    icon: `${D}/linux/linux-original.svg`,
  },
  [SkillNames.NGINX]: {
    id: 20,
    name: "nginx",
    label: "Nginx",
    shortDescription: "reverse proxy go zoom zoom, sheesh! 🚗💨",
    color: "#009639",
    icon: `${D}/nginx/nginx-original.svg`,
  },
  [SkillNames.AWS]: {
    id: 21,
    name: "aws",
    label: "AWS",
    shortDescription:
      "always extra, making everything more complicated, period! 🌐👨‍💻",
    color: "#ff9900",
    icon: `${D}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  },
  [SkillNames.GCP]: {
    id: 22,
    name: "gcp",
    label: "Google Cloud",
    shortDescription:
      "cloud computing but make it Google vibes, living rent free! ☁️🔥",
    color: "#4285f4",
    icon: `${D}/googlecloud/googlecloud-original.svg`,
  },
  [SkillNames.VERCEL]: {
    id: 23,
    name: "vercel",
    label: "Vercel",
    shortDescription:
      "The triangle company, helps you deploy and go touch grass! 🚀🌿",
    color: "#fff",
    icon: `${D}/vercel/vercel-original.svg`,
    invertOnDark: true,
  },
};

/** Display order for the tech stack grid. */
export const SKILL_GROUPS: { title: string; skills: SkillNames[] }[] = [
  {
    title: "Languages",
    skills: [
      SkillNames.JS,
      SkillNames.TS,
      SkillNames.PYTHON,
      SkillNames.JAVA,
      SkillNames.C,
    ],
  },
  {
    title: "Frontend",
    skills: [
      SkillNames.REACT,
      SkillNames.NEXTJS,
      SkillNames.VUE,
      SkillNames.TAILWIND,
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      SkillNames.NODEJS,
      SkillNames.EXPRESS,
      SkillNames.POSTGRES,
      SkillNames.MONGODB,
      SkillNames.FIREBASE,
    ],
  },
  {
    title: "Tooling",
    skills: [
      SkillNames.GIT,
      SkillNames.GITHUB,
      SkillNames.NPM,
      SkillNames.DOCKER,
      SkillNames.LINUX,
    ],
  },
  {
    title: "Cloud & Infra",
    skills: [
      SkillNames.AWS,
      SkillNames.GCP,
      SkillNames.VERCEL,
      SkillNames.NGINX,
    ],
  },
];

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "May 2026",
    endDate: "Present",
    title: "Full Stack Developer",
    company: "ASSANJ",
    description: [
      "Developing and optimizing full-stack web applications using React, Node.js, and REST APIs; collaborating in an agile, industry-oriented environment to ship features across the complete development lifecycle.",
      "Implementing scalable backend logic, responsive UI components, and streamlined CI/CD workflows for real-world client-facing products; contributing to code reviews and architectural decisions.",
    ],
    skills: [
      SkillNames.REACT,
      SkillNames.NODEJS,
      SkillNames.GIT,
      SkillNames.GITHUB,
      SkillNames.DOCKER,
    ],
  },
  {
    id: 2,
    startDate: "Jan 2026",
    endDate: "March 2026",
    title: "Backend Developer",
    company: "Cestrum",
    description: [
      "Building UniTalks — an anonymous real-time chat platform with voice/video via WebRTC, designed to scale to 1,000+ concurrent connections.",
      "Owned backend architecture around Node.js, Socket.IO, and Redis Pub/Sub for distributed session state; containerized services with Docker and deployed behind Nginx on AWS EC2.",
      "Set up GitHub Actions CI/CD to cut deployment time by ~75%; load-tested the stack at 150+ concurrent users to validate performance under real traffic.",
    ],
    skills: [
      SkillNames.NODEJS,
      SkillNames.REACT,
      SkillNames.DOCKER,
      SkillNames.AWS,
      SkillNames.NGINX,
      SkillNames.GIT,
    ],
  },
  {
    id: 3,
    startDate: "Dec 2025",
    endDate: "Feb 2026",
    title: "Generative AI Intern",
    company: "Analytx4t",
    description: [
      "Built production GenAI applications using LLMs, LangChain, and Python; delivered 8 RAG pipelines for document intelligence with vector search and tool-augmented agents.",
      "Reduced inference latency by 40% via chunking and embedding tuning; evaluated 5+ prompt strategies, boosting RAG faithfulness scores by 22% on internal benchmarks.",
    ],
    skills: [SkillNames.PYTHON, SkillNames.GIT, SkillNames.DOCKER],
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
