"use client";
import Image from 'next/image';
interface StaticSkillsData {
  skills: Array<{
    name: string
    logo: string | null  }>
}
export default function SkillsGridStatic({ skills }: StaticSkillsData) {
  const skillsWithLogos = skills.filter(skill => skill.logo !== null);
  const skillsWithoutLogos = skills.filter(skill => skill.logo === null);
  return (
    <section id="skills" className="mb-28">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl text-center font-bold mb-5">Technical Skills</h2>
      {skillsWithLogos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {skillsWithLogos.map((skill, index) => (
            <div
              key={`skill-${index}`}
              className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 hover:scale-105 hover:shadow-md"
            >
              {skill.logo && (
                <div className="group-hover:scale-110 transition-transform duration-200">
                  <Image
                    src={skill.logo}
                    alt={skill.name}
                    width={32}
                    height={32}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              )}
              <span className="text-xs text-center font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      )}
      {skillsWithoutLogos.length > 0 && (
        <div className={skillsWithLogos.length > 0 ? "mt-8" : ""}>
          {skillsWithLogos.length > 0 && (
            <h3 className="text-lg font-semibold text-center mb-4">Other Technologies</h3>
          )}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skillsWithoutLogos.map((skill, index) => (
              <div
                key={`other-${index}`}
                className="px-3 py-1 bg-muted rounded-full text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </section>
  )
}