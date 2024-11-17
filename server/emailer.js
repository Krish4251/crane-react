const fs = require("fs");
const path = require("path");
const pdf = require("pdfkit");
const nodemailer = require("nodemailer");

const tempDir = path.join(__dirname, "temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir); // Create the temp directory if it doesn't exist
}

const sendMail = async (formData) => {
  return new Promise((resolve, reject) => {
    const doc = new pdf();
    const fileName = `${Date.now()}_form.pdf`;
    const filePath = path.join(tempDir, fileName);

    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    doc.text(`Personal Details:`, { underline: true });
    Object.entries(formData.personalDetails).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`);
    });

    doc.text(`\nCrane Details:`, { underline: true });
    formData.cranes.forEach((crane, index) => {
      doc.text(`\nCrane ${index + 1}:`);
      Object.entries(crane).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`);
      });
    });

    doc.end();

    writeStream.on("finish", async () => {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "12302080603005@adit.ac.in",
            pass: "eagg wkni qzqa bjbx",
          },
        });

        const mailOptions = {
          from: "your-email@gmail.com",
          to: [formData.personalDetails.email, "owner-email@example.com"],
          subject: "Crane Form Details",
          text: "Attached is the PDF containing the crane form details.",
          attachments: [
            {
              filename: fileName,
              path: filePath,
            },
          ],
        };

        await transporter.sendMail(mailOptions);

        // Delete the temporary file after sending the email
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting temporary file:", err);
        });

        resolve();
      } catch (error) {
        console.error("Error sending email:", error);
        reject(error);
      }
    });

    writeStream.on("error", (error) => {
      console.error("Error writing PDF:", error);
      reject(error);
    });
  });
};

module.exports = { sendMail };
