import { cleanBullet } from './bulletWriter';

// Generate full-page HTML portfolio - Two Column Layout
export function generateHTML(data) {
  const { 
    name, email, github, linkedin, phone, 
    education, languages, tools, frameworks, projects, summary, 
    achievements, certifications, spokenLanguages, additionalInfo 
  } = data;

  const hasSkills = (languages?.length || 0) + (frameworks?.length || 0) + (tools?.length || 0) > 0;
  const hasProjects = projects && projects.some(p => p.name || (p.bullets && p.bullets.some(b => b.trim())));
  const hasEducation = education && education.some(e => e.degree || e.institution);
  const hasCertifications = certifications && certifications.length > 0;
  const hasSpokenLanguages = spokenLanguages && spokenLanguages.length > 0;
  const hasAdditionalInfo = additionalInfo && additionalInfo.length > 0;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name || 'Portfolio'} - Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: Calibri, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 850px; 
      margin: 0 auto; 
      padding: 28px 36px;
      color: #1a1a1a;
      line-height: 1.35;
      font-size: 10pt;
    }
    .container {
      display: flex;
      gap: 24px;
    }
    .left-col {
      flex: 1 1 62%;
      min-width: 0;
    }
    .right-col {
      flex: 0 0 35%;
      min-width: 0;
    }
    h1 { 
      font-size: 24pt; 
      font-weight: 700;
      color: #1a1a1a;
      line-height: 1.1;
      margin-bottom: 6px;
    }
    .summary {
      font-size: 9.5pt;
      color: #444;
      line-height: 1.45;
      margin-bottom: 14px;
    }
    h2 {
      color: #4472C4;
      font-size: 11pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #4472C4;
      padding-bottom: 2px;
      margin-bottom: 8px;
    }
    section { margin-bottom: 14px; }
    .project { margin-bottom: 10px; page-break-inside: avoid; }
    .project-name { font-weight: 700; font-size: 10.5pt; margin-bottom: 1px; }
    .project-role { font-size: 9.5pt; color: #555; margin-bottom: 2px; }
    .project-tech { font-size: 9.5pt; color: #444; margin-bottom: 2px; }
    .project-tech strong { font-weight: 600; }
    .project ul { margin: 0; padding-left: 16px; }
    .project li { font-size: 9.5pt; color: #333; margin-bottom: 1px; line-height: 1.35; }
    .project-impact { font-size: 9.5pt; color: #444; margin-top: 2px; }
    .project-impact strong { font-weight: 600; }
    .edu-entry { margin-bottom: 8px; }
    .edu-degree { font-weight: 700; font-size: 10.5pt; margin-bottom: 1px; }
    .edu-institution { font-size: 9.5pt; color: #444; }
    .edu-date { font-size: 9.5pt; color: #555; }
    .edu-entry ul { margin: 0; padding-left: 16px; }
    .edu-entry li { font-size: 9.5pt; color: #333; line-height: 1.35; }
    .contact-info { display: flex; flex-direction: column; gap: 2px; font-size: 9.5pt; color: #333; }
    .skills-group { margin-bottom: 6px; }
    .skills-group-title { font-weight: 700; font-size: 9.5pt; margin-bottom: 2px; }
    .skills-group ul { margin: 0; padding-left: 16px; }
    .skills-group li { font-size: 9.5pt; color: #333; margin-bottom: 1px; }
    .right-col ul { margin: 0; padding-left: 16px; }
    .right-col li { font-size: 9.5pt; color: #333; margin-bottom: 1px; line-height: 1.35; }
    @media print { 
      body { padding: 20px 30px; max-width: none; }
      section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- LEFT COLUMN -->
    <div class="left-col">
      <h1>${name || 'Your Name'}</h1>
      ${summary ? `<p class="summary">${summary}</p>` : ''}

      ${hasProjects ? `
      <section>
        <h2>Projects</h2>
        ${projects.filter(p => p.name || (p.bullets && p.bullets.some(b => b.trim()))).map(project => {
          const bullets = (project.bullets || []).filter(b => b.trim()).map(b => cleanBullet(b));
          return `
        <div class="project">
          <p class="project-name">${project.name || 'Project'}</p>
          ${project.role ? `<p class="project-role">${project.role}</p>` : ''}
          ${project.techStack && project.techStack.length > 0 ? `<p class="project-tech"><strong>Tech Stack:</strong> ${project.techStack.join(', ')}</p>` : ''}
          ${bullets.length > 0 ? `<ul>
            ${bullets.map(b => `<li>${b}</li>`).join('\n            ')}
          </ul>` : ''}
          ${project.impact ? `<p class="project-impact"><strong>Impact:</strong> ${project.impact}</p>` : ''}
        </div>`;
        }).join('')}
      </section>
      ` : ''}

      ${hasEducation ? `
      <section>
        <h2>Educational Background</h2>
        ${education.filter(e => e.degree || e.institution).map(edu => `
        <div class="edu-entry">
          <p class="edu-degree">${edu.degree}</p>
          <p class="edu-institution">${edu.institution}${edu.location ? `, ${edu.location}` : ''}</p>
          ${edu.dateRange ? `<p class="edu-date">${edu.dateRange}</p>` : ''}
          ${(edu.grade || (edu.courses && edu.courses.length > 0)) ? `
          <ul>
            ${edu.grade ? `<li>${edu.grade}</li>` : ''}
            ${edu.courses && edu.courses.length > 0 ? `<li>${edu.courses.join(', ')}</li>` : ''}
          </ul>` : ''}
        </div>`).join('')}
      </section>
      ` : ''}
    </div>

    <!-- RIGHT COLUMN -->
    <div class="right-col">
      <section>
        <h2>Contact</h2>
        <div class="contact-info">
          ${phone ? `<p>${phone}</p>` : ''}
          ${email ? `<p>${email}</p>` : ''}
          ${linkedin ? `<p>www.linkedin.com/in/${linkedin}</p>` : ''}
          ${github ? `<p>https://github.com/${github}</p>` : ''}
        </div>
      </section>

      ${hasSkills ? `
      <section>
        <h2>Skills</h2>
        ${languages && languages.length > 0 ? `
        <div class="skills-group">
          <p class="skills-group-title">Technical Skills</p>
          <ul>${languages.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>` : ''}
        ${frameworks && frameworks.length > 0 ? `
        <div class="skills-group">
          <p class="skills-group-title">Tools & Technologies</p>
          <ul>${frameworks.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>` : ''}
        ${tools && tools.length > 0 ? `
        <div class="skills-group">
          <p class="skills-group-title">Developer Tools</p>
          <ul>${tools.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>` : ''}
      </section>
      ` : ''}

      ${hasSpokenLanguages ? `
      <section>
        <h2>Languages</h2>
        <ul>
          ${spokenLanguages.map(l => `<li>${l.name} (${l.proficiency})</li>`).join('\n          ')}
        </ul>
      </section>
      ` : ''}

      ${hasCertifications ? `
      <section>
        <h2>Certification</h2>
        <ul>
          ${certifications.map(c => `<li>${c}</li>`).join('\n          ')}
        </ul>
      </section>
      ` : ''}

      ${hasAdditionalInfo ? `
      <section>
        <h2>Additional Information</h2>
        <ul>
          ${additionalInfo.map(i => `<li>${i}</li>`).join('\n          ')}
        </ul>
      </section>
      ` : ''}
    </div>
  </div>
</body>
</html>`;

  return html;
}

// Generate ATS-friendly plain text
export function generatePlainText(data) {
  const { 
    name, email, github, linkedin, phone, 
    education, languages, tools, frameworks, projects, summary, 
    achievements, certifications, spokenLanguages, additionalInfo 
  } = data;

  let text = '';

  // Header
  text += `${(name || 'YOUR NAME').toUpperCase()}\n`;
  text += '='.repeat(60) + '\n';
  const contacts = [];
  if (email) contacts.push(email);
  if (phone) contacts.push(phone);
  if (github) contacts.push(`https://github.com/${github}`);
  if (linkedin) contacts.push(`www.linkedin.com/in/${linkedin}`);
  if (contacts.length > 0) text += contacts.join(' | ') + '\n';
  text += '\n';

  // Summary
  if (summary) {
    text += 'SUMMARY\n';
    text += '-'.repeat(60) + '\n';
    text += summary + '\n\n';
  }

  // Projects
  if (projects && projects.some(p => p.name || (p.bullets && p.bullets.some(b => b.trim())))) {
    text += 'PROJECTS\n';
    text += '-'.repeat(60) + '\n';
    
    projects.filter(p => p.name || (p.bullets && p.bullets.some(b => b.trim()))).forEach(project => {
      text += `\n${project.name || 'Project'}`;
      if (project.role) text += ` — ${project.role}`;
      text += '\n';
      if (project.techStack && project.techStack.length > 0) {
        text += `Tech Stack: ${project.techStack.join(', ')}\n`;
      }
      
      const bullets = (project.bullets || []).filter(b => b.trim()).map(b => cleanBullet(b));
      bullets.forEach(b => text += `• ${b}\n`);
      if (project.impact) text += `Impact: ${project.impact}\n`;
    });
    text += '\n';
  }

  // Education
  if (education && education.some(e => e.degree || e.institution)) {
    text += 'EDUCATIONAL BACKGROUND\n';
    text += '-'.repeat(60) + '\n';
    education.filter(e => e.degree || e.institution).forEach(edu => {
      if (edu.degree) text += edu.degree + '\n';
      if (edu.institution) {
        text += edu.institution;
        if (edu.location) text += `, ${edu.location}`;
        text += '\n';
      }
      if (edu.dateRange) text += edu.dateRange + '\n';
      if (edu.grade) text += `• ${edu.grade}\n`;
      if (edu.courses && edu.courses.length > 0) {
        text += `• ${edu.courses.join(', ')}\n`;
      }
      text += '\n';
    });
  }

  // Skills
  const hasSkills = (languages?.length || 0) + (frameworks?.length || 0) + (tools?.length || 0) > 0;
  if (hasSkills) {
    text += 'SKILLS\n';
    text += '-'.repeat(60) + '\n';
    if (languages && languages.length > 0) text += `Technical Skills: ${languages.join(', ')}\n`;
    if (frameworks && frameworks.length > 0) text += `Tools & Technologies: ${frameworks.join(', ')}\n`;
    if (tools && tools.length > 0) text += `Developer Tools: ${tools.join(', ')}\n`;
    text += '\n';
  }

  // Spoken Languages
  if (spokenLanguages && spokenLanguages.length > 0) {
    text += 'LANGUAGES\n';
    text += '-'.repeat(60) + '\n';
    spokenLanguages.forEach(l => text += `• ${l.name} (${l.proficiency})\n`);
    text += '\n';
  }

  // Certifications
  if (certifications && certifications.length > 0) {
    text += 'CERTIFICATIONS\n';
    text += '-'.repeat(60) + '\n';
    certifications.forEach(c => text += `• ${c}\n`);
    text += '\n';
  }

  // Achievements
  if (achievements && achievements.length > 0) {
    text += 'ACHIEVEMENTS\n';
    text += '-'.repeat(60) + '\n';
    achievements.forEach(a => text += `• ${a}\n`);
    text += '\n';
  }

  // Additional Information
  if (additionalInfo && additionalInfo.length > 0) {
    text += 'ADDITIONAL INFORMATION\n';
    text += '-'.repeat(60) + '\n';
    additionalInfo.forEach(i => text += `• ${i}\n`);
  }

  return text;
}

// Download as PDF (opens print dialog - select "Save as PDF")
export function downloadPDF(data) {
  const html = generateHTML(data);
  
  // Open in new window and trigger print
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
    
    // Fallback if onload doesn't fire
    setTimeout(() => {
      printWindow.print();
    }, 500);
  } else {
    alert('Please allow popups to download PDF');
  }
}

// Download as HTML file
export function downloadHTML(data) {
  const html = generateHTML(data);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(data.name || 'portfolio').toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Copy to clipboard
export function copyToClipboard(data) {
  const text = generatePlainText(data);
  navigator.clipboard.writeText(text);
  return text;
}

// Save to localStorage
export function saveToLocalStorage(data) {
  localStorage.setItem('portfolio-data', JSON.stringify(data));
}

// Load from localStorage
export function loadFromLocalStorage() {
  const saved = localStorage.getItem('portfolio-data');
  return saved ? JSON.parse(saved) : null;
}
