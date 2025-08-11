import Link from "next/link";
import { Suspense } from "react";
import { getProjectsIndex, type ProjectIndexItem } from "@/lib/projects";
import SiteHeader from "@/components/site-header";
import ProjectCard from "@/components/project-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function ProjectsGrid() {
  const items = await getProjectsIndex();

  if (!items?.length) {
    return (
      <Card>
        <CardContent className="p-6 text-muted-foreground">
          No projects found. Add JSON files under {"/public/data/projects"} and
          update index.json to see them here.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item: ProjectIndexItem) => (
        <ProjectCard key={item.slug} item={item} />
      ))}
    </div>
  );
}

export default async function Page() {
  return (
    <main className="min-h-[100dvh]">
      <SiteHeader />
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Rebuilding real-world systems from scratch to deeply understand
              how they work.
            </p>
          </div>
          <Link
            href="https://github.com/asimar007/Build-My-Own-X"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:underline"
          >
            View on GitHub
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          }
        >
          <ProjectsGrid />
        </Suspense>
      </section>
    </main>
  );
}
