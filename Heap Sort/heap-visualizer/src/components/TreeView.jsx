import React, { useEffect, useState } from 'react';

const TreeView = ({ data, heapType, darkMode, isHeapified = false }) => {
  const [nodeSize, setNodeSize] = useState(48); // Default node size
  
  // Adjust node size based on window width and tree size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const treeDepth = Math.floor(Math.log2(data.length)) + 1;
      
      if (width < 640) { // Small screens
        setNodeSize(Math.min(32, 320 / Math.pow(2, treeDepth - 1)));
      } else if (width < 1024) { // Medium screens
        setNodeSize(Math.min(40, 400 / Math.pow(2, treeDepth - 1)));
      } else { // Large screens
        setNodeSize(Math.min(48, 480 / Math.pow(2, treeDepth - 1)));
      }
    };
    
    // Set initial size
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data.length]);

  if (!data || data.length === 0) return null;

  // Calculate tree levels
  const getTreeLevels = (arr) => {
    const levels = [];
    let levelStart = 0;
    let levelSize = 1;

    while (levelStart < arr.length) {
      levels.push(arr.slice(levelStart, levelStart + levelSize));
      levelStart += levelSize;
      levelSize *= 2;
    }
    return levels;
  };

  const levels = getTreeLevels(data);
  const maxDepth = levels.length;

  // Get node color based on position and state
  const getNodeColor = (level, index, heapType, isHeapified) => {
    if (!isHeapified) {
      return darkMode ? 'bg-gray-600' : 'bg-gray-300';
    }
    
    // Root node
    if (level === 0) {
      return heapType === "max" 
        ? 'bg-gradient-to-br from-red-500 to-red-600'
        : 'bg-gradient-to-br from-blue-500 to-blue-600';
    }
    
    // Leaf nodes
    if (level === maxDepth - 1) {
      return heapType === "max"
        ? 'bg-gradient-to-br from-orange-400 to-orange-500'
        : 'bg-gradient-to-br from-cyan-400 to-cyan-500';
    }
    
    // Internal nodes
    return heapType === "max"
      ? 'bg-gradient-to-br from-amber-500 to-amber-600'
      : 'bg-gradient-to-br from-indigo-500 to-indigo-600';
  };

  // Calculate dimensions
  const verticalGap = nodeSize * 2;
  const horizontalGap = nodeSize * 1.5;
  const treeHeight = (maxDepth - 1) * verticalGap + nodeSize;
  const treeWidth = Math.pow(2, maxDepth - 1) * (nodeSize + horizontalGap);

  return (
    <div 
      className="relative mx-auto"
      style={{ 
        height: `${treeHeight}px`,
        width: `${treeWidth}px`,
        maxWidth: '100%'
      }}
    >
      {levels.map((level, levelIndex) => {
        const nodesInLevel = Math.pow(2, levelIndex);
        const levelWidth = nodesInLevel * (nodeSize + horizontalGap);
        const startX = (treeWidth - levelWidth) / 2;
        
        return level.map((value, nodeIndex) => {
          const x = startX + nodeIndex * (nodeSize + horizontalGap);
          const y = levelIndex * verticalGap;
          const globalIndex = Math.pow(2, levelIndex) - 1 + nodeIndex;
          const leftChildIndex = 2 * globalIndex + 1;
          const rightChildIndex = 2 * globalIndex + 2;
          
          return (
            <div key={`node-${globalIndex}`}>
              {/* Connection lines to children */}
              {leftChildIndex < data.length && (
                <div 
                  className={`absolute ${darkMode ? 'bg-gray-600' : 'bg-gray-400'}`}
                  style={{
                    width: '2px',
                    height: `${verticalGap * 0.8}px`,
                    left: `${x + nodeSize / 2}px`,
                    top: `${y + nodeSize}px`,
                    transform: `rotate(${45 - (90 / Math.pow(2, levelIndex))}deg)`,
                    transformOrigin: 'top center',
                    opacity: 0.5
                  }}
                />
              )}
              
              {rightChildIndex < data.length && (
                <div 
                  className={`absolute ${darkMode ? 'bg-gray-600' : 'bg-gray-400'}`}
                  style={{
                    width: '2px',
                    height: `${verticalGap * 0.8}px`,
                    left: `${x + nodeSize / 2}px`,
                    top: `${y + nodeSize}px`,
                    transform: `rotate(${-45 + (90 / Math.pow(2, levelIndex))}deg)`,
                    transformOrigin: 'top center',
                    opacity: 0.5
                  }}
                />
              )}
              
              {/* Node */}
              <div 
                className={`absolute flex items-center justify-center rounded-full font-bold text-white shadow-lg transition-all duration-300 ${
                  getNodeColor(levelIndex, nodeIndex, heapType, isHeapified)
                }`}
                style={{
                  width: `${nodeSize}px`,
                  height: `${nodeSize}px`,
                  left: `${x}px`,
                  top: `${y}px`,
                  fontSize: `${Math.max(12, nodeSize / 2)}px`,
                  transform: 'translate(0, 0)',
                  zIndex: 10
                }}
              >
                {value}
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};

export default TreeView;