import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Step {
  title: string;
  content: string;
}

const NewCodelab: React.FC = () => {
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState<Step[]>([{ title: '', content: '' }]);

  const handleAddStep = () => {
    setSteps([...steps, { title: '', content: '' }]);
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleStepChange = (index: number, field: 'title' | 'content', value: string) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new codelab data to your backend or state management system
    console.log({ title, steps });
    // Reset form after submission
    setTitle('');
    setSteps([{ title: '', content: '' }]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium text-gray-900 mb-8">Create New Codelab</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Codelab Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {steps.map((step, index) => (
          <div key={index} className="mb-6 p-4 border rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Step {index + 1}</h3>
              {steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor={`step-title-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                Step Title
              </label>
              <input
                type="text"
                id={`step-title-${index}`}
                value={step.title}
                onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor={`step-content-${index}`} className="block text-sm font-medium text-gray-700 mb-2">
                Step Content (Markdown)
              </label>
              <textarea
                id={`step-content-${index}`}
                value={step.content}
                onChange={(e) => handleStepChange(index, 'content', e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddStep}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <PlusCircle size={20} className="mr-2" />
          Add Step
        </button>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Codelab
        </button>
      </form>
    </div>
  );
};

export default NewCodelab;