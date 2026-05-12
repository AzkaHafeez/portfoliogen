import { useState } from 'react';

const PRESET_COURSES = [
  'Data Structures & Algorithms', 'Object-Oriented Programming',
  'Database Systems', 'Computer Networks', 'Operating Systems',
  'Artificial Intelligence', 'Machine Learning', 'Web Development',
  'Software Engineering', 'Information Security', 'Compiler Design',
  'Computer Graphics',
];

const EMPTY_EDUCATION = {
  degree: '', institution: '', location: '', dateRange: '', grade: '', courses: []
};

export default function StepBasics({ data, onUpdate }) {
  const [courseInput, setCourseInput] = useState('');
  const [activeEdu, setActiveEdu] = useState(0);

  const handleChange = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  const education = data.education || [{ ...EMPTY_EDUCATION }];

  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate({ ...data, education: updated });
  };

  const addEducation = () => {
    if (education.length < 2) {
      const updated = [...education, { ...EMPTY_EDUCATION }];
      onUpdate({ ...data, education: updated });
      setActiveEdu(updated.length - 1);
    }
  };

  const removeEducation = (index) => {
    if (education.length > 1) {
      const updated = education.filter((_, i) => i !== index);
      onUpdate({ ...data, education: updated });
      setActiveEdu(Math.max(0, index - 1));
    }
  };

  const toggleCourse = (eduIndex, courseLabel) => {
    const current = education[eduIndex].courses || [];
    const updated = current.includes(courseLabel)
      ? current.filter(c => c !== courseLabel)
      : [...current, courseLabel];
    updateEducation(eduIndex, 'courses', updated);
  };

  const addCustomCourse = () => {
    if (courseInput.trim()) {
      const current = education[activeEdu].courses || [];
      if (!current.includes(courseInput.trim())) {
        updateEducation(activeEdu, 'courses', [...current, courseInput.trim()]);
      }
      setCourseInput('');
    }
  };

  const currentEdu = education[activeEdu] || EMPTY_EDUCATION;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's start with the basics</h2>
        <p className="text-gray-600">Your personal info and education go at the top of your portfolio</p>
      </div>

      {/* Personal Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Alex Chen"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
          <textarea
            value={data.summary || ''}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Motivated Computer Science student with hands-on experience in web development and a passion for building user-centric applications..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">2-3 sentences about yourself</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="alex@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Username</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg text-sm">
                https://github.com/
              </span>
              <input
                type="text"
                value={data.github || ''}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="username"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Username</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg text-sm">
                www.linkedin.com/in/
              </span>
              <input
                type="text"
                value={data.linkedin || ''}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="username"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="pt-4 border-t">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Education</h3>

        {/* Education Tabs */}
        <div className="flex gap-2 items-center mb-4">
          {education.map((edu, index) => (
            <div key={index} className="relative">
              <button
                type="button"
                onClick={() => setActiveEdu(index)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                  activeEdu === index
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                }`}
              >
                {edu.degree || `Education ${index + 1}`}
              </button>
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeEducation(index); }}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {education.length < 2 && (
            <button
              type="button"
              onClick={addEducation}
              className="px-4 py-2 text-sm font-medium text-gray-600 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition"
            >
              + Add Education
            </button>
          )}
        </div>

        {/* Education Form */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree / Major *</label>
            <input
              type="text"
              value={currentEdu.degree}
              onChange={(e) => updateEducation(activeEdu, 'degree', e.target.value)}
              placeholder="B.Tech in Computer Science"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution *</label>
              <input
                type="text"
                value={currentEdu.institution}
                onChange={(e) => updateEducation(activeEdu, 'institution', e.target.value)}
                placeholder="State University of Technology"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={currentEdu.location}
                onChange={(e) => updateEducation(activeEdu, 'location', e.target.value)}
                placeholder="City, Country"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <input
                type="text"
                value={currentEdu.dateRange}
                onChange={(e) => updateEducation(activeEdu, 'dateRange', e.target.value)}
                placeholder="Expected 2026"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grade / CGPA</label>
              <input
                type="text"
                value={currentEdu.grade}
                onChange={(e) => updateEducation(activeEdu, 'grade', e.target.value)}
                placeholder="CGPA: 3.8/4.0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
              />
            </div>
          </div>

          {/* Relevant Coursework */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Coursework</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESET_COURSES.map(course => (
                <button
                  key={course}
                  type="button"
                  onClick={() => toggleCourse(activeEdu, course)}
                  className={`px-2 py-1 text-xs rounded border transition ${
                    (currentEdu.courses || []).includes(course)
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomCourse(); } }}
                placeholder="Add custom course..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
              />
              <button
                type="button"
                onClick={addCustomCourse}
                className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>

            {(currentEdu.courses || []).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {currentEdu.courses.map(course => (
                  <span key={course} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {course}
                    <button type="button" onClick={() => toggleCourse(activeEdu, course)} className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
