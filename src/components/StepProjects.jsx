import { useState } from 'react';
import { cleanBullet, startsWithActionVerb } from '../utils/bulletWriter';

const EMPTY_PROJECT = {
  name: '',
  role: '',
  bullets: ['', '', ''],
  impact: '',
  techStack: []
};

const TECH_SUGGESTIONS = [
  'React', 'Node.js', 'Python', 'JavaScript', 'MongoDB', 'MySQL', 
  'Firebase', 'Express', 'Django', 'Flask', 'HTML/CSS', 'Tailwind',
  'Docker', 'AWS', 'Git', 'REST API', 'GraphQL', 'Redis',
  'FastAPI', 'PostgreSQL', 'Java', 'JavaFX', 'OOP', 'XGBoost',
  'LightGBM', 'SHAP/LIME', 'Uvicorn', 'Gavicorn', 'C++', 'TypeScript'
];

export default function StepProjects({ data, onUpdate }) {
  const [activeProject, setActiveProject] = useState(0);
  const [techInput, setTechInput] = useState('');
  
  const projects = data.projects || [{ ...EMPTY_PROJECT }];

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate({ ...data, projects: updated });
  };

  const addProject = () => {
    if (projects.length < 4) {
      const updated = [...projects, { ...EMPTY_PROJECT }];
      onUpdate({ ...data, projects: updated });
      setActiveProject(updated.length - 1);
    }
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      const updated = projects.filter((_, i) => i !== index);
      onUpdate({ ...data, projects: updated });
      setActiveProject(Math.max(0, index - 1));
    }
  };

  const addTech = (tech) => {
    const current = projects[activeProject].techStack || [];
    if (!current.includes(tech)) {
      updateProject(activeProject, 'techStack', [...current, tech]);
    }
    setTechInput('');
  };

  const removeTech = (tech) => {
    const current = projects[activeProject].techStack || [];
    updateProject(activeProject, 'techStack', current.filter(t => t !== tech));
  };

  const handleTechKeyPress = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      addTech(techInput.trim());
    }
  };

  const updateBullet = (bulletIndex, value) => {
    const currentBullets = [...(projects[activeProject].bullets || ['', '', ''])];
    currentBullets[bulletIndex] = value;
    updateProject(activeProject, 'bullets', currentBullets);
  };

  const addBullet = () => {
    const currentBullets = [...(projects[activeProject].bullets || [])];
    if (currentBullets.length < 5) {
      updateProject(activeProject, 'bullets', [...currentBullets, '']);
    }
  };

  const removeBullet = (bulletIndex) => {
    const currentBullets = [...(projects[activeProject].bullets || [])];
    if (currentBullets.length > 1) {
      updateProject(activeProject, 'bullets', currentBullets.filter((_, i) => i !== bulletIndex));
    }
  };

  const currentProject = projects[activeProject] || EMPTY_PROJECT;
  const currentBullets = currentProject.bullets || ['', '', ''];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Projects</h2>
        <p className="text-gray-600">Add 1-4 projects. Write specific bullets about what YOU did</p>
      </div>

      {/* Project Tabs */}
      <div className="flex gap-2 items-center flex-wrap">
        {projects.map((project, index) => (
          <div key={index} className="relative">
            <button
              type="button"
              onClick={() => setActiveProject(index)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                activeProject === index
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {project.name || `Project ${index + 1}`}
            </button>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeProject(index);
                }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {projects.length < 4 && (
          <button
            type="button"
            onClick={addProject}
            className="px-4 py-2 text-sm font-medium text-gray-600 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition"
          >
            + Add Project
          </button>
        )}
      </div>

      {/* Project Form */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name *
          </label>
          <input
            type="text"
            value={currentProject.name}
            onChange={(e) => updateProject(activeProject, 'name', e.target.value)}
            placeholder="e.g., TaskFlow, CodeBuddy, WeatherNow"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role / Subtitle
          </label>
          <input
            type="text"
            value={currentProject.role || ''}
            onChange={(e) => updateProject(activeProject, 'role', e.target.value)}
            placeholder="e.g., Full-Stack Developer | Personal Project"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
          />
        </div>

        {/* Bullet Points */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bullet Points *
          </label>
          <p className="text-xs text-gray-500 mb-3">Write what you actually did. Start with action verbs (Built, Implemented, Worked on, Utilized...)</p>
          
          <div className="space-y-2">
            {currentBullets.map((bullet, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="mt-3 text-gray-400 text-sm">•</span>
                <textarea
                  value={bullet}
                  onChange={(e) => updateBullet(i, e.target.value)}
                  placeholder={
                    i === 0 ? "e.g., Built a full-stack web application with user authentication and real-time data sync" :
                    i === 1 ? "e.g., Implemented RESTful API endpoints with input validation and error handling" :
                    "e.g., Designed responsive UI components using React and integrated third-party APIs"
                  }
                  rows={2}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white resize-none"
                />
                {currentBullets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBullet(i)}
                    className="mt-2 text-gray-400 hover:text-red-500 transition text-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {currentBullets.length < 5 && (
            <button
              type="button"
              onClick={addBullet}
              className="mt-2 text-sm text-gray-500 hover:text-black transition"
            >
              + Add another bullet
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Impact
          </label>
          <input
            type="text"
            value={currentProject.impact || ''}
            onChange={(e) => updateProject(activeProject, 'impact', e.target.value)}
            placeholder="e.g., Deployed to production; serving 500+ active users"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tech Stack
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {TECH_SUGGESTIONS.map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => addTech(tech)}
                disabled={(currentProject.techStack || []).includes(tech)}
                className={`px-2 py-1 text-xs rounded border transition ${
                  (currentProject.techStack || []).includes(tech)
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyPress={handleTechKeyPress}
              placeholder="Add custom tech..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
            />
            <button
              type="button"
              onClick={() => techInput.trim() && addTech(techInput.trim())}
              className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Add
            </button>
          </div>
          
          {(currentProject.techStack || []).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {currentProject.techStack.map(tech => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white rounded-full text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="ml-1 hover:text-gray-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Preview of bullets */}
      {currentBullets.some(b => b.trim()) && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm font-medium text-green-800 mb-2">Preview:</p>
          <ul className="space-y-1">
            {currentBullets.filter(b => b.trim()).map((bullet, i) => {
              const cleaned = cleanBullet(bullet);
              const hasVerb = startsWithActionVerb(bullet);
              return (
                <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>
                    {cleaned}
                    {!hasVerb && cleaned && (
                      <span className="ml-2 text-xs text-amber-600">(tip: start with an action verb)</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
