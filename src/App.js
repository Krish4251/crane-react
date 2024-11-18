import React from "react";
import CraneForm from "./components/CraneForm";


const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-4 px-6">
        <div className="flex items-center justify-between">
           <img
          src="./KC.png"
          alt="Logo"
          className="h-16"
          style={{ maxWidth: 200, width: '100%', height: 'auto', objectFit: 'cover' }}
        />
          <div>
            {/* <h1 className="text-2xl font-bold">Krish Crane Manufacturing</h1> */}
            <p className="text-sm">A Crane Manufacturing Company</p>
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
