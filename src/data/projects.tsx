import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

// Renders a brand SVG as a monochrome glyph that inherits the surrounding
// text color (the skill dock styles every icon via currentColor).
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({
  live,
  repo,
  liveLabel = "Visit Website",
}: {
  live?: string;
  repo?: string;
  liveLabel?: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            {liveLabel}
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

// Brand chips — local mono SVGs live in /public/assets/logos; a couple of
// brands not shipped in that set (AWS, Nginx, WebRTC, Cloudinary) fall back
// to Simple Icons over CDN, used the same way via MaskIcon.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const brandUrl = (title: string, url: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={url} title={title} />,
});

const PROJECT_SKILLS = {
  react: brand("React.js", "react-mono.svg"),
  node: brand("Node.js", "nodedotjs-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  mongo: brand("MongoDB", "mongodb-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  supabase: brand("Supabase", "supabase-mono.svg"),
  redis: brand("Redis", "redis-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  sockerio: brand("Socket.IO", "socketdotio-mono.svg"),
  // Not in the local logo set — Simple Icons CDN mono glyphs.
  aws: brandUrl("AWS", "https://cdn.simpleicons.org/amazonaws"),
  nginx: brandUrl("Nginx", "https://cdn.simpleicons.org/nginx"),
  webrtc: brandUrl("WebRTC", "https://cdn.simpleicons.org/webrtc"),
  cloudinary: brandUrl("Cloudinary", "https://cdn.simpleicons.org/cloudinary"),
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
  liveLabel?: string;
};

/** Plain list items shown above the project cards (no image previews). */
export type ProjectHighlight = {
  id: string;
  label: string;
  detail: string;
  href?: string;
};

export const projectHighlights: ProjectHighlight[] = [
  {
    id: "patent-stress-pain",
    label: "Published Patent",
    detail:
      "System and Method for Stress and Pain Detection Using Multi-Scale Transformer-Based Neural Networks — Application No. 202641065281",
  },
  {
    id: "rag-chatbot",
    label: "RAG Chatbot",
    detail:
      "Document-grounded Retrieval-Augmented Generation pipelines with LangChain, vector search, and LLMs — including production RAG work that cut inference latency by ~40%.",
  },
  {
    id: "researchpilot",
    label: "Ongoing Project — ResearchPilot",
    detail:
      "AI-powered research intelligence platform combining fine-tuned LLMs, Retrieval-Augmented Generation (RAG), semantic search, and machine learning for paper analysis, abstract enhancement, statistical recommendations, and research gap discovery.",
  },
];

const projects: Project[] = [
  {
    id: "unitalks",
    category: "Real-time chat platform",
    title: "UniTalks",
    src: "/unitalks.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.webrtc],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.sockerio,
        PROJECT_SKILLS.redis,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.aws,
        PROJECT_SKILLS.nginx,
      ],
    },
    live: "https://drive.google.com/file/d/1SqRir59yfuxH8-fJdJNGHX07SGyiVH16/view?usp=sharing",
    liveLabel: "View Video",
    // Under development — demo via video
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An anonymous, real-time chat platform built for scale — voice,
            video, and 1,000+ concurrent connections.
          </TypographyP>
          <TypographyP className="font-mono ">
            A full-stack anonymous real-time chat platform integrating WebRTC
            voice/video, Redis session state, and an Nginx reverse proxy on
            AWS EC2 to support 1,000+ concurrent connections.
          </TypographyP>
          <ProjectsLinks
            live={this.live}
            repo={this.github}
            liveLabel={this.liveLabel}
          />

          <TypographyH3 className="my-4 mt-8">
            Scaling &amp; deployment
          </TypographyH3>
          <p className="font-mono mb-2">
            Scales horizontally via Redis Pub/Sub, so multiple server
            instances can share presence and session state. Containerized
            with Docker Compose and deployed through a GitHub Actions CI/CD
            pipeline, cutting deployment time by 75%. Load-tested at 150+
            concurrent users to validate real-world performance under load.
          </p>
        </div>
      );
    },
  },
  {
    id: "baansinfra",
    category: "Portfolio & lead-generation platform",
    title: "Baansinfra",
    src: "/baansinfra.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react, PROJECT_SKILLS.tailwind],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.supabase,
        PROJECT_SKILLS.postgres,
      ],
    },
    live: "https://baansinfra.com",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A project portfolio and lead-generation platform for a bamboo
            construction and architecture firm.
          </TypographyP>
          <TypographyP className="font-mono ">
            Led full-stack development of baansinfra.com at ASSANJ, spanning
            residential, hospitality, and institutional builds — from backend
            architecture to the responsive frontend.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Backend &amp; project categorization
          </TypographyH3>
          <p className="font-mono mb-2">
            Architected the backend with Supabase (PostgreSQL, Auth) to power
            enquiry management and dynamic project categorization across
            build types, backed by a responsive React frontend integrated
            with Node.js services.
          </p>
        </div>
      );
    },
  },
  {
    id: "aurahonda",
    category: "Automotive dealership platform",
    title: "AuraHonda",
    src: "/aurahonda.png",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.react],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.mongo,
        PROJECT_SKILLS.cloudinary,
        PROJECT_SKILLS.aws,
      ],
    },
    live: "https://aurahonda.com",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A full-stack automotive dealership platform — built solo, end to
            end.
          </TypographyP>
          <TypographyP className="font-mono ">
            Sole developer of aurahonda.com, with inventory management, lead
            capture, and an integrated enquiry system for showroom
            operations.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">
            Admin dashboard &amp; secure API
          </TypographyH3>
          <p className="font-mono mb-2">
            Built a CMS-style admin dashboard with Cloudinary media pipelines
            for inventory imagery, backed by a secure REST API with RBAC,
            server-side filtering, and zero-downtime CI/CD deployments on
            AWS S3/EC2.
          </p>
        </div>
      );
    },
  },
];
export default projects;
