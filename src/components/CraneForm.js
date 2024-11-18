import React, { useState } from "react";
import CranePreview from "./CranePreview";

const CraneForm = () => {
  const [personalDetails, setPersonalDetails] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    projectLocation: "",
  });

  const [cranes, setCranes] = useState([
    {
      craneType: "",
      dutyClass: "",
      capacity: 0,
      span: 0,
      liftHeight: 0,
      travelLength: 0,
      additionalFeatures: "",
    },
  ]);

  const [showPreview, setShowPreview] = useState(false);

  const handlePersonalDetailsChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleCraneChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCranes = [...cranes];
    updatedCranes[index][name] = value;
    setCranes(updatedCranes);
  };

  const addCrane = () => {
    setCranes([
      ...cranes,
      {
        craneType: "",
        dutyClass: "",
        capacity: 0,
        span: 0,
        liftHeight: 0,
        travelLength: 0,
        additionalFeatures: "",
      },
    ]);
  };

  const copyAboveCrane = (index) => {
    const aboveCrane = cranes[index - 1];
    const updatedCranes = [...cranes];
    updatedCranes[index] = { ...aboveCrane };
    setCranes(updatedCranes);
  };

  const removeCrane = (index) => {
    const updatedCranes = cranes.filter((_, i) => i !== index);
    setCranes(updatedCranes);
  };

  return (
    <div className="p-6 rounded shadow-lg bg-white max-w-4xl mx-auto animate-fade-in font-roboto">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">Crane Configurator</h2>
      <h3 className="text-lg font-semibold mb-2 text-blue-700">Customer Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(personalDetails).map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-semibold text-blue-900">
              {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
            </label>
            <input
              type="text"
              name={field}
              value={personalDetails[field]}
              onChange={handlePersonalDetailsChange}
              className="border-gray-300 bg-gray-100 rounded px-3 py-2 mt-1"
            />
          </div>
        ))}
      </div>
      <h3 className="text-lg font-semibold mt-6 mb-2 text-blue-700">Crane Type & Configuration</h3>
      {cranes.map((crane, index) => (
        <div key={index} className="border rounded p-4 mb-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="font-semibold text-blue-900">Crane Type</label>
              <select
                name="craneType"
                value={crane.craneType}
                onChange={(e) => handleCraneChange(index, e)}
                className="border-gray-300 bg-gray-100 rounded px-3 py-2 mt-1"
              >
                <option value="">Select</option>
                <option value="Single Girder">Single Girder</option>
                <option value="Double Girder">Double Girder</option>
                <option value="Gantry Crane">Gantry Crane</option>
                <option value="Semi-Gantry Crane">Semi-Gantry Crane</option>
                <option value="Jib Crane">Jib Crane</option>
                <option value="Monorail Crane">Monorail Crane</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-blue-900">Duty Class</label>
              <select
                name="dutyClass"
                value={crane.dutyClass}
                onChange={(e) => handleCraneChange(index, e)}
                className="border-gray-300 bg-gray-100 rounded px-3 py-2 mt-1"
              >
                <option value="">Select</option>
                <option value="M5">M5 (Moderate)</option>
                <option value="M7">M7 (Heavy Duty)</option>
                <option value="M8">M8 (Very Heavy Duty)</option>
              </select>
            </div>
            {["capacity", "span", "liftHeight", "travelLength"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="font-semibold text-blue-900">
                  {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                  <span className="text-sm text-gray-500">
                    {field === "capacity" ? " (Tons)" : " (Meters)"}
                  </span>
                </label>
                <input
                  type="number"
                  name={field}
                  value={crane[field]}
                  min="0"
                  onChange={(e) => handleCraneChange(index, e)}
                  className="border-gray-300 bg-gray-100 rounded px-3 py-2 mt-1"
                />
              </div>
            ))}
            <div className="flex flex-col col-span-1 md:col-span-2">
              <label className="font-semibold text-blue-900">
                Additional Features
                <span className="text-sm text-gray-500"> (Optional)</span>
              </label>
              <input
                type="text"
                name="additionalFeatures"
                value={crane.additionalFeatures}
                onChange={(e) => handleCraneChange(index, e)}
                className="border-gray-300 bg-gray-100 rounded px-3 py-2 mt-1"
              />
            </div>
          </div>
          {index > 0 && (
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id={`copy-above-${index}`}
                onChange={() => copyAboveCrane(index)}
                className="mr-2"
              />
              <label htmlFor={`copy-above-${index}`} className="text-blue-900">
                Same as Above
              </label>
            </div>
          )}
          {index > 0 && (
            <button
              onClick={() => removeCrane(index)}
              className="mt-2 text-red-600 hover:underline"
            >
              Remove Crane
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-between mt-6">
        <button
          onClick={addCrane}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Add Crane
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Preview & Submit
        </button>
      </div>
      {showPreview && <CranePreview personalDetails={personalDetails} cranes={cranes} showPreview={showPreview} setShowPreview={setShowPreview} />}
    </div>
  );
};

export default CraneForm;
