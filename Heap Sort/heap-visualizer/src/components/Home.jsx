import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Heap Sort Visualizer</h1>
      <button onClick={() => navigate("/input")} className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg">
        Start
      </button>
    </div>
  );
};

export default Home;
