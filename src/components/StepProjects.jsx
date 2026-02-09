import { useState } from 'react';
import { generateBullets } from '../utils/bulletWriter';

const EMPTY_PROJECT = {
  name: '',
  problem: '',
  solution: '',
  techStack: []
};

const TECH_SUGGESTIONS = [
  'React', 'Node.js', 'Python', 'JavaScript', 'MongoDB', 'MySQL', 
  'Firebase', 'Express', 'Django', 'Flask', 'HTML/CSS', 'Tailwind',
  'Docker', 'AWS', 'Git', 'REST API', 'GraphQL', 'Redis'
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
    if (projects.length < 3) {
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

  const currentProject = projects[activeProject] || EMPTY_PROJECT;
  const previewBullets = currentProject.solution 
    ? generateBullets(currentProject.name, currentProject.problem, currentProject.solution, currentProject.techStack || [])
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Projects</h2>
        <p className="text-gray-600">Add 1-3 projects. Quality over quantity – recruiters scan fast</p>
      </div>

      {/* Project Tabs */}
      <div className="flex gap-2 items-center">
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
        {projects.length < 3 && (
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
            Problem (1 line) *
          </label>
          <input
            type="text"
            value={currentProject.problem}
            onChange={(e) => updateProject(activeProject, 'problem', e.target.value)}
            placeholder="e.g., Students struggle to track assignments"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1">{currentProject.problem.length}/100 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Solution (1 line) *
          </label>
          <input
            type="text"
            value={currentProject.solution}
            onChange={(e) => updateProject(activeProject, 'solution', e.target.value)}
            placeholder="e.g., Built a todo app with reminders and calendar sync"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
            maxLength={120}
          />
          <p className="text-xs text-gray-500 mt-1">{currentProject.solution.length}/120 characters</p>
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

      {/* Live Bullet Preview */}
      {previewBullets.length > 0 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm font-medium text-green-800 mb-2">✨ Auto-generated bullets:</p>
          <ul className="space-y-1">
            {previewBullets.map((bullet, i) => (
              <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                <span className="mt-1">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-green-600 mt-2">These will appear on your portfolio</p>
        </div>
      )}
    </div>
  );
}
