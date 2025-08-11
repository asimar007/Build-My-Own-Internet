import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="text-muted-foreground">The project you are looking for does not exist or has been moved.</p>
        <Button asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </main>
  )
}
