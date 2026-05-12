import { cleanBullet } from '../utils/bulletWriter';

export default function Preview({ data }) {
  const { 
    name, email, phone, github, linkedin, 
    education, languages, tools, frameworks, projects, summary, 
    achievements, certifications, spokenLanguages, additionalInfo 
  } = data;

  const allSkills = [
    ...(languages || []),
    ...(frameworks || []),
    ...(tools || [])
  ];

  const hasBasics = name || email;
  const hasSkills = allSkills.length > 0;
  const hasProjects = projects && projects.some(p => p.name || (p.bullets && p.bullets.some(b => b.trim())));
  const hasEducation = education && education.some(e => e.degree || e.institution);
  const hasAchievements = achievements && achievements.length > 0;
  const hasCertifications = certifications && certifications.length > 0;
  const hasSpokenLanguages = spokenLanguages && spokenLanguages.length > 0;
  const hasAdditionalInfo = additionalInfo && additionalInfo.length > 0;

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

  const sectionHeadingStyle = {
    color: '#4472C4',
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #4472C4',
    paddingBottom: '2px',
    marginBottom: '6px',
  };

  return (
    <div className="font-sans print-section" id="portfolio-preview" style={{ fontSize: '9.5px', lineHeight: '1.35', padding: '20px 22px', color: '#1a1a1a' }}>
      {/* Two Column Layout */}
      <div style={{ display: 'flex', gap: '18px' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ flex: '1 1 62%', minWidth: 0 }}>
          
          {/* Name + Summary */}
          <div style={{ marginBottom: '12px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#1a1a1a', lineHeight: '1.1', marginBottom: '6px' }}>
              {name || 'Your Name'}
            </h1>
            {summary && (
              <p style={{ fontSize: '9px', color: '#444', lineHeight: '1.4' }}>
                {summary}
              </p>
            )}
          </div>

          {/* Projects */}
          {hasProjects && (
            <section style={{ marginBottom: '12px' }}>
              <h2 style={sectionHeadingStyle}>Projects</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {projects.filter(p => p.name || (p.bullets && p.bullets.some(b => b.trim()))).map((project, index) => {
                  const bullets = (project.bullets || []).filter(b => b.trim()).map(b => cleanBullet(b));
                  
                  return (
                    <div key={index}>
                      <p style={{ fontWeight: 700, fontSize: '10px', marginBottom: '1px' }}>
                        {project.name || `Project ${index + 1}`}
                      </p>
                      {project.role && (
                        <p style={{ fontSize: '9px', color: '#555', marginBottom: '2px' }}>
                          {project.role}
                        </p>
                      )}
                      {project.techStack && project.techStack.length > 0 && (
                        <p style={{ fontSize: '9px', color: '#444', marginBottom: '2px' }}>
                          <span style={{ fontWeight: 600 }}>Tech Stack: </span>
                          {project.techStack.join(', ')}
                        </p>
                      )}
                      {bullets.length > 0 && (
                        <ul style={{ margin: 0, paddingLeft: '14px' }}>
                          {bullets.map((bullet, i) => (
                            <li key={i} style={{ fontSize: '9px', color: '#333', marginBottom: '1px', lineHeight: '1.35' }}>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                      {project.impact && (
                        <p style={{ fontSize: '9px', color: '#444', marginTop: '1px' }}>
                          <span style={{ fontWeight: 600 }}>Impact: </span>
                          {project.impact}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Educational Background */}
          {hasEducation && (
            <section style={{ marginBottom: '12px' }}>
              <h2 style={sectionHeadingStyle}>Educational Background</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {education.filter(e => e.degree || e.institution).map((edu, index) => (
                  <div key={index}>
                    <p style={{ fontWeight: 700, fontSize: '10px', marginBottom: '1px' }}>
                      {edu.degree}
                    </p>
                    <p style={{ fontSize: '9px', color: '#444' }}>
                      {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                    </p>
                    {edu.dateRange && (
                      <p style={{ fontSize: '9px', color: '#555' }}>{edu.dateRange}</p>
                    )}
                    {edu.grade && (
                      <ul style={{ margin: 0, paddingLeft: '14px' }}>
                        <li style={{ fontSize: '9px', color: '#333' }}>{edu.grade}</li>
                      </ul>
                    )}
                    {edu.courses && edu.courses.length > 0 && (
                      <ul style={{ margin: 0, paddingLeft: '14px' }}>
                        <li style={{ fontSize: '9px', color: '#333', lineHeight: '1.35' }}>
                          {edu.courses.join(', ')}
                        </li>
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ flex: '0 0 35%', minWidth: 0 }}>
          
          {/* Contact */}
          <section style={{ marginBottom: '12px' }}>
            <h2 style={sectionHeadingStyle}>Contact</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '9px', color: '#333' }}>
              {phone && <p>{phone}</p>}
              {email && <p>{email}</p>}
              {linkedin && <p>www.linkedin.com/in/{linkedin}</p>}
              {github && <p>https://github.com/{github}</p>}
            </div>
          </section>

          {/* Skills */}
          {hasSkills && (
            <section style={{ marginBottom: '12px' }}>
              <h2 style={sectionHeadingStyle}>Skills</h2>
              
              {languages && languages.length > 0 && (
                <div style={{ marginBottom: '6px' }}>
                  <p style={{ fontWeight: 700, fontSize: '9px', marginBottom: '2px' }}>Technical Skills</p>
                  <ul style={{ margin: 0, paddingLeft: '14px' }}>
                    {languages.map((skill, i) => (
                      <li key={i} style={{ fontSize: '9px', color: '#333', marginBottom: '1px' }}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(frameworks && frameworks.length > 0) && (
                <div style={{ marginBottom: '6px' }}>
                  <p style={{ fontWeight: 700, fontSize: '9px', marginBottom: '2px' }}>Tools & Technologies</p>
                  <ul style={{ margin: 0, paddingLeft: '14px' }}>
                    {frameworks.map((fw, i) => (
                      <li key={i} style={{ fontSize: '9px', color: '#333', marginBottom: '1px' }}>{fw}</li>
                    ))}
                  </ul>
                </div>
              )}

              {tools && tools.length > 0 && (
                <div style={{ marginBottom: '6px' }}>
                  <p style={{ fontWeight: 700, fontSize: '9px', marginBottom: '2px' }}>Developer Tools</p>
                  <ul style={{ margin: 0, paddingLeft: '14px' }}>
                    {tools.map((tool, i) => (
                      <li key={i} style={{ fontSize: '9px', color: '#333', marginBottom: '1px' }}>{tool}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Spoken Languages */}
          {hasSpokenLanguages && (
            <section style={{ marginBottom: '12px' }}>
              <h2 style={sectionHeadingStyle}>Languages</h2>
              <ul style={{ margin: 0, paddingLeft: '14px' }}>
                {spokenLanguages.map((lang, i) => (
                  <li key={i} style={{ fontSize: '9px', color: '#333', marginBottom: '1px' }}>
                    {lang.name} ({lang.proficiency})
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {hasCertifications && (
            <section style={{ marginBottom: '12px' }}>
              <h2 style={sectionHeadingStyle}>Certification</h2>
              <ul style={{ margin: 0, paddingLeft: '14px' }}>
                {certifications.map((cert, i) => (
                  <li key={i} style={{ fontSize: '9px', color: '#333', marginBottom: '1px', lineHeight: '1.35' }}>
                    {cert}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Additional Information */}
          {hasAdditionalInfo && (
            <section style={{ marginBottom: '12px' }}>
              <h2 style={sectionHeadingStyle}>Additional Information</h2>
              <ul style={{ margin: 0, paddingLeft: '14px' }}>
                {additionalInfo.map((info, i) => (
                  <li key={i} style={{ fontSize: '9px', color: '#333', marginBottom: '2px', lineHeight: '1.35' }}>
                    {info}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
