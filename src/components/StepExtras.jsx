import { useState } from 'react';

const PROFICIENCY_LEVELS = ['Native', 'Fluent', 'Proficient', 'Intermediate', 'Basic'];

const LANGUAGE_SUGGESTIONS = ['English', 'Urdu', 'Punjabi', 'Hindi', 'Arabic', 'Chinese', 'Spanish', 'French', 'German'];

export default function StepExtras({ data, onUpdate }) {
  const [achievementInput, setAchievementInput] = useState('');
  const [certInput, setCertInput] = useState('');
  const [langName, setLangName] = useState('');
  const [langProficiency, setLangProficiency] = useState('Fluent');
  const [infoInput, setInfoInput] = useState('');

  const achievements = data.achievements || [];
  const certifications = data.certifications || [];
  const spokenLanguages = data.spokenLanguages || [];
  const additionalInfo = data.additionalInfo || [];

  // Achievements
  const addAchievement = () => {
    if (achievementInput.trim()) {
      onUpdate({ ...data, achievements: [...achievements, achievementInput.trim()] });
      setAchievementInput('');
    }
  };

  const removeAchievement = (index) => {
    onUpdate({ ...data, achievements: achievements.filter((_, i) => i !== index) });
  };

  // Certifications
  const addCertification = () => {
    if (certInput.trim()) {
      onUpdate({ ...data, certifications: [...certifications, certInput.trim()] });
      setCertInput('');
    }
  };

  const removeCertification = (index) => {
    onUpdate({ ...data, certifications: certifications.filter((_, i) => i !== index) });
  };

  // Spoken Languages
  const addLanguage = () => {
    if (langName.trim()) {
      onUpdate({
        ...data,
        spokenLanguages: [...spokenLanguages, { name: langName.trim(), proficiency: langProficiency }]
      });
      setLangName('');
      setLangProficiency('Fluent');
    }
  };

  const removeLanguage = (index) => {
    onUpdate({ ...data, spokenLanguages: spokenLanguages.filter((_, i) => i !== index) });
  };

  // Additional Info
  const addInfo = () => {
    if (infoInput.trim()) {
      onUpdate({ ...data, additionalInfo: [...additionalInfo, infoInput.trim()] });
      setInfoInput('');
    }
  };

  const removeInfo = (index) => {
    onUpdate({ ...data, additionalInfo: additionalInfo.filter((_, i) => i !== index) });
  };

  const handleKeyPress = (callback) => (e) => {
    if (e.key === 'Enter') { e.preventDefault(); callback(); }
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
    "Introduction to Cybersecurity - Cisco (Networking Academy)",
    "Introduction to Modern AI - Cisco (Networking Academy)",
    "AWS Certified Cloud Practitioner",
    "Google Data Analytics Certificate",
    "Meta Front-End Developer Certificate",
    "Coursera Deep Learning Specialization",
  ];

  const infoSuggestions = [
    "Engaged in the developer community through Google Developer Groups (GDG)",
    "Participated in engineering initiatives under ASME",
    "Active member of Association for Computing Machinery (ACM)",
    "Contributed to open-source projects",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Extras & Details</h2>
        <p className="text-gray-600">Languages, achievements, certifications, and more</p>
      </div>

      {/* Spoken Languages Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Spoken Languages</label>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {LANGUAGE_SUGGESTIONS.map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => {
                if (!spokenLanguages.some(l => l.name === lang)) {
                  setLangName(lang);
                }
              }}
              disabled={spokenLanguages.some(l => l.name === lang)}
              className={`px-2 py-1 text-xs rounded border transition ${
                spokenLanguages.some(l => l.name === lang)
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
              }`}
            >
              + {lang}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={langName}
            onChange={(e) => setLangName(e.target.value)}
            onKeyPress={handleKeyPress(addLanguage)}
            placeholder="Language name..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
          <select
            value={langProficiency}
            onChange={(e) => setLangProficiency(e.target.value)}
            className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition bg-white"
          >
            {PROFICIENCY_LEVELS.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={addLanguage}
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition"
          >
            Add
          </button>
        </div>

        {spokenLanguages.length > 0 && (
          <div className="space-y-2 mt-3">
            {spokenLanguages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{lang.name} <span className="text-gray-500">({lang.proficiency})</span></span>
                <button type="button" onClick={() => removeLanguage(index)} className="text-gray-400 hover:text-red-500 transition">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="space-y-3 pt-4 border-t">
        <label className="block text-sm font-medium text-gray-700">Achievements & Awards</label>
        
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
            onKeyPress={handleKeyPress(addAchievement)}
            placeholder="Add your own achievement..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
          <button type="button" onClick={addAchievement} className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">Add</button>
        </div>

        {achievements.length > 0 && (
          <div className="space-y-2 mt-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{achievement}</span>
                <button type="button" onClick={() => removeAchievement(index)} className="text-gray-400 hover:text-red-500 transition">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications Section */}
      <div className="space-y-3 pt-4 border-t">
        <label className="block text-sm font-medium text-gray-700">Certifications & Courses</label>
        
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
            onKeyPress={handleKeyPress(addCertification)}
            placeholder="Add certification or online course..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
          <button type="button" onClick={addCertification} className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">Add</button>
        </div>

        {certifications.length > 0 && (
          <div className="space-y-2 mt-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{cert}</span>
                <button type="button" onClick={() => removeCertification(index)} className="text-gray-400 hover:text-red-500 transition">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Information Section */}
      <div className="space-y-3 pt-4 border-t">
        <label className="block text-sm font-medium text-gray-700">Additional Information</label>
        <p className="text-xs text-gray-500 -mt-1">Clubs, organizations, volunteer work, etc.</p>

        <div className="flex flex-wrap gap-2 mb-2">
          {infoSuggestions.map((suggestion, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (!additionalInfo.includes(suggestion)) {
                  onUpdate({ ...data, additionalInfo: [...additionalInfo, suggestion] });
                }
              }}
              disabled={additionalInfo.includes(suggestion)}
              className={`px-2 py-1 text-xs rounded border transition ${
                additionalInfo.includes(suggestion)
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
            value={infoInput}
            onChange={(e) => setInfoInput(e.target.value)}
            onKeyPress={handleKeyPress(addInfo)}
            placeholder="Add additional info..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
          <button type="button" onClick={addInfo} className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">Add</button>
        </div>

        {additionalInfo.length > 0 && (
          <div className="space-y-2 mt-3">
            {additionalInfo.map((info, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{info}</span>
                <button type="button" onClick={() => removeInfo(index)} className="text-gray-400 hover:text-red-500 transition">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mt-4">
        <p className="text-sm font-medium text-blue-800 mb-2">Tips for a full-page portfolio:</p>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Add 2-3 spoken languages with proficiency levels</li>
          <li>• Add 2-3 achievements (hackathons, competitions, academic awards)</li>
          <li>• Include 1-2 relevant certifications</li>
          <li>• Add clubs or organizations under Additional Information</li>
          <li>• Make sure you've filled in your professional summary</li>
        </ul>
      </div>
    </div>
  );
}
