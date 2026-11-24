export const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: "Code2",
    description: "Core languages for systems, algorithms, and application logic",
    skills: [
      { name: "C / C++", note: "Socket programming, networking & systems", icon: "Terminal" },
      { name: "Python", note: "Data processing, ML & automation scripts", icon: "Code2" },
      { name: "Dart", note: "Mobile client application logic", icon: "Smartphone" },
      { name: "Assembly", note: "Processor architecture & registers", icon: "Cpu" },
      { name: "Verilog", note: "Digital logic & hardware description", icon: "Binary" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "Layout",
    description: "Component architectures, reactive interfaces, and mobile clients",
    skills: [
      { name: "React", note: "State architecture & single-page applications", icon: "Atom" },
      { name: "Flutter", note: "Cross-platform mobile interfaces", icon: "Smartphone" },
      { name: "Tailwind CSS", note: "Responsive styling & design tokens", icon: "Palette" },
      { name: "Vite", note: "Modern frontend bundling & fast builds", icon: "Zap" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: "Server",
    description: "Server runtimes, RESTful APIs, and microservices",
    skills: [
      { name: "Node.js", note: "Event-driven JavaScript runtime", icon: "Server" },
      { name: "Express.js", note: "RESTful routing & media streaming", icon: "Layers" },
      { name: "NestJS", note: "Modular TypeScript server framework", icon: "Shield" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "Database",
    description: "Relational, document, and embedded storage solutions",
    skills: [
      { name: "PostgreSQL", note: "Relational schema design & ACID queries", icon: "Database" },
      { name: "MongoDB", note: "Document store for flexible data models", icon: "Database" },
      { name: "SQL", note: "Schema normalization & relational queries", icon: "Database" },
      { name: "Prisma ORM", note: "Type-safe database client & migrations", icon: "Layers" },
      { name: "Hive", note: "Lightweight local mobile key-value store", icon: "HardDrive" },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    icon: "Cloud",
    description: "Containerization, automated deployment pipelines, and cloud hosting",
    skills: [
      { name: "Docker", note: "Multi-service container workflows", icon: "Boxes" },
      { name: "AWS", note: "Cloud hosting & infrastructure services", icon: "Cloud" },
      { name: "CI/CD (Jenkins)", note: "Automated build, test & deploy pipelines", icon: "GitBranch" },
      { name: "Terraform", note: "Declarative infrastructure as code", icon: "Blocks" },
    ],
  },
  {
    id: "tools-platforms",
    title: "Tools & Platforms",
    icon: "Wrench",
    description: "Development environments, version control, and design tools",
    skills: [
      { name: "Git & GitHub", note: "Version control & repository management", icon: "GitBranch" },
      { name: "Unity", note: "Augmented reality & camera tracking", icon: "Box" },
      { name: "Figma", note: "UI/UX wireframing & interactive prototypes", icon: "PenTool" },
      { name: "Firebase", note: "Real-time backend, auth & cloud storage", icon: "Flame" },
    ],
  },
];

// Preserved flat array for counts and backwards compatibility
export const skills = skillCategories.flatMap((group) => group.skills);
