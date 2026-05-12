// Bullet utilities - helps clean up user-written bullets into professional format

const actionVerbs = [
  'Built', 'Developed', 'Created', 'Engineered', 'Designed', 'Implemented',
  'Integrated', 'Optimized', 'Enhanced', 'Streamlined', 'Managed', 'Coordinated',
  'Architected', 'Deployed', 'Configured', 'Established', 'Contributed',
  'Worked', 'Utilized', 'Applied', 'Researched', 'Analyzed', 'Constructed',
];

// Clean up a user-written bullet: capitalize first letter, ensure it reads professionally
export function cleanBullet(text) {
  if (!text || !text.trim()) return '';
  
  let cleaned = text.trim();
  
  // Capitalize first letter
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  
  // Remove trailing period (optional — keeps consistency)
  cleaned = cleaned.replace(/\.+$/, '');
  
  return cleaned;
}

// Check if a bullet starts with an action verb
export function startsWithActionVerb(text) {
  if (!text) return false;
  const firstWord = text.trim().split(/\s+/)[0];
  return actionVerbs.some(v => v.toLowerCase() === firstWord.toLowerCase());
}

// Format skills for display
export function formatSkills(skills, category) {
  const categoryLabels = {
    languages: 'Programming Languages',
    tools: 'Tools & Technologies', 
    frameworks: 'Frameworks & Libraries',
    courses: 'Relevant Coursework'
  };
  
  return {
    label: categoryLabels[category] || category,
    items: skills
  };
}
