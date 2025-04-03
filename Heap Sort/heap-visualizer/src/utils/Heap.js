export class Heap {
  constructor(type = "max", array = []) {
    this.type = type;
    this.heap = [...array];
    
    // If initial array is provided, build heap from it
    if (array.length > 0) {
      this.buildHeap();
    }
  }
  
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  shouldSwap(index1, index2) {
    if (this.type === "max") {
      return this.heap[index1] < this.heap[index2];
    }
    return this.heap[index1] > this.heap[index2];
  }

  heapifyUp(index, steps = []) {
    let currentIndex = index;
    
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      
      if (this.shouldSwap(parentIndex, currentIndex)) {
        steps.push({
          heap: [...this.heap],
          activeIndex: currentIndex,
          isComplete: false
        });
        
        this.swap(parentIndex, currentIndex);
        currentIndex = parentIndex;
        
        steps.push({
          heap: [...this.heap],
          activeIndex: currentIndex,
          isComplete: false
        });
      } else {
        break;
      }
    }
    
    return steps;
  }

  heapifyDown(index, heapSize, steps = []) {
    let currentIndex = index;
    let maxIndex = index;
    
    while (true) {
      const leftChild = this.getLeftChildIndex(currentIndex);
      const rightChild = this.getRightChildIndex(currentIndex);
      
      if (leftChild < heapSize && this.shouldSwap(maxIndex, leftChild)) {
        maxIndex = leftChild;
      }
      
      if (rightChild < heapSize && this.shouldSwap(maxIndex, rightChild)) {
        maxIndex = rightChild;
      }
      
      if (maxIndex !== currentIndex) {
        steps.push({
          heap: [...this.heap],
          activeIndex: maxIndex,
          isComplete: false
        });
        
        this.swap(currentIndex, maxIndex);
        currentIndex = maxIndex;
        
        steps.push({
          heap: [...this.heap],
          activeIndex: currentIndex,
          isComplete: false
        });
      } else {
        break;
      }
    }
    
    return steps;
  }

  buildHeap() {
    const steps = [];
    const n = this.heap.length;
    
    // Start from the last non-leaf node and heapify down
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      steps.push({
        heap: [...this.heap],
        activeIndex: i,
        isComplete: false
      });
      
      this.heapifyDown(i, n, steps);
    }
    
    // Add final state
    steps.push({
      heap: [...this.heap],
      activeIndex: null,
      isComplete: true
    });
    
    return steps;
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  remove() {
    if (this.heap.length === 0) return null;
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  heapSort() {
    const steps = [];
    const n = this.heap.length;
    
    // Build max heap first
    const buildSteps = this.buildHeap();
    steps.push(...buildSteps);
    
    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
      steps.push({
        heap: [...this.heap],
        activeIndex: 0,
        sorted: this.heap.slice(i + 1),
        isComplete: false
      });
      
      this.swap(0, i);
      
      steps.push({
        heap: [...this.heap],
        activeIndex: i,
        sorted: this.heap.slice(i),
        isComplete: false
      });
      
      this.heapifyDown(0, i, steps);
    }
    
    // Add final sorted state
    steps.push({
      heap: [...this.heap],
      activeIndex: null,
      sorted: [...this.heap],
      isComplete: true
    });
    
    return { steps };
  }
  
  // Get current heap array (useful for visualization)
  getHeap() {
    return [...this.heap];
  }
}
