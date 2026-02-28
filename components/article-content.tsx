interface ArticleContentProps {
  content: string
}

export function ArticleContent({ content }: ArticleContentProps) {
  const blocks = content.split("\n\n")

  return (
    <article className="py-12 sm:py-16">
      <div className="flex flex-col gap-6">
        {blocks.map((block, index) => {
          const trimmed = block.trim()

          if (trimmed.startsWith("## ")) {
            return (
              <h2
                key={index}
                className="mt-4 font-serif text-2xl font-bold tracking-tight text-foreground"
              >
                {trimmed.replace("## ", "")}
              </h2>
            )
          }

          if (trimmed.startsWith("**") && trimmed.includes(".**")) {
            const match = trimmed.match(/^\*\*(.+?)\.\*\*\s*(.*)$/)
            if (match) {
              return (
                <p key={index} className="text-base leading-relaxed text-foreground/80">
                  <strong className="text-foreground">{match[1]}.</strong>{" "}
                  {match[2]}
                </p>
              )
            }
          }

          if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
            return (
              <p key={index} className="text-base font-semibold leading-relaxed text-foreground">
                {trimmed.replace(/\*\*/g, "")}
              </p>
            )
          }

          // Regular paragraph - handle inline bold
          const parts = trimmed.split(/(\*\*[^*]+\*\*)/)
          return (
            <p key={index} className="text-base leading-relaxed text-foreground/80">
              {parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={i} className="text-foreground">
                      {part.replace(/\*\*/g, "")}
                    </strong>
                  )
                }
                return <span key={i}>{part}</span>
              })}
            </p>
          )
        })}
      </div>
    </article>
  )
}
