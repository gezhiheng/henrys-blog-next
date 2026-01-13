import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import projects from './projects-array'

interface Project {
  title: string
  description: string
  href: string
  tags: string[]
}

export default function ProjectsPage() {
  return (
    <div className="space-y-12 min-h-screen max-w-2xl mx-auto">
      <div className="space-y-3" id="archive">
        <h1 className="text-3xl font-semibold md:text-4xl">Projects</h1>
        <p className="text-base text-muted-foreground">
          A collection of projects I&apos;m working on and have worked on.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map(project => (
          <Card
            key={project.title}
            className="flex flex-col border-border/60 bg-card/60 transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-lg">
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-4"
                >
                  {project.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {project.description ?? ''}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
