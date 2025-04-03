import React, { useState, useEffect } from "react";
import { Heap } from "../utils/Heap";
import TreeView from "./TreeView";

const HeapVisualizer = ({ darkMode }) => {
  // State management
  const [inputArray, setInputArray] = useState("10,5,20,3,8,15,25");
  const [array, setArray] = useState([]);
  const [heap, setHeap] = useState(null);
  const [heapType, setHeapType] = useState("min");
  const [animationSpeed, setAnimationSpeed] = useState(1000);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [stepDescription, setStepDescription] = useState("");
  
  // Handle input array change
  const handleArrayInput = (e) => {
    setInputArray(e.target.value);
  };

  // Convert input to array and create tree
  const handleConvertToTree = () => {
    if (!inputArray.trim()) return;
    
    try {
      // Parse input string to array of numbers
      const parsedArray = inputArray.split(",")
        .map(item => item.trim())
        .filter(item => item !== "")
        .map(item => {
          const num = Number(item);
          if (isNaN(num)) throw new Error("Invalid input");
          return num;
        });
      
      if (parsedArray.length === 0) throw new Error("Empty array");
      
      setArray(parsedArray);
      // Reset other states
      setHeap(null);
      setAnimationSteps([
        // Add initial step with unsorted array
        {
          heap: [...parsedArray],
          sorted: [],
          activeIndex: null,
          isHeapified: false // Mark as not heapified yet
        }
      ]);
      setCurrentStep(0);
      setStepDescription("Initial unsorted array");
      
      // Initial tree is drawn by the TreeView component
    } catch (error) {
      alert(`Error: ${error.message}. Please enter valid numbers separated by commas.`);
    }
  };

  // Toggle between Max and Min Heap
  const toggleHeapType = (type) => {
    if (type === heapType) return;
    setHeapType(type);
    
    if (array.length > 0) {
      // Reset animation states
      setAnimationSteps([]);
      setCurrentStep(0);
      setStepDescription("");
      
      // Tree is redrawn by the TreeView component
    }
  };

  // Build heap and prepare animation steps
  const handleBuildHeap = () => {
    if (array.length === 0) return;
    
    // Create a new heap with the array
    const newHeap = new Heap(heapType, [...array]);
    
    // Create steps in the new format (compatible with heap sort steps)
    const steps = [];
    const descriptions = [];
    
    // Capture the final heap state
    steps.push({
      heap: [...newHeap.heap],
      sorted: [],
      activeIndex: null,
      isHeapified: true // Set isHeapified to true for the heap
    });
    descriptions.push(`Built a ${heapType} heap from the array`);
    
    setHeap(newHeap);
    setAnimationSteps(steps);
    setStepDescription("Heap built successfully");
    setCurrentStep(0);
  };

  // Perform heap sort and prepare steps
  const handleSort = () => {
    if (!heap) return;
    
    // Use the enhanced heapSort method with trackSteps=true
    const { steps, descriptions } = heap.heapSort(true);
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    setStepDescription(descriptions[0]);
  };

  // Handle manual navigation - previous step
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (animationSteps.length > 0 && heap) {
        const { descriptions } = heap.heapSort(true);
        setStepDescription(descriptions[currentStep - 1]);
      }
    }
  };

  // Handle manual navigation - next step
  const handleNextStep = () => {
    if (animationSteps.length > 0 && currentStep < animationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (heap) {
        const { descriptions } = heap.heapSort(true);
        setStepDescription(descriptions[currentStep + 1]);
      }
    }
  };

  // Load sample data
  useEffect(() => {
    if (array.length === 0) {
      // Initial load - convert to tree
      const timer = setTimeout(() => {
        handleConvertToTree();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [array]);

  return (
    <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-12rem)]">
        {/* Left Column - Visualization */}
        <div className={`p-6 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Array Visualization */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Current Array:</h3>
            <div className="flex flex-wrap gap-2">
              {(animationSteps[currentStep]?.heap || array).map((value, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col items-center`}
                >
                  <span className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {index}
                  </span>
                  <div 
                    className={`w-12 h-12 flex items-center justify-center rounded-lg font-medium transition-all duration-200 ${
                      animationSteps[currentStep]?.activeIndex === index
                        ? darkMode
                          ? 'bg-yellow-500 text-white'
                          : 'bg-yellow-200 text-yellow-900'
                        : darkMode
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-900'
                    } ${
                      animationSteps[currentStep]?.isHeapified
                        ? 'border-2 border-green-500'
                        : 'border border-gray-300'
                    }`}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sorted Array Visualization */}
          {animationSteps[currentStep]?.sorted && animationSteps[currentStep].sorted.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Sorted Elements:</h3>
              <div className="flex flex-wrap gap-2">
                {animationSteps[currentStep].sorted.map((value, index) => (
                  <div 
                    key={`sorted-${index}`}
                    className={`relative flex flex-col items-center`}
                  >
                    <span className={`text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {index}
                    </span>
                    <div 
                      className={`w-12 h-12 flex items-center justify-center rounded-lg font-medium ${
                        darkMode
                          ? 'bg-green-600 text-white'
                          : 'bg-green-100 text-green-900'
                      } border-2 border-green-500`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tree Visualization */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Tree View:</h3>
            <div className="overflow-x-auto">
              <div className="min-w-[600px] h-[400px] relative">
                <TreeView 
                  data={animationSteps[currentStep]?.heap || array}
                  heapType={heapType}
                  darkMode={darkMode}
                  isHeapified={animationSteps[currentStep]?.isHeapified}
                />
              </div>
            </div>
          </div>

          {/* Step Description */}
          <div className={`mb-6 p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <p className="text-lg font-medium mb-2">Current Step:</p>
            <div className="space-y-2">
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {stepDescription || 'Ready to start visualization'}
              </p>
              {animationSteps[currentStep]?.activeIndex !== null && (
                <p className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  Active Element: {animationSteps[currentStep].heap[animationSteps[currentStep].activeIndex]} at index {animationSteps[currentStep].activeIndex}
                </p>
              )}
              {animationSteps[currentStep]?.sorted && animationSteps[currentStep].sorted.length > 0 && (
                <p className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  Last Sorted: {animationSteps[currentStep].sorted[animationSteps[currentStep].sorted.length - 1]}
                </p>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          {animationSteps.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Step {currentStep + 1} of {animationSteps.length}
                </span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {Math.round(((currentStep + 1) / animationSteps.length) * 100)}%
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <div 
                  className={`h-full transition-all duration-300 ${
                    darkMode ? 'bg-blue-500' : 'bg-blue-400'
                  }`}
                  style={{ width: `${((currentStep + 1) / animationSteps.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Controls */}
        <div className="p-6">
          <div className="space-y-8">
            {/* Input Section */}
            <div className="space-y-4">
              <label 
                htmlFor="array-input" 
                className="block text-lg font-medium"
              >
                Enter numbers:
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  id="array-input"
                  type="text"
                  value={inputArray}
                  onChange={handleArrayInput}
                  placeholder="e.g. 4,10,3,5,1"
                  className={`flex-grow px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                />
                <button 
                  onClick={handleConvertToTree} 
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  Convert to Tree
                </button>
              </div>
            </div>

            {/* Heap Type Selection */}
            <div className="space-y-4">
              <p className="text-lg font-medium">Heap Type:</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => toggleHeapType("max")} 
                  className={`flex-1 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    heapType === "max"
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Max Heap
                </button>
                <button 
                  onClick={() => toggleHeapType("min")} 
                  className={`flex-1 px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    heapType === "min"
                      ? darkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Min Heap
                </button>
              </div>
            </div>

            {/* Animation Controls */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">Animation Speed:</p>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {animationSpeed}ms
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <p className="text-lg font-medium">Actions:</p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleBuildHeap}
                  disabled={!array.length}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    !array.length
                      ? 'bg-gray-400 cursor-not-allowed'
                      : darkMode
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  Build Heap
                </button>
                <button 
                  onClick={handleSort}
                  disabled={!heap}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    !heap
                      ? 'bg-gray-400 cursor-not-allowed'
                      : darkMode
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  Start Sorting
                </button>
                <button 
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : darkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  Previous Step
                </button>
                <button 
                  onClick={handleNextStep}
                  disabled={currentStep === animationSteps.length - 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === animationSteps.length - 1
                      ? 'bg-gray-400 cursor-not-allowed'
                      : darkMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  Next Step
                </button>
              </div>
            </div>

            {/* Algorithm Information */}
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className="text-lg font-medium mb-3">How it works:</h3>
              <ol className={`list-decimal pl-5 space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>Enter numbers separated by commas</li>
                <li>Choose between Max Heap or Min Heap</li>
                <li>Click "Build Heap" to create the heap structure</li>
                <li>Click "Start Sorting" to begin the heap sort</li>
                <li>Use Previous/Next to navigate through steps</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeapVisualizer;