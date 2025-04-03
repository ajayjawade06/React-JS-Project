import React, { useState } from 'react';
import TreeView from './TreeView';
import { Heap } from '../utils/Heap';

const HeapVisualizer = ({ darkMode }) => {
  const defaultArray = [10, 5, 20, 3, 8, 15];
  const [inputArray, setInputArray] = useState(defaultArray);
  const [inputValue, setInputValue] = useState(defaultArray.join(', '));
  const [heapType, setHeapType] = useState('max');
  const [heap, setHeap] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isHeapified, setIsHeapified] = useState(false);
  const [sortingSteps, setSortingSteps] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConvertToTree = () => {
    try {
      const numbers = inputValue
        .split(',')
        .map(num => parseInt(num.trim()))
        .filter(num => !isNaN(num));

      if (numbers.length === 0) {
        alert('Please enter valid numbers separated by commas');
        return;
      }
      
      // Limit array size for better visualization
      if (numbers.length > 15) {
        if (!window.confirm(`Arrays with more than 15 elements may not visualize well. Continue with ${numbers.length} elements?`)) {
          return;
        }
      }

      setInputArray(numbers);
      setHeap(null); // Reset heap, but don't build it yet
      setSteps([]);
      setCurrentStepIndex(-1);
      setIsHeapified(false);
    } catch (error) {
      console.error('Error converting to tree:', error);
      alert('Error converting input to tree. Please check your input.');
    }
  };

  const handleHeapTypeChange = (type) => {
    if (type !== heapType) {
      setHeapType(type); // Only update heap type, don't modify heap
    }
  };

  const handleBuildHeap = () => {
    try {
      const newHeap = new Heap(heapType, [...inputArray]);
      newHeap.buildHeap(); // Build the heap only when this button is clicked
      setHeap(newHeap);
      setIsHeapified(true);
    } catch (error) {
      console.error('Error building heap:', error);
      alert('Error building heap. Please try again.');
    }
  };

  const handleStartSorting = () => {
    if (!heap || !isHeapified) return;
    try {
      const { steps: sortSteps } = heap.heapSort();
      setSteps(sortSteps);
      
      // Generate detailed step descriptions with element values
      const descriptions = sortSteps.map((step, index) => {
        // Only mark as complete if it's the last step
        if (index === 0) {
          return `Step ${index}: Initial heap built - ready for sorting.`;
        } else if (step.isComplete && index === sortSteps.length - 1) {
          return `Step ${index}: Sorting complete - array is fully sorted.`;
        } else if (step.sorted && step.sorted.length > 0) {
          // If this step has a sorted array, it means we've extracted an element
          const extractedElement = step.sorted[step.sorted.length - 1];
          
          // If activeIndex is at the end, we've just swapped root with last element
          if (step.activeIndex === step.heap.length) {
            const rootValue = sortSteps[index-1].heap[0];
            const lastValue = sortSteps[index-1].heap[sortSteps[index-1].heap.length - 1];
            return `Step ${index}: Swap root (${rootValue}) with last element (${lastValue}). Extract ${extractedElement}.`;
          }
          
          // If activeIndex is 0, we're about to heapify from the root
          if (step.activeIndex === 0) {
            return `Step ${index}: Begin heapifying from root after extraction.`;
          }
          
          // If isComplete is true but it's not the last step, it's a partial completion
          if (step.isComplete) {
            return `Step ${index}: Extracted ${extractedElement} - continuing sort.`;
          }
        }
        
        // For heapify steps
        if (step.activeIndex !== null && step.activeIndex >= 0) {
          const leftChildIndex = 2 * step.activeIndex + 1;
          const rightChildIndex = 2 * step.activeIndex + 2;
          
          // Check if we have valid children
          const hasLeftChild = leftChildIndex < step.heap.length;
          const hasRightChild = rightChildIndex < step.heap.length;
          
          if (hasLeftChild || hasRightChild) {
            let description = `Heapify: Compare ${step.heap[step.activeIndex]} with `;
            
            if (hasLeftChild && hasRightChild) {
              description += `children (${step.heap[leftChildIndex]}, ${step.heap[rightChildIndex]})`;
            } else if (hasLeftChild) {
              description += `left child (${step.heap[leftChildIndex]})`;
            }
            
            // Check if previous step had the same activeIndex, which would indicate a swap happened
            if (index > 0 && sortSteps[index-1].activeIndex === step.activeIndex) {
              const prevStep = sortSteps[index-1];
              // Find which child was swapped with the parent
              if (hasLeftChild && prevStep.heap[leftChildIndex] !== step.heap[leftChildIndex]) {
                description += `. Swap with left child.`;
              } else if (hasRightChild && prevStep.heap[rightChildIndex] !== step.heap[rightChildIndex]) {
                description += `. Swap with right child.`;
              }
            }
            
            return `Step ${index}: ${description}`;
          }
        }
        
        return `Step ${index}: Restructuring heap for next extraction.`;
      });
      
      setSortingSteps(descriptions);
      setCurrentStepIndex(0);
    } catch (error) {
      console.error('Error starting sort:', error);
      alert('Error starting sort. Please try again.');
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const getCurrentStep = () => {
    if (!steps.length || currentStepIndex === -1) {
      return { heap: heap ? heap.heap : inputArray, sorted: [] };
    }
    
    const currentStep = steps[currentStepIndex];
    
    // If there are sorted elements, we need to handle the visualization correctly
    if (currentStep.sorted && currentStep.sorted.length > 0) {
      // The heap property in each step contains the full array (both unsorted and sorted portions)
      // The sorted property contains only the sorted portion
      // We need to show only the unsorted portion in the heap visualization
      
      // Calculate the size of the unsorted portion
      const unsortedSize = currentStep.heap.length - currentStep.sorted.length;
      
      // Get only the unsorted portion for the heap visualization
      const unsortedHeap = currentStep.heap.slice(0, unsortedSize);
      
      return {
        heap: unsortedHeap,
        sorted: currentStep.sorted
      };
    }
    
    return currentStep;
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side: Array and Heap Visualizations */}
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
          {/* Current Heap Array Visualization */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Current Heap</h2>
            <div className="border border-gray-300 dark:border-gray-700 p-2 rounded">
              {/* Array with indices */}
              <div className="flex flex-col">
                {/* Index row */}
                <div className="flex">
                  <div className="w-8 h-8 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                    idx
                  </div>
                  {getCurrentStep().heap.map((_, index) => (
                    <div 
                      key={`idx-${index}`} 
                      className="w-12 h-8 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400"
                    >
                      {index}
                    </div>
                  ))}
                </div>
                
                {/* Array row */}
                <div className="flex">
                  <div className="w-8 h-12 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                    val
                  </div>
                  {getCurrentStep().heap.map((value, index) => {
                    // Determine if this is the active element
                    const isActive = steps.length > 0 && 
                                    currentStepIndex >= 0 && 
                                    steps[currentStepIndex].activeIndex === index;
                    
                    return (
                      <div 
                        key={index} 
                        className={`w-12 h-12 flex items-center justify-center border ${
                          isActive 
                            ? (darkMode ? 'bg-yellow-600 border-yellow-700' : 'bg-yellow-500 border-yellow-600') 
                            : (darkMode ? 'bg-blue-600 border-blue-700' : 'bg-blue-500 border-blue-600')
                        } text-white font-bold transition-colors duration-300`}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Add empty box if there are no elements */}
              {getCurrentStep().heap.length === 0 && (
                <div className="flex">
                  <div className="w-8 h-12 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                    val
                  </div>
                  <div className={`w-12 h-12 flex items-center justify-center border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} text-gray-500 font-bold`}>
                    -
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Sorted Array Visualization - Always visible */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3">Sorted Array</h2>
            <div className="border border-gray-300 dark:border-gray-700 p-2 rounded">
              {/* Array with indices */}
              <div className="flex flex-col">
                {/* Index row */}
                <div className="flex">
                  <div className="w-8 h-8 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                    idx
                  </div>
                  {steps.length > 0 && currentStepIndex >= 0 && steps[currentStepIndex].sorted ? 
                    steps[currentStepIndex].sorted.map((_, index) => (
                      <div 
                        key={`sorted-idx-${index}`} 
                        className="w-12 h-8 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400"
                      >
                        {index}
                      </div>
                    )) : (
                      <div className="w-12 h-8 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                        0
                      </div>
                    )
                  }
                </div>
                
                {/* Array row */}
                <div className="flex">
                  <div className="w-8 h-12 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                    val
                  </div>
                  {steps.length > 0 && currentStepIndex >= 0 && steps[currentStepIndex].sorted ? 
                    steps[currentStepIndex].sorted.map((value, index) => (
                      <div 
                        key={index} 
                        className={`w-12 h-12 flex items-center justify-center border ${darkMode ? 'bg-green-600 border-green-700' : 'bg-green-500 border-green-600'} text-white font-bold`}
                      >
                        {value}
                      </div>
                    )) : (
                      <div className={`w-12 h-12 flex items-center justify-center border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} text-gray-500 font-bold`}>
                        -
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
          
          {/* Heap Visualization */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-3">Heap Visualization</h2>
            <TreeView 
              data={getCurrentStep().heap} 
              darkMode={darkMode} 
              heapType={heapType}
              isHeapified={isHeapified}
              activeIndex={steps.length > 0 && currentStepIndex >= 0 ? steps[currentStepIndex].activeIndex : null}
            />
          </div>
          
          {/* Heap Sort Algorithm Explanation - Moved from right side */}
          <div className={`mt-6 p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className="text-lg font-semibold mb-2">Heap Sort Algorithm</h3>
            <ol className={`list-decimal pl-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm space-y-1`}>
              <li>Build a max heap from the input data.</li>
              <li>The largest item is stored at the root of the heap. Replace it with the last item of the heap followed by reducing the size of heap by 1.</li>
              <li>Heapify the root of the tree.</li>
              <li>Repeat steps 2 and 3 while the size of the heap is greater than 1.</li>
            </ol>
            <div className="mt-3">
              <h4 className="font-medium mb-1">Time Complexity</h4>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                Best, Average, Worst: O(n log n)
              </p>
            </div>
            <div className="mt-2">
              <h4 className="font-medium mb-1">Space Complexity</h4>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                O(1) - Heap Sort is an in-place algorithm
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Side: All Controls */}
        <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`}>
          <h2 className="text-xl font-bold mb-4">Controls</h2>
          
          {/* Input Controls - Side by Side */}
          <div className="mb-6">
            <label className="block mb-2">Enter numbers</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={inputValue} 
                onChange={handleInputChange} 
                className={`flex-1 p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`} 
              />
              
              <button 
                onClick={handleConvertToTree} 
                className={`whitespace-nowrap p-2 rounded ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'} text-white`}>
                Convert to Tree
              </button>
            </div>
          </div>
          
          {/* Heap Type Selection */}
          <div className="mb-6">
            <p className="mb-2">Select Heap Type</p>
            <div className="flex gap-2">
              <button 
                onClick={() => handleHeapTypeChange('max')} 
                className={`p-2 rounded w-full ${heapType === 'max' ? 'bg-blue-700 text-white' : 'bg-gray-400 text-gray-900'}`}>
                Max Heap
              </button>
              <button 
                onClick={() => handleHeapTypeChange('min')} 
                className={`p-2 rounded w-full ${heapType === 'min' ? 'bg-blue-700 text-white' : 'bg-gray-400 text-gray-900'}`}>
                Min Heap
              </button>
            </div>
          </div>
          
          {/* Build and Sort Buttons - Side by Side */}
          <div className="mb-6">
            <div className="flex gap-2">
              <button 
                onClick={handleBuildHeap} 
                className={`flex-1 p-2 rounded ${darkMode ? 'bg-green-600 hover:bg-green-500' : 'bg-green-500 hover:bg-green-400'} text-white`}>
                Build Heap
              </button>
              
              <button 
                onClick={handleStartSorting} 
                className={`flex-1 p-2 rounded ${darkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-purple-500 hover:bg-purple-400'} text-white`} 
                disabled={!isHeapified}>
                Start Sorting
              </button>
            </div>
          </div>
          
          {/* Sorting Step Description - Moved from left side */}
          {steps.length > 0 && currentStepIndex >= 0 && (
            <div className="mb-4 p-3 rounded-lg border-l-4 border-l-blue-500 bg-opacity-20 bg-blue-100 dark:bg-opacity-20 dark:bg-blue-900">
              <h3 className="text-lg font-semibold mb-2">Current Step</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {sortingSteps[currentStepIndex]}
              </p>
            </div>
          )}
          
          {/* Step Navigation, Counter, and Reset */}
          <div className="mb-6">
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <p>Navigation</p>
                {/* Step Counter */}
                {steps.length > 0 && currentStepIndex >= 0 && (
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Step {currentStepIndex + 1} of {steps.length}
                  </p>
                )}
              </div>
              
              {/* Progress Bar */}
              {steps.length > 0 && (
                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden mb-2`}>
                  <div 
                    className={`h-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} transition-all duration-300 ease-in-out`}
                    style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mb-2">
              <button 
                onClick={handlePreviousStep} 
                disabled={currentStepIndex <= 0}
                className={`p-2 rounded w-full ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-400 hover:bg-gray-300'} text-white disabled:opacity-50`}>
                Previous
              </button>
              <button 
                onClick={handleNextStep} 
                disabled={currentStepIndex >= steps.length - 1}
                className={`p-2 rounded w-full ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-400 hover:bg-gray-300'} text-white disabled:opacity-50`}>
                Next
              </button>
            </div>
            
            {/* Auto-Play Controls */}
            {steps.length > 0 && (
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <p>Auto-Play Speed</p>
                  <select 
                    className={`p-1 rounded text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                    onChange={(e) => {
                      // Store speed preference
                      window.autoPlaySpeed = parseInt(e.target.value);
                    }}
                    defaultValue="1000"
                  >
                    <option value="2000">Slow</option>
                    <option value="1000">Normal</option>
                    <option value="500">Fast</option>
                    <option value="250">Very Fast</option>
                  </select>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button 
                    onClick={() => {
                      // Clear existing interval if any
                      if (window.autoPlayInterval) {
                        clearInterval(window.autoPlayInterval);
                      }
                      
                      // Auto-play functionality
                      const speed = window.autoPlaySpeed || 1000;
                      const interval = setInterval(() => {
                        setCurrentStepIndex(prev => {
                          if (prev >= steps.length - 1) {
                            clearInterval(interval);
                            return prev;
                          }
                          return prev + 1;
                        });
                      }, speed);
                      
                      // Store interval ID to clear it later if needed
                      window.autoPlayInterval = interval;
                    }}
                    disabled={currentStepIndex >= steps.length - 1}
                    className={`p-2 rounded w-full ${darkMode ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-yellow-500 hover:bg-yellow-400'} text-white disabled:opacity-50`}>
                    Auto-Play
                  </button>
                  
                  <button 
                    onClick={() => {
                      // Clear auto-play interval if it exists
                      if (window.autoPlayInterval) {
                        clearInterval(window.autoPlayInterval);
                        window.autoPlayInterval = null;
                      }
                    }}
                    className={`p-2 rounded w-full ${darkMode ? 'bg-orange-600 hover:bg-orange-500' : 'bg-orange-500 hover:bg-orange-400'} text-white`}>
                    Stop
                  </button>
                </div>
              </div>
            )}
            
            {/* Reset Button */}
            {steps.length > 0 && (
              <button 
                onClick={() => {
                  // Clear auto-play interval if it exists
                  if (window.autoPlayInterval) {
                    clearInterval(window.autoPlayInterval);
                    window.autoPlayInterval = null;
                  }
                  
                  setSteps([]);
                  setCurrentStepIndex(-1);
                  setSortingSteps([]);
                }}
                className={`p-2 rounded w-full ${darkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-red-500 hover:bg-red-400'} text-white`}>
                Reset Sorting
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HeapVisualizer;