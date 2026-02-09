import { useState } from 'react';

export default function StepExtras({ data, onUpdate }) {
  const [achievementInput, setAchievementInput] = useState('');
  const [certInput, setCertInput] = useState('');

  const achievements = data.achievements || [];
  const certifications = data.certifications || [];

  const addAchievement = () => {
    if (achievementInput.trim()) {
      onUpdate({ ...data, achievements: [...achievements, achievementInput.trim()] });
      setAchievementInput('');
    }
  };

  const removeAchievement = (index) => {
    onUpdate({ ...data, achievements: achievements.filter((_, i) => i !== index) });
  };

  const addCertification = () => {
    if (certInput.trim()) {
      onUpdate({ ...data, certifications: [...certifications, certInput.trim()] });
      setCertInput('');
    }
  };

  const removeCertification = (index) => {
    onUpdate({ ...data, certifications: certifications.filter((_, i) => i !== index) });
  };

  const handleAchievementKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAchievement();
    }
  };

  const handleCertKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCertification();
    }
  };

  const achievementSuggestions = [
    "Dean's List for Academic Excellence",
    "1st Place in Hackathon",
    "Published research paper",
    "Open source contributor",
    "500+ LeetCode problems solved",
    "Google Cloud certified",
  ];

  const certSuggestions = [
    "AWS Certified Cloud Practitioner",
    "Google Data Analytics Certificate",
    "Meta Front-End Developer Certificate",
    "IBM Data Science Professional Certificate",
    "Microsoft Azure Fundamentals",
    "Coursera Deep Learning Specialization",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievements & Certifications</h2>
        <p className="text-gray-600">Add accomplishments to make your portfolio stand out</p>
      </div>

      {/* Achievements Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Achievements & Awards
        </label>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {achievementSuggestions.map((suggestion, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (!achievements.includes(suggestion)) {
                  onUpdate({ ...data, achievements: [...achievements, suggestion] });
                }
              }}
              disabled={achievements.includes(suggestion)}
              className={`px-2 py-1 text-xs rounded border transition ${
                achievements.includes(suggestion)
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
              }`}
            >
              + {suggestion}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={achievementInput}
            onChange={(e) => setAchievementInput(e.target.value)}
            onKeyPress={handleAchievementKeyPress}
            placeholder="Add your own achievement..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
          <button
            type="button"
            onClick={addAchievement}
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition"
          >
            Add
          </button>
        </div>

        {achievements.length > 0 && (
          <div className="space-y-2 mt-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-700">{achievement}</span>
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications Section */}
      <div className="space-y-3 pt-4 border-t">
        <label className="block text-sm font-medium text-gray-700">
          Certifications & Courses
        </label>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {certSuggestions.map((suggestion, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (!certifications.includes(suggestion)) {
                  onUpdate({ ...data, certifications: [...certifications, suggestion] });
                }
              }}
              disabled={certifications.includes(suggestion)}
              className={`px-2 py-1 text-xs rounded border transition ${
                certifications.includes(suggestion)
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
              }`}
            >
              + {suggestion}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            onKeyPress={handleCertKeyPress}
            placeholder="Add certification or online course..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
          <button
            type="button"
            onClick={addCertification}
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition"
          >
            Add
          </button>
        </div>

        {certifications.length > 0 && (
          <div className="space-y-2 mt-3">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-sm text-gray-700">{cert}</span>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mt-4">
        <p className="text-sm font-medium text-blue-800 mb-2">Tips for a full-page portfolio:</p>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Add 2-3 achievements (hackathons, competitions, academic awards)</li>
          <li>• Include 1-2 relevant certifications</li>
          <li>• Make sure you've filled in your professional summary</li>
          <li>• Add at least 2 projects with detailed descriptions</li>
        </ul>
      </div>
    </div>
  );
}
