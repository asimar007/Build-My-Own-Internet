import type React from "react"
import { Separator } from "@/components/ui/separator"

export default function Section({
  title = "Section",
  description,
  children,
  className = "",
}: {
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section className={`space-y-3 ${className}`}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground mt-1">{description}</p> : null}
      </div>
      <Separator />
      <div className="space-y-3">{children}</div>
    </section>
  )
}
