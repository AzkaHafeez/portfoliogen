import { useState } from 'react';

const PRESET_COURSES = [
  { id: 'dsa', label: 'Data Structures & Algorithms' },
  { id: 'oop', label: 'Object Oriented Programming' },
  { id: 'dbms', label: 'Database Management Systems' },
  { id: 'os', label: 'Operating Systems' },
  { id: 'cn', label: 'Computer Networks' },
  { id: 'ai', label: 'Artificial Intelligence' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'web', label: 'Web Development' },
  { id: 'se', label: 'Software Engineering' },
  { id: 'toc', label: 'Theory of Computation' },
  { id: 'cd', label: 'Compiler Design' },
  { id: 'cg', label: 'Computer Graphics' },
];

export default function StepCourses({ data, onUpdate }) {
  const [customCourse, setCustomCourse] = useState('');
  
  const courses = data.courses || [];

  const toggleCourse = (courseLabel) => {
    const updated = courses.includes(courseLabel)
      ? courses.filter(c => c !== courseLabel)
      : [...courses, courseLabel];
    onUpdate({ ...data, courses: updated });
  };

  const addCustomCourse = () => {
    if (customCourse.trim() && !courses.includes(customCourse.trim())) {
      onUpdate({ ...data, courses: [...courses, customCourse.trim()] });
      setCustomCourse('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomCourse();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Relevant Coursework</h2>
        <p className="text-gray-600">Select courses you've completed or are currently taking</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {PRESET_COURSES.map(course => (
          <button
            key={course.id}
            type="button"
            onClick={() => toggleCourse(course.label)}
            className={`px-4 py-3 text-sm font-medium rounded-lg border-2 transition-all ${
              courses.includes(course.label)
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            {course.label}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add custom course
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customCourse}
            onChange={(e) => setCustomCourse(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., Cryptography, Cloud Computing"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
          <button
            type="button"
            onClick={addCustomCourse}
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition"
          >
            Add
          </button>
        </div>
      </div>

      {courses.length > 0 && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Selected courses ({courses.length}):</p>
          <div className="flex flex-wrap gap-2">
            {courses.map(course => (
              <span
                key={course}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {course}
                <button
                  type="button"
                  onClick={() => toggleCourse(course)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
