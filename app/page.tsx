import MinimalProfileStatic from '@/components/MinimalProfileStatic'
import SkillsGridStatic from '@/components/SkillsGridStatic'
import CustomSectionCardStatic from '@/components/CustomSectionCardStatic'
import CustomSectionListStatic from '@/components/CustomSectionListStatic'
import CustomSectionTimelineStatic from '@/components/CustomSectionTimelineStatic'
import portfolioData from '@/data/portfolio.json'

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <MinimalProfileStatic personal={portfolioData.personal} />
        {portfolioData.workExperience && <CustomSectionCardStatic section={{
          section_name: "Work Experience",
          layout_type: "card",
          items: portfolioData.workExperience.map((exp, index) => ({
            primaryTitle: exp.company,
            secondaryTitle: exp.position,
            dateInfo: `${exp.start_date || ''} - ${exp.end_date || 'Present'}`.trim(),
            location: exp.location,
            description: exp.description,
            logoUrl: exp.logoUrl,
            customLinks: exp.custom_links
          }))
        }} />}
        {portfolioData.education && <CustomSectionCardStatic section={{
          section_name: "Education",
          layout_type: "card",
          items: portfolioData.education.map((edu, index) => ({
            primaryTitle: edu.university,
            secondaryTitle: edu.degree,
            dateInfo: `${edu.start_year || ''} - ${edu.end_year || 'Present'}`.trim(),
            location: edu.location,
            description: edu.description,
            logoUrl: edu.logoUrl,
            customLinks: edu.custom_links
          }))
        }} />}
        {portfolioData.skills && <SkillsGridStatic skills={portfolioData.skills} />}
        {portfolioData.customSections && portfolioData.customSections.find(s => s.id === "133ff5f6-8361-429f-b133-1cd252c3444a") && (() => {
          const section = portfolioData.customSections.find(s => s.id === "133ff5f6-8361-429f-b133-1cd252c3444a")
          const layoutMap: { [key: string]: any } = {
            'card': CustomSectionCardStatic,
            'list': CustomSectionListStatic,
            'timeline': CustomSectionTimelineStatic
          }
          const LayoutComponent = layoutMap[section!.layout_type] || CustomSectionCardStatic
          return <LayoutComponent section={section} />
        })()}
      </div>
    </main>
  )
}