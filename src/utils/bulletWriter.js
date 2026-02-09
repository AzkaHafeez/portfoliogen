// Bullet rewriting rules - transforms casual descriptions into professional bullets

const actionVerbs = {
  build: ['Built', 'Developed', 'Created', 'Engineered', 'Constructed'],
  implement: ['Implemented', 'Integrated', 'Incorporated', 'Established'],
  design: ['Designed', 'Architected', 'Structured', 'Crafted'],
  improve: ['Optimized', 'Enhanced', 'Streamlined', 'Improved'],
  manage: ['Managed', 'Coordinated', 'Orchestrated', 'Administered'],
};

// Project type patterns with professional rewrites
const projectTypes = {
  todo: {
    pattern: /todo|task|to-do|checklist/i,
    name: 'task management application',
    features: ['task tracking', 'deadline management', 'priority sorting']
  },
  ecommerce: {
    pattern: /e-?commerce|shop|store|cart|buy|sell|product/i,
    name: 'e-commerce platform',
    features: ['product catalog', 'shopping cart', 'checkout system']
  },
  chat: {
    pattern: /chat|messag|communication|dm|inbox/i,
    name: 'real-time messaging application',
    features: ['instant messaging', 'user presence', 'message history']
  },
  blog: {
    pattern: /blog|post|article|cms|content/i,
    name: 'content management system',
    features: ['rich text editing', 'content publishing', 'category management']
  },
  weather: {
    pattern: /weather|forecast|climate|temperature/i,
    name: 'weather forecasting application',
    features: ['real-time weather data', 'location-based forecasts', 'weather alerts']
  },
  social: {
    pattern: /social|feed|follow|like|share|friend/i,
    name: 'social networking platform',
    features: ['user profiles', 'social feed', 'engagement features']
  },
  portfolio: {
    pattern: /portfolio|resume|cv|personal.*site/i,
    name: 'personal portfolio website',
    features: ['project showcase', 'responsive design', 'contact integration']
  },
  dashboard: {
    pattern: /dashboard|admin|analytics|monitor/i,
    name: 'analytics dashboard',
    features: ['data visualization', 'real-time metrics', 'interactive charts']
  },
  auth: {
    pattern: /auth|login|signup|register|user.*management/i,
    name: 'user authentication system',
    features: ['secure login', 'session management', 'password encryption']
  },
  api: {
    pattern: /api|backend|server|rest|graphql/i,
    name: 'RESTful API service',
    features: ['endpoint management', 'data validation', 'error handling']
  }
};

// Tech-specific achievements
const techAchievements = {
  react: 'component-based architecture with reusable UI elements',
  vue: 'reactive data binding and component composition',
  angular: 'modular architecture with dependency injection',
  node: 'server-side JavaScript runtime for scalable backend',
  express: 'RESTful API endpoints with middleware integration',
  mongodb: 'NoSQL database with flexible document schemas',
  mysql: 'relational database with optimized queries',
  postgresql: 'advanced SQL database with complex data relationships',
  firebase: 'real-time database with cloud synchronization',
  docker: 'containerized deployment for consistent environments',
  aws: 'cloud infrastructure with auto-scaling capabilities',
  redux: 'centralized state management for predictable data flow',
  jwt: 'token-based authentication for secure API access',
  socket: 'WebSocket integration for real-time bidirectional communication',
  graphql: 'flexible query language for efficient data fetching',
  tailwind: 'utility-first CSS for rapid UI development',
  typescript: 'type-safe development with enhanced code reliability',
  python: 'clean, readable backend logic',
  django: 'full-featured web framework with built-in admin',
  flask: 'lightweight Python microframework',
};

function detectProjectType(text) {
  const lowerText = text.toLowerCase();
  for (const [key, config] of Object.entries(projectTypes)) {
    if (config.pattern.test(lowerText)) {
      return config;
    }
  }
  return null;
}

function getTechAchievement(tech) {
  const lowerTech = tech.toLowerCase();
  for (const [key, achievement] of Object.entries(techAchievements)) {
    if (lowerTech.includes(key)) {
      return achievement;
    }
  }
  return null;
}

// Main bullet generation function
export function generateBullets(projectName, problem, solution, techStack) {
  const bullets = [];
  const combinedText = `${projectName} ${problem} ${solution}`;
  const projectType = detectProjectType(combinedText);
  
  // BULLET 1: Main project description
  let mainBullet = '';
  const verb = actionVerbs.build[Math.floor(Math.random() * actionVerbs.build.length)];
  
  if (projectType) {
    mainBullet = `${verb} a ${projectType.name}`;
    if (problem && problem.length > 10) {
      // Add problem context
      const cleanProblem = problem.replace(/^(to |for |that |which )/i, '').trim();
      mainBullet += ` to ${cleanProblem.charAt(0).toLowerCase()}${cleanProblem.slice(1)}`;
    }
  } else if (solution && solution.length > 5) {
    // Use solution directly but clean it up
    let cleanSolution = solution.trim();
    // Remove starting words like "made", "created", "built"
    cleanSolution = cleanSolution.replace(/^(made|created|built|developed|designed|implemented)\s+/i, '');
    // Remove "a/an" at start
    cleanSolution = cleanSolution.replace(/^(a|an)\s+/i, '');
    mainBullet = `${verb} ${cleanSolution.charAt(0).toLowerCase()}${cleanSolution.slice(1)}`;
  } else {
    mainBullet = `${verb} ${projectName || 'a web application'}`;
  }
  
  // Ensure no double periods and proper ending
  mainBullet = mainBullet.replace(/\.+$/, '').trim();
  bullets.push(capitalizeFirst(mainBullet));
  
  // BULLET 2: Technical implementation
  if (techStack && techStack.length > 0) {
    const techList = techStack.slice(0, 4);
    let techBullet = `Implemented using ${techList.join(', ')}`;
    
    // Add specific tech achievement
    for (const tech of techStack) {
      const achievement = getTechAchievement(tech);
      if (achievement) {
        techBullet += `, featuring ${achievement}`;
        break;
      }
    }
    bullets.push(techBullet);
  }
  
  // BULLET 3: Features/functionality (if we have project type)
  if (projectType && projectType.features.length > 0) {
    const features = projectType.features.slice(0, 2).join(' and ');
    bullets.push(`Integrated ${features} functionality for enhanced user experience`);
  }
  
  return bullets.slice(0, 3); // Max 3 bullets
}

function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
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
