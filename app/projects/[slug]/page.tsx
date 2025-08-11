import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Github, Globe } from "lucide-react"
import SiteHeader from "@/components/site-header"
import ProjectDetail from "@/components/project-detail"
import { getProjectBySlug, getProjectsIndex } from "@/lib/projects"
import { Button } from "@/components/ui/button"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const items = await getProjectsIndex()
  return items.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: "Project not found" }
  return {
    title: `${project.title} – Build-My-Own-X`,
    description: project.tagline || project.description?.slice(0, 140),
    openGraph: {
      title: project.title,
      description: project.tagline || project.description,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  }
}

export default async function ProjectPage(props: PageProps) {
  const { slug } = await props.params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main className="min-h-[100dvh]">
      <SiteHeader />
      <section className="container mx-auto px-4 py-6 sm:py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to all projects
          </Link>
        </nav>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          {project.links?.repo ? (
            <Button asChild variant="outline" size="sm">
              <Link href={project.links.repo} target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Repository
              </Link>
            </Button>
          ) : null}
          {project.links?.live ? (
            <Button asChild variant="outline" size="sm">
              <Link href={project.links.live} target="_blank" rel="noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          ) : null}
          {project.links?.docs ? (
            <Button asChild variant="outline" size="sm">
              <Link href={project.links.docs} target="_blank" rel="noreferrer">
                Documentation
              </Link>
            </Button>
          ) : null}
        </div>

        <ProjectDetail project={project} />
      </section>
    </main>
  )
}
