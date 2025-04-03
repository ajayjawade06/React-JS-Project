import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputArray = () => {
  const [array, setArray] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("inputArray", JSON.stringify(array.split(",").map(Number)));
    navigate("/tree");
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4">Enter Numbers:</h2>
      <input 
        type="text" 
        value={array} 
        onChange={(e) => setArray(e.target.value)} 
        placeholder="e.g. 4,10,3,5,1"
        className="border px-3 py-2 mt-2"
      />
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
        Convert to Tree
      </button>

      {/* ✅ Show the Array Visually as Indexed Blocks */}
      <div className="mt-6">
        {array && (
          <>
            {/* Indexes Row */}
            <div className="flex space-x-2">
              {array.split(",").map((_, i) => (
                <div key={i} className="w-10 text-center font-bold">{i}</div>
              ))}
            </div>

            {/* Numbers Row (Inside Boxes) */}
            <div className="flex space-x-2">
              {array.split(",").map((num, i) => (
                <div key={i} className="w-10 h-10 flex items-center justify-center border border-black text-lg">
                  {num}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InputArray;
