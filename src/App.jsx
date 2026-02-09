import { useState, useEffect } from 'react';
import StepBasics from './components/StepBasics';
import StepCourses from './components/StepCourses';
import StepTools from './components/StepTools';
import StepProjects from './components/StepProjects';
import StepExtras from './components/StepExtras';
import Preview from './components/Preview';
import { downloadHTML, downloadPDF, copyToClipboard, saveToLocalStorage, loadFromLocalStorage } from './utils/export';

const STEPS = [
  { id: 'basics', label: 'Basics', component: StepBasics },
  { id: 'courses', label: 'Courses', component: StepCourses },
  { id: 'tools', label: 'Skills', component: StepTools },
  { id: 'projects', label: 'Projects', component: StepProjects },
  { id: 'extras', label: 'Extras', component: StepExtras },
];

const INITIAL_DATA = {
  name: '',
  summary: '',
  degree: '',
  university: '',
  gradYear: '',
  cgpa: '',
  email: '',
  phone: '',
  github: '',
  linkedin: '',
  courses: [],
  languages: [],
  tools: [],
  frameworks: [],
  projects: [{ name: '', problem: '', solution: '', techStack: [] }],
  achievements: [],
  certifications: []
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      setFormData({ ...INITIAL_DATA, ...saved });
    }
  }, []);

  // Auto-save on changes
  useEffect(() => {
    const timer = setTimeout(() => {
      saveToLocalStorage(formData);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleUpdate = (newData) => {
    setFormData(newData);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCopy = () => {
    copyToClipboard(formData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHTML = () => {
    downloadHTML(formData);
  };

  const handleDownloadPDF = () => {
    downloadPDF(formData);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure? This will clear all your data.')) {
      setFormData(INITIAL_DATA);
      setCurrentStep(0);
      localStorage.removeItem('portfolio-data');
    }
  };

  const CurrentStepComponent = STEPS[currentStep].component;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Portfolio Generator</h1>
            <p className="text-sm text-gray-500">Build your ATS-friendly portfolio in minutes</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="md:hidden px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Form Section */}
          <div className={`flex-1 ${showPreview ? 'hidden md:block' : ''}`}>
            <div className="bg-white rounded-2xl shadow-sm border p-6 no-print">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Step {currentStep + 1} of {STEPS.length}
                  </span>
                  <span className="text-sm text-gray-500">{STEPS[currentStep].label}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex gap-2 mb-6">
                {STEPS.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(index)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition ${
                      index === currentStep
                        ? 'bg-black text-white'
                        : index < currentStep
                        ? 'bg-gray-200 text-gray-700'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>

              {/* Form Content */}
              <CurrentStepComponent data={formData} onUpdate={handleUpdate} />

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 font-medium rounded-lg transition ${
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Back
                </button>
                
                {currentStep < STEPS.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition"
                  >
                    Continue
                  </button>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition text-sm"
                    >
                      {copied ? '✓ Copied!' : 'Copy Text'}
                    </button>
                    <button
                      onClick={handleDownloadHTML}
                      className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition text-sm"
                    >
                      HTML
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition text-sm"
                    >
                      Download PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className={`w-full md:w-[450px] ${!showPreview ? 'hidden md:block' : ''}`}>
            <div className="bg-white rounded-2xl shadow-sm border sticky top-24 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b flex justify-between items-center no-print">
                <span className="text-sm font-medium text-gray-600">Live Preview</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
                <Preview data={formData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 no-print">
        <p>Built with React + Tailwind • Made for students, by students</p>
      </footer>
    </div>
  );
}

export default App;
