import React, { useState } from 'react';
import { ChevronRight, Menu, Globe2, MoreVertical, Home, PlusCircle } from 'lucide-react';
import { codelabs } from './data/codelabs';
import Codelab from './components/Codelab';
import NewCodelab from './components/NewCodelab';

function App() {
  const [selectedCodelab, setSelectedCodelab] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCreatingCodelab, setIsCreatingCodelab] = useState(false);

  const handleNext = () => {
    if (selectedCodelab && currentStep < codelabs[selectedCodelab].steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSelectCodelab = (id: string) => {
    setSelectedCodelab(id);
    setCurrentStep(0);
    setIsCreatingCodelab(false);
  };

  const handleHome = () => {
    setSelectedCodelab(null);
    setCurrentStep(0);
    setIsCreatingCodelab(false);
  };

  const handleCreateCodelab = () => {
    setSelectedCodelab(null);
    setCurrentStep(0);
    setIsCreatingCodelab(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-medium text-gray-900">React Codelabs</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleHome} className="p-2 hover:bg-gray-100 rounded-full">
              <Home className="w-5 h-5" />
            </button>
            <button onClick={handleCreateCodelab} className="p-2 hover:bg-gray-100 rounded-full">
              <PlusCircle className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full flex items-center">
              <Globe2 className="w-5 h-5" />
              <span className="ml-1">English</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <nav className="w-80 bg-white border-r h-[calc(100vh-4rem)] overflow-y-auto">
            {selectedCodelab ? (
              codelabs[selectedCodelab].steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center ${
                    index === currentStep ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                    index === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="text-sm">{step.title}</span>
                </button>
              ))
            ) : (
              Object.entries(codelabs).map(([id, codelab]) => (
                <button
                  key={id}
                  onClick={() => handleSelectCodelab(id)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center"
                >
                  <span className="text-sm">{codelab.title}</span>
                </button>
              ))
            )}
          </nav>
        )}

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="max-w-4xl mx-auto">
            {isCreatingCodelab ? (
              <NewCodelab />
            ) : selectedCodelab ? (
              <>
                <h2 className="text-3xl font-medium text-gray-900 mb-8">
                  {codelabs[selectedCodelab].steps[currentStep].title}
                </h2>
                <Codelab step={codelabs[selectedCodelab].steps[currentStep]} />
                <div className="flex justify-between mt-8">
                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg flex items-center hover:bg-gray-300"
                    >
                      Previous
                    </button>
                  )}
                  {currentStep < codelabs[selectedCodelab].steps.length - 1 && (
                    <button
                      onClick={handleNext}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 ml-auto"
                    >
                      Next
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-medium text-gray-900 mb-8">Welcome to React Codelabs</h2>
                <p className="text-xl text-gray-600 mb-8">Select a codelab from the sidebar to get started or create a new one.</p>
                <button
                  onClick={handleCreateCodelab}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700 mx-auto"
                >
                  <PlusCircle className="mr-2 w-5 h-5" />
                  Create New Codelab
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;