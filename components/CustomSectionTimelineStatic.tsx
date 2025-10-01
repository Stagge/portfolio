"use client";
import React from "react";
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Briefcase, MapPin } from 'lucide-react';
import Image from 'next/image';
import { renderIcon } from "@/lib/hybrid-icon-resolver";
interface StaticSectionData {
  section_name: string
  layout_type: 'card' | 'timeline' | 'list'
  items: Array<{
    primaryTitle?: string
    secondaryTitle?: string
    dateInfo?: string
    location?: string
    description?: string
    logoUrl?: string | null
    customLinks: Array<{
      icon: string      // Library key OR custom SVG data
      title: string
      url: string
    }>
  }>
}
interface TimelineItemProps {
  primaryTitle: string;
  secondaryTitle?: string;
  dateInfo?: string;
  location?: string;
  description?: string;
  logoUrl?: string | null;
  customLinks?: readonly {
    title: string;
    url: string;
    icon: string;
  }[];
  isFirst?: boolean;
}
function TimelineItem({ primaryTitle, secondaryTitle, dateInfo, location, description, logoUrl, customLinks, isFirst = false }: TimelineItemProps) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-4 flex items-center justify-center">
        <div className="relative size-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {logoUrl ? (
            <div className="relative size-10">
              <Image
                src={logoUrl}
                alt="Logo"
                fill
                className="object-contain"
                sizes="32px"
                priority={isFirst}
              />
            </div>
          ) : (
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <div className="flex flex-col gap-1">
          {dateInfo && <time className="text-sm text-muted-foreground">{dateInfo}</time>}
          {location && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground pb-2">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-xl leading-none">{primaryTitle}</h2>
          {secondaryTitle && <p className="text-md text-muted-foreground">{secondaryTitle}</p>}
        </div>
        {description && (
          <div className="prose pr-8 text-md dark:prose-invert">
            {description.split('\n').map((line, index) => {
              const trimmed = line.trim()
              if (!trimmed) return null
              const processedLine = trimmed.startsWith('- ') || trimmed.startsWith('* ')
                ? '• ' + trimmed.substring(2)
                : trimmed.startsWith('• ') ? trimmed : trimmed
              return (
                <React.Fragment key={index}>
                  {processedLine}
                  {index < description.split('\n').filter(l => l.trim()).length - 1 && <br />}
                </React.Fragment>
              )
            }).filter(Boolean)}
          </div>
        )}
        {customLinks && customLinks.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {customLinks.map((link, idx) => (
              <Button key={idx} variant="outline" size="sm" asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer" title={link.title}>
                  {renderIcon(link.icon, "mr-2")}
                  {link.title}
                </a>
              </Button>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
export default function CustomSectionTimelineStatic({ section }: { section: StaticSectionData }) {
  if (!section || !section.items || section.items.length === 0) {
    return null;
  }
  const sectionId = section.section_name.toLowerCase().replace(/\s+/g, '-')
  return (
    <section id={`custom-${sectionId}`} className="mb-28">
      <h2 className="text-3xl text-center font-bold mb-5">{section.section_name}</h2>
      <CardContent className="p-0">
        <ul className="ml-10 border-l">
          {section.items.map((item, index) => (
            <TimelineItem
              key={index}
              primaryTitle={item.primaryTitle || 'Untitled Item'}
              secondaryTitle={item.secondaryTitle || undefined}
              dateInfo={item.dateInfo || undefined}
              location={item.location || undefined}
              description={item.description || undefined}
              logoUrl={item.logoUrl || null}
              isFirst={index === 0}
              customLinks={item.customLinks?.map((link) => ({
                title: link.title,
                url: link.url,
                icon: link.icon,
              }))}
            />
          ))}
        </ul>
      </CardContent>
    </section>
  );
}