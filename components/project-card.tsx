import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectIndexItem } from "@/lib/projects";

const defaultItem: ProjectIndexItem = {
  slug: "example-project",
  title: "Example Project",
  tagline: "Short one-line description",
  tags: ["example", "demo"],
  year: new Date().getFullYear(),
  coverImage: "/sample-cover.png",
};

export default function ProjectCard({
  item = defaultItem,
}: {
  item?: ProjectIndexItem;
}) {
  return (
    <Link
      href={`/projects/${item.slug}`}
      className="group block focus:outline-none"
    >
      <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
        <div className="relative h-48">
          <Image
            src={
              item.coverImage ||
              "/placeholder.svg?height=300&width=400&query=project%20cover"
            }
            alt={`${item.title} cover`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain"
            priority={false}
          />
        </div>
        <CardHeader className="space-y-1">
          <CardTitle className="text-base">{item.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.tagline}
          </p>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {(item.tags || []).slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          {item.year ? (
            <span className="text-xs text-muted-foreground">{item.year}</span>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}
