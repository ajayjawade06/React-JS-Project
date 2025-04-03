export class Heap {
  constructor(type = "max", array = []) {
    this.heap = [];
    this.type = type;
    
    // If initial array is provided, build heap from it
    if (array.length > 0) {
      this.buildHeap(array);
    }
  }
  
  // Build a heap from an existing array (more efficient than inserting one by one)
  buildHeap(array) {
    // Copy array to heap
    this.heap = [...array];
    
    // Heapify from the last non-leaf node up to the root
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDownFrom(i);
    }
    
    return this.heap;
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

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if ((this.type === "max" && this.heap[index] > this.heap[parentIndex]) ||
          (this.type === "min" && this.heap[index] < this.heap[parentIndex])) {
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Heapify down from a specific index
  heapifyDownFrom(startIndex) {
    let index = startIndex;
    while (index < this.heap.length) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let swapIndex = null;

      if (left < this.heap.length) {
        if ((this.type === "max" && this.heap[left] > this.heap[index]) ||
            (this.type === "min" && this.heap[left] < this.heap[index])) {
          swapIndex = left;
        }
      }

      if (right < this.heap.length) {
        if ((this.type === "max" && this.heap[right] > this.heap[swapIndex ?? index]) ||
            (this.type === "min" && this.heap[right] < this.heap[swapIndex ?? index])) {
          swapIndex = right;
        }
      }

      if (swapIndex === null) break;
      [this.heap[index], this.heap[swapIndex]] = [this.heap[swapIndex], this.heap[index]];
      index = swapIndex;
    }
  }

  // Standard heapify down from root
  heapifyDown() {
    this.heapifyDownFrom(0);
  }
  
  // Perform heap sort and return sorted array
  heapSort(trackSteps = false) {
    // If not tracking steps, use the simple implementation
    if (!trackSteps) {
      const result = [];
      const originalHeap = [...this.heap]; // Save original heap
      
      while (this.heap.length > 0) {
        result.push(this.remove());
      }
      
      // Restore original heap
      this.heap = originalHeap;
      
      return result;
    }
    
    // Implementation that tracks steps for visualization
    const steps = [];
    const descriptions = [];
    const result = [...this.heap]; // Copy the heap to sort in-place
    const heapSize = result.length;
    
    // First step: Initial array (unsorted)
    steps.push({
      heap: [...result],
      sorted: [],
      activeIndex: null,
      isHeapified: false // Flag to indicate this is not yet a heap
    });
    descriptions.push("Initial unsorted array");
    
    // Build max/min heap
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      this.heapifyDownInPlace(result, i, heapSize, this.type);
    }
    
    // After building heap
    steps.push({
      heap: [...result],
      sorted: [],
      activeIndex: null,
      isHeapified: true // Flag to indicate this is now a heap
    });
    descriptions.push(`${this.type === 'max' ? 'Max' : 'Min'} heap built from the array`);
    
    // Create a copy of the sorted result that will be in the correct order
    // For max heap: descending order, for min heap: ascending order
    const sortedResult = [...result];
    
    // Extract elements one by one
    for (let i = heapSize - 1; i > 0; i--) {
      // Swap root with last element
      [result[0], result[i]] = [result[i], result[0]];
      
      // After swap
      steps.push({
        heap: [...result.slice(0, i)],
        sorted: [...result.slice(i)],
        activeIndex: 0,
        isHeapified: true
      });
      descriptions.push(`Swap root (${result[i]}) with last element of heap (${result[0]})`);
      
      // Heapify the reduced heap
      this.heapifyDownInPlace(result, 0, i, this.type);
      
      // After heapify
      steps.push({
        heap: [...result.slice(0, i)],
        sorted: [...result.slice(i)],
        activeIndex: null,
        isHeapified: true
      });
      descriptions.push(`Heapify the reduced heap of size ${i}`);
    }
    
    // Final sorted array
    steps.push({
      heap: [],
      sorted: [...result],
      activeIndex: null,
      isHeapified: true
    });
    descriptions.push("Heap sort complete");
    
    // For min heap, we need to reverse the result to get ascending order
    if (this.type === "min") {
      // Reverse the sorted portion in each step that has sorted elements
      for (let i = 2; i < steps.length; i++) {
        if (steps[i].sorted.length > 0) {
          // For min heap, we need to reverse the sorted portion to get ascending order
          steps[i].sorted = [...steps[i].sorted].reverse();
        }
      }
    }
    
    return { result: this.type === "min" ? sortedResult.reverse() : sortedResult, steps, descriptions };
  }
  
  // Heapify down in-place for a specific array (used in heap sort)
  heapifyDownInPlace(arr, index, size, type) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    
    // Compare with left child
    if (left < size) {
      if ((type === "max" && arr[left] > arr[largest]) ||
          (type === "min" && arr[left] < arr[largest])) {
        largest = left;
      }
    }
    
    // Compare with right child
    if (right < size) {
      if ((type === "max" && arr[right] > arr[largest]) ||
          (type === "min" && arr[right] < arr[largest])) {
        largest = right;
      }
    }
    
    // If largest is not the current index, swap and continue heapifying
    if (largest !== index) {
      [arr[index], arr[largest]] = [arr[largest], arr[index]];
      this.heapifyDownInPlace(arr, largest, size, type);
    }
  }
  
  // Get current heap array (useful for visualization)
  getHeap() {
    return [...this.heap];
  }
}
