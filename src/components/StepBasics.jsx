export default function StepBasics({ data, onUpdate }) {
  const handleChange = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's start with the basics</h2>
        <p className="text-gray-600">This info goes at the top of your portfolio</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professional Summary
          </label>
          <textarea
            value={data.summary || ''}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Motivated Computer Science student with hands-on experience in web development and a passion for building user-centric applications..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">2-3 sentences about yourself (helps fill the page)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree / Major *
            </label>
            <input
              type="text"
              value={data.degree || ''}
              onChange={(e) => handleChange('degree', e.target.value)}
              placeholder="B.Tech in Computer Science"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              University *
            </label>
            <input
              type="text"
              value={data.university || ''}
              onChange={(e) => handleChange('university', e.target.value)}
              placeholder="Indian Institute of Technology"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year
            </label>
            <input
              type="text"
              value={data.gradYear || ''}
              onChange={(e) => handleChange('gradYear', e.target.value)}
              placeholder="Expected 2026"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CGPA / GPA
            </label>
            <input
              type="text"
              value={data.cgpa || ''}
              onChange={(e) => handleChange('cgpa', e.target.value)}
              placeholder="8.5/10 or 3.7/4.0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg text-sm">
                github.com/
              </span>
              <input
                type="text"
                value={data.github || ''}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="johndoe"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Username
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg text-sm">
                linkedin.com/in/
              </span>
              <input
                type="text"
                value={data.linkedin || ''}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="johndoe"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
