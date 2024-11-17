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
      capacity: "",
      span: "",
      liftHeight: "",
      travelLength: "",
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
        capacity: "",
        span: "",
        liftHeight: "",
        travelLength: "",
        additionalFeatures: "",
      },
    ]);
  };

  const removeCrane = (index) => {
    const updatedCranes = cranes.filter((_, i) => i !== index);
    setCranes(updatedCranes);
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Crane Manufacturing Form</h2>
      <h3 className="text-lg font-semibold mb-2">Personal Details</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(personalDetails).map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-semibold">{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={field}
              value={personalDetails[field]}
              onChange={handlePersonalDetailsChange}
              className="border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
        ))}
      </div>
      <h3 className="text-lg font-semibold mt-6 mb-2">Crane Details</h3>
      {cranes.map((crane, index) => (
        <div key={index} className="border rounded p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(crane).map((field) => (
              <div key={field} className="flex flex-col">
                <label className="font-semibold">{field.replace(/([A-Z])/g, " $1")}</label>
                <input
                  type="text"
                  name={field}
                  value={crane[field]}
                  onChange={(e) => handleCraneChange(index, e)}
                  className="border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
            ))}
          </div>
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
      <button
        onClick={addCrane}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Add Crane
      </button>
      <button
        onClick={() => setShowPreview(true)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Preview & Submit
      </button>
      {showPreview && (
        <CranePreview
          personalDetails={personalDetails}
          cranes={cranes}
        />
      )}
    </div>
  );
};

export default CraneForm;
