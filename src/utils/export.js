import { generateBullets } from './bulletWriter';

// Generate full-page HTML portfolio
export function generateHTML(data) {
  const { name, email, github, linkedin, phone, degree, university, gradYear, cgpa, courses, languages, tools, frameworks, projects, summary, achievements, certifications } = data;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name || 'Portfolio'} - Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 800px; 
      margin: 0 auto; 
      padding: 32px 40px;
      color: #1a1a1a;
      line-height: 1.4;
      font-size: 11pt;
    }
    header { 
      text-align: center; 
      border-bottom: 2px solid #000; 
      padding-bottom: 12px; 
      margin-bottom: 16px; 
    }
    h1 { 
      font-size: 24pt; 
      font-weight: 700;
      letter-spacing: 1px; 
      text-transform: uppercase; 
      margin-bottom: 6px; 
    }
    .contact { 
      font-size: 10pt; 
      color: #333;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .contact span { 
      display: inline-flex;
      align-items: center;
    }
    .contact span:not(:last-child)::after {
      content: '|';
      margin-left: 8px;
      color: #999;
    }
    section { margin-bottom: 14px; }
    h2 { 
      font-size: 11pt; 
      text-transform: uppercase; 
      letter-spacing: 1px; 
      border-bottom: 1px solid #333; 
      padding-bottom: 3px; 
      margin-bottom: 8px;
      font-weight: 700;
    }
    .summary {
      font-size: 10pt;
      color: #333;
      line-height: 1.5;
      text-align: justify;
    }
    .edu-row { 
      display: flex; 
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 4px;
    }
    .edu-degree { font-weight: 600; font-size: 11pt; }
    .edu-university { color: #333; font-size: 10pt; }
    .edu-year { color: #555; font-size: 10pt; }
    .edu-cgpa { font-size: 10pt; color: #333; margin-top: 2px; }
    .coursework { 
      font-size: 10pt; 
      color: #444; 
      margin-top: 6px;
      line-height: 1.4;
    }
    .coursework strong { font-weight: 600; }
    .skills-grid {
      display: grid;
      gap: 4px;
    }
    .skills-row {
      display: flex;
      font-size: 10pt;
    }
    .skills-label {
      font-weight: 600;
      min-width: 100px;
    }
    .skills-list {
      color: #333;
    }
    .project { 
      margin-bottom: 12px; 
      page-break-inside: avoid;
    }
    .project-header { 
      display: flex; 
      justify-content: space-between; 
      align-items: baseline;
      margin-bottom: 4px;
    }
    .project-name { 
      font-weight: 600; 
      font-size: 11pt;
    }
    .project-tech { 
      font-size: 9pt; 
      color: #555;
      font-style: italic;
    }
    .project ul { 
      margin: 0;
      padding-left: 16px; 
    }
    .project li { 
      font-size: 10pt; 
      color: #333; 
      margin-bottom: 2px;
      line-height: 1.4;
    }
    .achievements ul, .certifications ul {
      margin: 0;
      padding-left: 16px;
    }
    .achievements li, .certifications li {
      font-size: 10pt;
      color: #333;
      margin-bottom: 2px;
    }
    @media print { 
      body { padding: 20px; }
      section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${name || 'Your Name'}</h1>
    <div class="contact">
      ${email ? `<span>${email}</span>` : ''}
      ${phone ? `<span>${phone}</span>` : ''}
      ${github ? `<span>github.com/${github}</span>` : ''}
      ${linkedin ? `<span>linkedin.com/in/${linkedin}</span>` : ''}
    </div>
  </header>

  ${summary ? `
  <section>
    <h2>Summary</h2>
    <p class="summary">${summary}</p>
  </section>
  ` : ''}

  ${(degree || university) ? `
  <section>
    <h2>Education</h2>
    <div class="edu-row">
      <div>
        <p class="edu-degree">${degree || ''}</p>
        <p class="edu-university">${university || ''}</p>
        ${cgpa ? `<p class="edu-cgpa">CGPA: ${cgpa}</p>` : ''}
      </div>
      ${gradYear ? `<p class="edu-year">${gradYear}</p>` : ''}
    </div>
    ${courses && courses.length > 0 ? `<p class="coursework"><strong>Relevant Coursework:</strong> ${courses.join(', ')}</p>` : ''}
  </section>
  ` : ''}

  ${((languages && languages.length > 0) || (frameworks && frameworks.length > 0) || (tools && tools.length > 0)) ? `
  <section>
    <h2>Technical Skills</h2>
    <div class="skills-grid">
      ${languages && languages.length > 0 ? `<div class="skills-row"><span class="skills-label">Languages:</span><span class="skills-list">${languages.join(', ')}</span></div>` : ''}
      ${frameworks && frameworks.length > 0 ? `<div class="skills-row"><span class="skills-label">Frameworks:</span><span class="skills-list">${frameworks.join(', ')}</span></div>` : ''}
      ${tools && tools.length > 0 ? `<div class="skills-row"><span class="skills-label">Tools:</span><span class="skills-list">${tools.join(', ')}</span></div>` : ''}
    </div>
  </section>
  ` : ''}

  ${projects && projects.some(p => p.name || p.solution) ? `
  <section>
    <h2>Projects</h2>
    ${projects.filter(p => p.name || p.solution).map(project => {
      const bullets = generateBullets(project.name, project.problem, project.solution, project.techStack || []);
      return `
    <div class="project">
      <div class="project-header">
        <span class="project-name">${project.name || 'Project'}</span>
        ${project.techStack && project.techStack.length > 0 ? `<span class="project-tech">${project.techStack.join(', ')}</span>` : ''}
      </div>
      <ul>
        ${bullets.length > 0 
          ? bullets.map(b => `<li>${b}</li>`).join('\n        ')
          : project.solution ? `<li>${project.solution}</li>` : ''
        }
      </ul>
    </div>`;
    }).join('')}
  </section>
  ` : ''}

  ${achievements && achievements.length > 0 ? `
  <section>
    <h2>Achievements</h2>
    <ul class="achievements">
      ${achievements.map(a => `<li>${a}</li>`).join('\n      ')}
    </ul>
  </section>
  ` : ''}

  ${certifications && certifications.length > 0 ? `
  <section>
    <h2>Certifications</h2>
    <ul class="certifications">
      ${certifications.map(c => `<li>${c}</li>`).join('\n      ')}
    </ul>
  </section>
  ` : ''}
</body>
</html>`;

  return html;
}

// Generate ATS-friendly plain text
export function generatePlainText(data) {
  const { name, email, github, linkedin, phone, degree, university, gradYear, cgpa, courses, languages, tools, frameworks, projects, summary, achievements, certifications } = data;

  let text = '';

  // Header
  text += `${(name || 'YOUR NAME').toUpperCase()}\n`;
  text += '='.repeat(60) + '\n';
  const contacts = [];
  if (email) contacts.push(email);
  if (phone) contacts.push(phone);
  if (github) contacts.push(`github.com/${github}`);
  if (linkedin) contacts.push(`linkedin.com/in/${linkedin}`);
  if (contacts.length > 0) text += contacts.join(' | ') + '\n';
  text += '\n';

  // Summary
  if (summary) {
    text += 'SUMMARY\n';
    text += '-'.repeat(60) + '\n';
    text += summary + '\n\n';
  }

  // Education
  if (degree || university) {
    text += 'EDUCATION\n';
    text += '-'.repeat(60) + '\n';
    if (degree) text += degree + '\n';
    if (university) text += university;
    if (gradYear) text += ` | ${gradYear}`;
    text += '\n';
    if (cgpa) text += `CGPA: ${cgpa}\n`;
    if (courses && courses.length > 0) {
      text += `Relevant Coursework: ${courses.join(', ')}\n`;
    }
    text += '\n';
  }

  // Skills
  const hasSkills = (languages?.length || 0) + (frameworks?.length || 0) + (tools?.length || 0) > 0;
  if (hasSkills) {
    text += 'TECHNICAL SKILLS\n';
    text += '-'.repeat(60) + '\n';
    if (languages && languages.length > 0) text += `Languages: ${languages.join(', ')}\n`;
    if (frameworks && frameworks.length > 0) text += `Frameworks: ${frameworks.join(', ')}\n`;
    if (tools && tools.length > 0) text += `Tools: ${tools.join(', ')}\n`;
    text += '\n';
  }

  // Projects
  if (projects && projects.some(p => p.name || p.solution)) {
    text += 'PROJECTS\n';
    text += '-'.repeat(60) + '\n';
    
    projects.filter(p => p.name || p.solution).forEach(project => {
      text += `\n${project.name || 'Project'}`;
      if (project.techStack && project.techStack.length > 0) {
        text += ` [${project.techStack.join(', ')}]`;
      }
      text += '\n';
      
      const bullets = generateBullets(project.name, project.problem, project.solution, project.techStack || []);
      if (bullets.length > 0) {
        bullets.forEach(b => text += `• ${b}\n`);
      } else if (project.solution) {
        text += `• ${project.solution}\n`;
      }
    });
    text += '\n';
  }

  // Achievements
  if (achievements && achievements.length > 0) {
    text += 'ACHIEVEMENTS\n';
    text += '-'.repeat(60) + '\n';
    achievements.forEach(a => text += `• ${a}\n`);
    text += '\n';
  }

  // Certifications
  if (certifications && certifications.length > 0) {
    text += 'CERTIFICATIONS\n';
    text += '-'.repeat(60) + '\n';
    certifications.forEach(c => text += `• ${c}\n`);
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
