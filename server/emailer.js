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
            user: "2023002044.adit@cvmu.edu.in",
            pass: "fmkd kzha hmcp lyuq",
          },
        });

        const mailOptions = {
          from: "2023002044.adit@cvmu.edu.in",
          to: [formData.personalDetails.email, "2023002044.adit@cvmu.edu.in"],
          subject: "Krish Crane - Configurations",
          text: `Thank you for submitting your crane requirement form. We have reviewed your specifications, and attached you will find the configuration file tailored to your request.\n\n
Please feel free to reach out if you have any questions or need further assistance. Our team is here to support you every step of the way.\n\n
Thank you for choosing Krish Crane. We appreciate your trust in our products and services.\n\n
Best regards,\n
Rahul Vishvakarma\n
Project Manager\n
Krish Crane\n
Phone: 9574879333\n
Email: info@krishcranes.com`,
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
