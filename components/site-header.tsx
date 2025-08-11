import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteHeader({
  title = "Build My Own Internet 🌐",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <header className="border-b bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-lg hover:opacity-90"
        >
          {title}
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="default" size="sm">
            <Link
              href="https://github.com/asimar007/Build-My-Own-X/"
              target="_blank"
              rel="noreferrer"
            >
              Star on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
