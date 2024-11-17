import React from "react";
import CraneForm from "./components/CraneForm";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <img src="/logo192.png" alt="Company Logo" className="h-12" />
          <div>
            <h1 className="text-2xl font-bold">Krish Crane Manufacturing</h1>
            <p className="text-sm">Your trusted crane partner</p>
          </div>
        </div>
      </header>
      <main className="py-8 px-4">
        <CraneForm />
      </main>
    </div>
  );
};

export default App;
