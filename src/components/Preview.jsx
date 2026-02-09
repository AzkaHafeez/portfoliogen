import { generateBullets } from '../utils/bulletWriter';

export default function Preview({ data }) {
  const { name, email, phone, github, linkedin, degree, university, gradYear, cgpa, courses, languages, tools, frameworks, projects, summary, achievements, certifications } = data;

  const allSkills = [
    ...(languages || []),
    ...(frameworks || []),
    ...(tools || [])
  ];

  const hasBasics = name || email || degree;
  const hasSkills = allSkills.length > 0;
  const hasProjects = projects && projects.some(p => p.name || p.solution);
  const hasAchievements = achievements && achievements.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  if (!hasBasics && !hasSkills && !hasProjects) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 p-8">
        <div className="text-center">
          <div className="text-4xl mb-4">📄</div>
          <p className="text-lg font-medium">Your portfolio preview</p>
          <p className="text-sm mt-2">Start filling in the form to see it come alive</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 font-sans text-[11px] leading-tight print-section" id="portfolio-preview">
      {/* Header */}
      <header className="text-center border-b-2 border-black pb-3 mb-4">
        <h1 className="text-xl font-bold tracking-wide uppercase">
          {name || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-1.5 text-[10px] text-gray-600">
          {email && <span>{email}</span>}
          {phone && <><span className="text-gray-400">|</span><span>{phone}</span></>}
          {github && <><span className="text-gray-400">|</span><span>github.com/{github}</span></>}
          {linkedin && <><span className="text-gray-400">|</span><span>linkedin.com/in/{linkedin}</span></>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
            Summary
          </h2>
          <p className="text-[10px] text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Education */}
      {(degree || university) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
            Education
          </h2>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-[11px]">{degree || 'Degree / Major'}</p>
              <p className="text-gray-600 text-[10px]">{university || 'University'}</p>
              {cgpa && <p className="text-gray-600 text-[10px]">CGPA: {cgpa}</p>}
            </div>
            {gradYear && (
              <p className="text-gray-600 text-[10px]">{gradYear}</p>
            )}
          </div>
          
          {courses && courses.length > 0 && (
            <p className="text-[10px] text-gray-600 mt-1.5">
              <span className="font-semibold">Relevant Coursework: </span>
              {courses.join(', ')}
            </p>
          )}
        </section>
      )}

      {/* Skills */}
      {hasSkills && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
            Technical Skills
          </h2>
          <div className="space-y-0.5 text-[10px]">
            {languages && languages.length > 0 && (
              <p>
                <span className="font-semibold">Languages: </span>
                {languages.join(', ')}
              </p>
            )}
            {frameworks && frameworks.length > 0 && (
              <p>
                <span className="font-semibold">Frameworks: </span>
                {frameworks.join(', ')}
              </p>
            )}
            {tools && tools.length > 0 && (
              <p>
                <span className="font-semibold">Tools: </span>
                {tools.join(', ')}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      {hasProjects && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.filter(p => p.name || p.solution).map((project, index) => {
              const bullets = generateBullets(
                project.name,
                project.problem,
                project.solution,
                project.techStack || []
              );
              
              return (
                <div key={index}>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-[11px]">
                      {project.name || `Project ${index + 1}`}
                    </p>
                    {project.techStack && project.techStack.length > 0 && (
                      <p className="text-[9px] text-gray-500 italic">
                        {project.techStack.join(', ')}
                      </p>
                    )}
                  </div>
                  <ul className="mt-0.5 space-y-0.5 text-[10px] text-gray-700 ml-3">
                    {bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                    {bullets.length === 0 && project.solution && (
                      <li className="flex items-start gap-1.5">
                        <span className="mt-0.5">•</span>
                        <span>{project.solution}</span>
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Achievements */}
      {hasAchievements && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
            Achievements
          </h2>
          <ul className="space-y-0.5 text-[10px] text-gray-700 ml-3">
            {achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="mt-0.5">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {hasCertifications && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wide border-b border-gray-300 pb-0.5 mb-2">
            Certifications
          </h2>
          <ul className="space-y-0.5 text-[10px] text-gray-700 ml-3">
            {certifications.map((cert, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="mt-0.5">•</span>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
