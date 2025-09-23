import { useState } from "react";
import Login from "./components/Login";
import AddAgent from "./components/AddAgent";
import UploadCSV from "./components/UploadCSV";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setLoggedIn(false);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>
      <AddAgent />
      <UploadCSV />
    </div>
  );
}

export default App;
