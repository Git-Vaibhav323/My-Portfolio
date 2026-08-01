const config = {
  title: "Vaibhav Dwivedi | Full-Stack Developer & AI/ML Engineer",
  description: {
    long: "Explore the portfolio of Vaibhav Dwivedi, a full-stack developer and AI/ML engineer building GenAI applications, RAG pipelines, and scalable web platforms. Discover my latest work, including UniTalks, Baansinfra, and AuraHonda. Let's build something amazing together!",
    short:
      "Discover the portfolio of Vaibhav Dwivedi, a full-stack developer and AI/ML engineer building GenAI apps and production-grade web platforms.",
  },
  keywords: [
    "Vaibhav Dwivedi",
    "portfolio",
    "full-stack developer",
    "AI/ML engineer",
    "web development",
    "RAG pipelines",
    "LangChain",
    "UniTalks",
    "Baansinfra",
    "AuraHonda",
    "web design",
    "React",
    "Next.js",
    "Node.js",
    "Python",
  ],
  author: "Vaibhav Dwivedi",
  email: "vaibhavpw2024@gmail.com",
  // TODO: swap in your real deployed domain once you have one
  site: "https://vaibhavdwivedi.dev",

  // for github stars button
  githubUsername: "Git-Vaibhav323",
  githubRepo: "My-Portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    linkedin: "https://www.linkedin.com/in/vaibhav-dwivedi-64bds",
    github: "https://github.com/Git-Vaibhav323",
  },
};
export { config };
