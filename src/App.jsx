import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./components/hero/Hero.jsx";
import Projects from "./components/projects/Projects.jsx";
import Skills from "./components/skills/Skills.jsx";
import Contact from "./components/contact/Contact.jsx";
import SparkleBackground from "./components/effects/SparkleBackground.jsx";
import MouseTrail from "./components/effects/MouseTrail.jsx";
import { skills } from "./data/skills.js";
import { useActiveSection } from "./hooks/useActiveSection.js";

const sections = ["home", "work", "skills", "contact"];

function validateProjects(data) {
  if (!Array.isArray(data)) {
    throw new Error("The projects.json file must contain a JSON array.");
  }
  const seenIds = new Set();
  data.forEach((project, index) => {
    const validProject =
      project &&
      typeof project.id === "string" &&
      project.id.trim() &&
      typeof project.title === "string" &&
      typeof project.category === "string" &&
      typeof project.status === "string" &&
      typeof project.icon === "string" &&
      typeof project.summary === "string" &&
      typeof project.details === "string" &&
      Array.isArray(project.tags) &&
      project.tags.every((tag) => typeof tag === "string") &&
      Array.isArray(project.links) &&
      project.links.every(
        (link) =>
          link &&
          typeof link.label === "string" &&
          typeof link.href === "string",
      );
    if (!validProject) {
      throw new Error(`Project at position ${index + 1} has an invalid schema.`);
    }
    if (seenIds.has(project.id)) {
      throw new Error(`Duplicate project id "${project.id}" in projects.json.`);
    }
    seenIds.add(project.id);
  });
  return data;
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loadState, setLoadState] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const activeSection = useActiveSection(sections);

  const loadProjects = useCallback(async () => {
    setLoadState("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/projects.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Request for projects.json failed (${response.status}).`);
      }
      const data = await response.json();
      setProjects(validateProjects(data));
      setLoadState("success");
    } catch (error) {
      setProjects([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while loading the project list.",
      );
      setLoadState("error");
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <>
      <SparkleBackground />
      <MouseTrail />
      <Navbar activeSection={activeSection} />
      <main className="relative z-10 mx-auto max-w-[1520px] px-5 pt-28 sm:px-8 lg:px-12">
        <Hero projectCount={loadState === "success" ? projects.length : 0} skillCount={skills.length} />
        <Projects
          projects={projects}
          loadState={loadState}
          errorMessage={errorMessage}
          onRetry={loadProjects}
        />
        <Skills skills={skills} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
