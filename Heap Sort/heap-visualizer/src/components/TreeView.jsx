import React, { useEffect, useState } from 'react';

const TreeView = ({ data, heapType, isHeapified = false, activeIndex, darkMode }) => {
  const [nodeSize, setNodeSize] = useState(40);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const treeDepth = Math.floor(Math.log2(data.length)) + 1;
      const nodesInLastLevel = Math.pow(2, treeDepth - 1);
      
      // Use smaller percentages of viewport to prevent scrollbars
      const maxWidthBasedSize = (width * 0.4) / (nodesInLastLevel * 1.8);
      const maxHeightBasedSize = (height * 0.35) / (treeDepth * 1.2);
      const calculatedSize = Math.min(maxWidthBasedSize, maxHeightBasedSize);
      
      setNodeSize(Math.min(Math.max(calculatedSize, 36), 44));
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data.length]);

  if (!data || data.length === 0) return null;

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

  const getNodeStyles = (level, index, globalIndex, heapType, isHeapified) => {
    if (!isHeapified) {
      return {
        background: '#F3F4F6',
        color: '#4B5563',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
      };
    }

    // Highlight active node
    if (globalIndex === activeIndex) {
      return {
        background: '#FBBF24', // Yellow highlight
        color: '#000000',
        boxShadow: '0 0 0 2px #F59E0B',
        transform: 'scale(1.05)'
      };
    }

    const colors = {
      max: {
        root: '#EF4444',
        internal: '#F97316',
        leaf: '#F59E0B'
      },
      min: {
        root: '#3B82F6',
        internal: '#6366F1',
        leaf: '#0EA5E9'
      }
    };

    let color;
    if (level === 0) {
      color = colors[heapType].root;
    } else if (level === maxDepth - 1) {
      color = colors[heapType].leaf;
    } else {
      color = colors[heapType].internal;
    }

    return {
      background: color,
      color: '#FFFFFF',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    };
  };

  // Tighter spacing to prevent scrollbars
  const verticalGap = nodeSize * 1.4;
  const horizontalGap = nodeSize * 1.2;
  const treeHeight = (maxDepth - 1) * verticalGap + nodeSize;
  const treeWidth = Math.pow(2, maxDepth - 1) * (nodeSize + horizontalGap);
  const padding = nodeSize * 0.4;

  return (
    <div className="flex items-center justify-center w-full h-full max-h-[90vh]">
      <div 
        className="relative"
        style={{ 
          height: `${treeHeight + padding * 2}px`,
          width: `${treeWidth + padding * 2}px`,
          maxWidth: '95vw',
          maxHeight: '85vh'
        }}
      >
        {/* SVG Connection Lines */}
        <svg
          className="absolute inset-0"
          width="100%"
          height="100%"
          style={{ zIndex: 0 }}
        >
          {levels.map((level, levelIndex) => {
            const nodesInLevel = Math.pow(2, levelIndex);
            const levelWidth = nodesInLevel * (nodeSize + horizontalGap);
            const startX = (treeWidth - levelWidth) / 2 + padding;
            const y = levelIndex * verticalGap + padding;
            
            return level.map((_, nodeIndex) => {
              const x = startX + nodeIndex * (nodeSize + horizontalGap);
              const globalIndex = Math.pow(2, levelIndex) - 1 + nodeIndex;
              
              const nextLevelY = (levelIndex + 1) * verticalGap + padding;
              const nextLevelNodesInLevel = Math.pow(2, levelIndex + 1);
              const nextLevelWidth = nextLevelNodesInLevel * (nodeSize + horizontalGap);
              const nextLevelStartX = (treeWidth - nextLevelWidth) / 2 + padding;
              
              const leftChildIndex = 2 * nodeIndex;
              const rightChildIndex = 2 * nodeIndex + 1;
              const leftChildX = nextLevelStartX + leftChildIndex * (nodeSize + horizontalGap);
              const rightChildX = nextLevelStartX + rightChildIndex * (nodeSize + horizontalGap);
              
              return (
                <g key={`lines-${globalIndex}`}>
                  {2 * globalIndex + 1 < data.length && (
                    <line
                      x1={x + nodeSize / 2}
                      y1={y + nodeSize}
                      x2={leftChildX + nodeSize / 2}
                      y2={nextLevelY}
                      stroke={darkMode ? "#4B5563" : "#D1D5DB"}
                      strokeWidth="1"
                    />
                  )}
                  {2 * globalIndex + 2 < data.length && (
                    <line
                      x1={x + nodeSize / 2}
                      y1={y + nodeSize}
                      x2={rightChildX + nodeSize / 2}
                      y2={nextLevelY}
                      stroke={darkMode ? "#4B5563" : "#D1D5DB"}
                      strokeWidth="1"
                    />
                  )}
                </g>
              );
            });
          })}
        </svg>
        
        {/* Nodes */}
        {levels.map((level, levelIndex) => {
          const nodesInLevel = Math.pow(2, levelIndex);
          const levelWidth = nodesInLevel * (nodeSize + horizontalGap);
          const startX = (treeWidth - levelWidth) / 2 + padding;
          
          return level.map((value, nodeIndex) => {
            const x = startX + nodeIndex * (nodeSize + horizontalGap);
            const y = levelIndex * verticalGap + padding;
            const globalIndex = Math.pow(2, levelIndex) - 1 + nodeIndex;
            const nodeStyles = getNodeStyles(levelIndex, nodeIndex, globalIndex, heapType, isHeapified);
            
            return (
              <div 
                key={`node-${levelIndex}-${nodeIndex}`}
                className="absolute flex items-center justify-center rounded-full font-bold"
                style={{
                  width: `${nodeSize}px`,
                  height: `${nodeSize}px`,
                  left: `${x}px`,
                  top: `${y}px`,
                  fontSize: `${Math.max(15, nodeSize / 2)}px`,
                  ...nodeStyles,
                  zIndex: 1
                }}
              >
                {value}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default TreeView;