"use client";
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import Image from 'next/image';
import { renderIcon } from "@/lib/hybrid-icon-resolver";
interface StaticProjectsData {
  projects: Array<{
    name: string | null
    description: string | null
    picUrl: string | null
    technologies: Array<{
      name: string
      logo: string | null
    }>
    custom_links: Array<{
      icon: string      // Library key OR custom SVG data
      title: string
      url: string
    }>
  }>
}
export default function ThreeDCardStatic({ projects }: StaticProjectsData) {
  return (
    <section className="mb-28">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl text-center font-bold mb-5">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project, index) => {
            return (
              <CardContainer key={index} className="inter-var" containerClassName="flex items-start justify-center">
                <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {project.name}
                  </CardItem>
                  {project.description && (
                    <CardItem
                      as="div"
                      translateZ="60"
                      className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
                    >
                      <div>
                        {project.description.split('\n').map((line, index) => {
                          const trimmed = line.trim()
                          if (!trimmed) return null
                          const processedLine = trimmed.startsWith('- ') || trimmed.startsWith('* ')
                            ? '• ' + trimmed.substring(2)
                            : trimmed.startsWith('• ') ? trimmed : trimmed
                          return (
                            <React.Fragment key={index}>
                              {processedLine}
                              {index < (project.description || '').split('\n').filter(l => l.trim()).length - 1 && <br />}
                            </React.Fragment>
                          )
                        }).filter(Boolean)}
                      </div>
                    </CardItem>
                  )}
                  {project.picUrl && (
                    <CardItem translateZ="100" className="w-full mt-4">
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                        <Image
                          src={project.picUrl}
                          alt={project.name || 'Project image'}
                          fill
                          className="object-cover group-hover/card:shadow-xl"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 2}
                        />
                      </div>
                    </CardItem>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <CardItem
                      translateZ="60"
                      className="flex flex-wrap gap-2 mt-4"
                    >
                      {project.technologies.slice(0, 5).map((tech, techIndex) => (
                        <div key={techIndex} className="flex items-center gap-1">
                          {tech.logo && (
                            <Image
                              src={tech.logo}
                              alt={tech.name}
                              width={16}
                              height={16}
                              className="object-contain"
                              unoptimized
                            />
                          )}
                          <span className="text-xs text-muted-foreground">{tech.name}</span>
                        </div>
                      ))}
                      {project.technologies.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 5} more
                        </Badge>
                      )}
                    </CardItem>
                  )}
                  {project.custom_links && project.custom_links.length > 0 && (
                    <CardItem translateZ={20} className="mt-8">
                      <div className="flex flex-wrap gap-2">
                        {project.custom_links.map((link, linkIndex) => (
                          <Button key={linkIndex} variant="outline" size="sm" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" title={link.title}>
                              {renderIcon(link.icon, "mr-2")}
                              {link.title}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </CardItem>
                  )}
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </section>
  )
}