export type ProjectIndexItem = {
  slug: string;
  title: string;
  tagline: string;
  tags?: string[];
  year?: number;
  coverImage?: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  audience?: string;
  problem?: string;
  features: string[];
  techStack: string[];
  screenshots: { src: string; alt?: string; caption?: string }[];
  demo?: { live?: string; video?: string };
  architecture?: { image: string; description?: string };
  challenges?: string[];
  learnings?: string[];

  installation?: string[];
  role?: string;
  contributions?: string[];
  links?: { live?: string; repo?: string; docs?: string; contact?: string };
  tags?: string[];
  year?: number;
  coverImage?: string;
  // Added fields to support README mapping
  useCases?: string[];
  faq?: { q: string; a: string }[];
};

export async function getProjectsIndex(): Promise<readonly ProjectIndexItem[]> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(
      process.cwd(),
      "public/data/projects/index.json"
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent) as ProjectIndexItem[];
    return data;
  } catch (error) {
    console.error("Failed to load projects index:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(
      process.cwd(),
      `public/data/projects/${slug}.json`
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent) as Project;
    return data;
  } catch (error) {
    console.error(`Failed to load project ${slug}:`, error);
    return null;
  }
}
