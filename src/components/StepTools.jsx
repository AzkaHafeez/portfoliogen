import { useState } from 'react';

const SKILL_CATEGORIES = {
  languages: {
    label: 'Programming Languages',
    items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin']
  },
  tools: {
    label: 'Tools & Technologies',
    items: ['Git', 'GitHub', 'Docker', 'Linux', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Azure', 'GCP', 'Kubernetes', 'Jenkins', 'VS Code']
  },
  frameworks: {
    label: 'Frameworks & Libraries',
    items: ['React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'TensorFlow', 'PyTorch']
  }
};

export default function StepTools({ data, onUpdate }) {
  const [customSkill, setCustomSkill] = useState('');
  const [activeCategory, setActiveCategory] = useState('languages');

  const getSkillsByCategory = (category) => {
    return data[category] || [];
  };

  const toggleSkill = (category, skill) => {
    const current = getSkillsByCategory(category);
    const updated = current.includes(skill)
      ? current.filter(s => s !== skill)
      : [...current, skill];
    onUpdate({ ...data, [category]: updated });
  };

  const addCustomSkill = () => {
    if (customSkill.trim()) {
      const current = getSkillsByCategory(activeCategory);
      if (!current.includes(customSkill.trim())) {
        onUpdate({ ...data, [activeCategory]: [...current, customSkill.trim()] });
      }
      setCustomSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomSkill();
    }
  };

  const getTotalSkills = () => {
    return (data.languages?.length || 0) + (data.tools?.length || 0) + (data.frameworks?.length || 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Technical Skills</h2>
        <p className="text-gray-600">Select the technologies you're comfortable with</p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 border-b">
        {Object.entries(SKILL_CATEGORIES).map(([key, { label }]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
              activeCategory === key
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
            {getSkillsByCategory(key).length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                {getSkillsByCategory(key).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {SKILL_CATEGORIES[activeCategory].items.map(skill => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(activeCategory, skill)}
            className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
              getSkillsByCategory(activeCategory).includes(skill)
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>

      {/* Custom Skill Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add custom {SKILL_CATEGORIES[activeCategory].label.toLowerCase()}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`e.g., ${activeCategory === 'languages' ? 'Scala' : activeCategory === 'tools' ? 'Postman' : 'FastAPI'}`}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
          <button
            type="button"
            onClick={addCustomSkill}
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Summary */}
      {getTotalSkills() > 0 && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-3">
            Total skills selected: <span className="font-semibold">{getTotalSkills()}</span>
          </p>
          
          {Object.entries(SKILL_CATEGORIES).map(([key, { label }]) => {
            const skills = getSkillsByCategory(key);
            if (skills.length === 0) return null;
            
            return (
              <div key={key} className="mb-3">
                <p className="text-xs font-medium text-gray-500 uppercase mb-1">{label}</p>
                <div className="flex flex-wrap gap-1">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => toggleSkill(key, skill)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
