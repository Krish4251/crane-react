import React from "react";
import axios from "axios";

const CranePreview = ({ personalDetails, cranes }) => {
  const handleConfirm = async () => {
    try {
      await axios.post("http://localhost:4000/send-email", {
        personalDetails,
        cranes,
      });
      alert("Email with PDF attachment sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-4xl w-full">
        <h2 className="text-xl font-bold mb-4">Form Preview</h2>
        <div>
          <h3 className="text-lg font-semibold">Personal Details</h3>
          <ul>
            {Object.entries(personalDetails).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/([A-Z])/g, " $1")}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Crane Details</h3>
          {cranes.map((crane, index) => (
            <div key={index}>
              <h4>Crane {index + 1}</h4>
              {Object.entries(crane).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}</strong>: {value}
                </p>
              ))}
            </div>
          ))}
        </div>
        <button
          onClick={handleConfirm}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Confirm & Send Email
        </button>
      </div>
    </div>
  );
};

export default CranePreview;
