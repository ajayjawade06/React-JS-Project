import { useEffect, useState } from "react";
import { Heap } from "../utils/Heap";

const SortVisualizer = () => {
  const [steps, setSteps] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const array = JSON.parse(localStorage.getItem("inputArray"));
    const heap = new Heap("max");
    array.forEach(num => heap.insert(num));

    const stepwiseHeap = [];
    while (heap.heap.length > 0) {
      stepwiseHeap.push([...heap.heap]);
      heap.remove();
    }

    setSteps(stepwiseHeap);
    let i = 0;
    const interval = setInterval(() => {
      setIndex(i++);
      if (i >= stepwiseHeap.length) clearInterval(interval);
    }, 1000);
  }, []);

  return <div className="mt-10">{steps.length > 0 && <p>{steps[index].join(", ")}</p>}</div>;
};

export default SortVisualizer;
