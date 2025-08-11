import Image from "next/image";
import Section from "./section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Project } from "@/lib/projects";

const defaultProject: Project = {
  slug: "example",
  title: "Example Project",
  tagline: "One-liner explaining what it does",
  description:
    "A longer description of what the project is, who it's for, and the benefits.",
  audience: "Engineers, researchers, and curious builders",
  problem: "Understanding system internals is hard without building.",
  features: ["Feature A", "Feature B", "Feature C"],
  techStack: ["Next.js", "Tailwind CSS", "Node.js", "SQLite"],
  screenshots: [
    {
      src: "/feature-screenshot-1.png",
      alt: "Feature screenshot 1",
      caption: "Main dashboard",
    },
  ],
  demo: { live: "#" },
  architecture: {
    image: "/high-level-architecture.png",
    description: "A high-level overview of the system components.",
  },
  challenges: ["Scaling X", "Designing Y"],
  learnings: ["Learned Z"],

  installation: ["Clone repo", "Install dependencies", "Run dev server"],
  role: "Solo builder",
  contributions: ["Everything"],
  links: { live: "#", repo: "#", docs: "#" },
  tags: ["demo"],
  year: new Date().getFullYear(),
  coverImage: "/abstract-project-cover.png",
  useCases: ["Use case A", "Use case B"],
  faq: [{ q: "What is this?", a: "An example FAQ." }],
};

function Screenshot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt?: string;
  caption?: string;
}) {
  const isRemote = src.startsWith("http");
  return (
    <figure className="space-y-2">
      <div className="relative aspect-[16/9] overflow-hidden rounded-md border">
        {isRemote ? (
          // For remote images, use a standard img tag to avoid domain config issues.
          // You explicitly asked to embed some images via their Source URL.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src || "/placeholder.svg"}
            alt={alt || "Project screenshot"}
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={src || "/placeholder.svg"}
            alt={alt || "Project screenshot"}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
      {caption ? (
        <figcaption className="text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function ProjectDetail({
  project = defaultProject,
}: {
  project?: Project;
}) {
  return (
    <article className="space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {project.title}
          </h1>
          {project.year ? (
            <span className="text-sm text-muted-foreground">
              · {project.year}
            </span>
          ) : null}
        </div>
        {project.tagline ? (
          <p className="text-muted-foreground">{project.tagline}</p>
        ) : null}
        {project.tags?.length ? (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        ) : null}
        {project.coverImage ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border">
            <Image
              src={project.coverImage || "/placeholder.svg"}
              alt={`${project.title} cover`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </div>
        ) : null}
      </div>

      {/* Description */}
      <Section title="Description">
        <div className="prose prose-sm sm:prose-base max-w-none">
          <p>{project.description}</p>
          {project.audience ? (
            <p className="text-muted-foreground mt-2">
              {"Audience: "}
              {project.audience}
            </p>
          ) : null}
        </div>
      </Section>

      {/* Problem */}
      {project.problem ? (
        <Section title="Problem Statement">
          <p className="text-sm sm:text-base text-muted-foreground">
            {project.problem}
          </p>
        </Section>
      ) : null}

      {/* Features */}
      {project.features?.length ? (
        <Section title="Features / Highlights">
          <ul className="list-disc pl-5 space-y-1">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Tech Stack */}
      {project.techStack?.length ? (
        <Section title="Tech Stack">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Use Cases */}
      {project.useCases?.length ? (
        <Section title="Use Cases">
          <ul className="list-disc pl-5 space-y-1">
            {project.useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Screenshots / Demo */}
      {project.screenshots?.length ? (
        <Section title="Screenshots / Demo">
          <div className="grid gap-4 sm:grid-cols-2">
            {project.screenshots.map((s) => (
              <Screenshot
                key={s.src}
                src={s.src}
                alt={s.alt}
                caption={s.caption}
              />
            ))}
          </div>
        </Section>
      ) : null}

      {/* Architecture */}
      {project.architecture?.image ? (
        <Section
          title="Architecture & Workflow"
          description={project.architecture.description}
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-md border">
            <Image
              src={project.architecture.image || "/placeholder.svg"}
              alt={"High-level architecture diagram"}
              fill
              sizes="100vw"
              className="object-contain bg-muted"
            />
          </div>
        </Section>
      ) : null}

      {/* Challenges & Learnings */}
      {project.challenges?.length || project.learnings?.length ? (
        <Section title="Challenges & Learnings">
          {project.challenges?.length ? (
            <>
              <h3 className="text-sm font-medium">Challenges</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                {project.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          ) : null}
          {project.learnings?.length ? (
            <>
              <h3 className="text-sm font-medium">Learnings</h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.learnings.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </>
          ) : null}
        </Section>
      ) : null}

      {/* FAQ */}
      {project.faq?.length ? (
        <Section title="Quick Q&A">
          <Accordion type="single" collapsible className="w-full">
            {project.faq.map((item, idx) => (
              <AccordionItem key={`${item.q}-${idx}`} value={`faq-${idx}`}>
                <AccordionTrigger className="text-left">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      ) : null}

      {/* Installation */}
      {project.installation?.length ? (
        <Section title="How to Use / Installation">
          <ol className="list-decimal pl-5 space-y-1">
            {project.installation.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </Section>
      ) : null}

      {/* Role & Contributions */}
      {project.role || project.contributions?.length ? (
        <Section title="Your Role & Contributions">
          {project.role ? <p className="mb-2">{project.role}</p> : null}
          {project.contributions?.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {project.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          ) : null}
        </Section>
      ) : null}

      {/* Links */}
      {project.links ? (
        <Section title="Links & Contact">
          <ul className="list-disc pl-5 space-y-1">
            {project.links.live ? (
              <li>
                <a
                  className="underline"
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live site
                </a>
              </li>
            ) : null}
            {project.links.repo ? (
              <li>
                <a
                  className="underline"
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub repo
                </a>
              </li>
            ) : null}
            {project.links.docs ? (
              <li>
                <a
                  className="underline"
                  href={project.links.docs}
                  target="_blank"
                  rel="noreferrer"
                >
                  Documentation
                </a>
              </li>
            ) : null}
            {project.links.contact ? (
              <li>
                <a
                  className="underline"
                  href={project.links.contact}
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact
                </a>
              </li>
            ) : null}
          </ul>
        </Section>
      ) : null}
    </article>
  );
}
