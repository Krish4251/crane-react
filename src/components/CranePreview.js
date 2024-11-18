import React from "react";
import axios from "axios";

const CranePreview = ({ personalDetails, cranes, showPreview, setShowPreview }) => {
  const handleClosePreview = () => {
    setShowPreview(false); // Close the preview modal
  };

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
    <div>
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={handleClosePreview}
              className="absolute top-2 right-2 text-xl text-gray-500"
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-900">
              Crane Configuration Preview
            </h2>

            <h3 className="text-xl font-semibold mb-2">Customer Information</h3>
            <div className="overflow-y-auto max-h-96 mb-4">
              <table className="table-auto w-full border-collapse">
                <tbody>
                  {Object.keys(personalDetails).map((field) => (
                    <tr key={field} className="border-b">
                      <td className="px-4 py-2 font-semibold text-blue-900 capitalize">
                        {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </td>
                      <td className="px-4 py-2">{personalDetails[field]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-2">Crane Configuration</h3>
            <div className="overflow-y-auto max-h-96">
              {cranes.map((crane, index) => (
                <div key={index} className="mb-6">
                  <h4 className="font-semibold text-lg mb-2">Crane {index + 1}</h4>
                  <table className="table-auto w-full mb-4 border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold text-blue-900">Crane Type</td>
                        <td className="px-4 py-2">{crane.craneType}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold text-blue-900">Duty Class</td>
                        <td className="px-4 py-2">{crane.dutyClass}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold text-blue-900">Capacity</td>
                        <td className="px-4 py-2">{crane.capacity} Tons</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold text-blue-900">Span</td>
                        <td className="px-4 py-2">{crane.span} meters</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold text-blue-900">Lift Height</td>
                        <td className="px-4 py-2">{crane.liftHeight} meters</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold text-blue-900">Travel Length</td>
                        <td className="px-4 py-2">{crane.travelLength} meters</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2 font-semibold text-blue-900">Additional Features</td>
                        <td className="px-4 py-2">{crane.additionalFeatures || "None"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleClosePreview}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Edit Form
              </button>
              <button
                onClick={handleConfirm}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CranePreview;
