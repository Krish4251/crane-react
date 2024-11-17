const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sendMail } = require("./emailer"); // Import email functionality

const app = express();
const PORT = 4000; // Server port

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON data in request bodies

// API Route for Sending Email
app.post("/send-email", async (req, res) => {
  try {
    // Call the email function with form data
    await sendMail(req.body);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
