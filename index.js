import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 👉 Serve static files from client/
app.use(express.static(path.join(__dirname, "../client")));

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Gemini email generator route
app.post("/generate-email", async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedEmail = response.text();

    res.json({ email: generatedEmail });
  } catch (error) {
    console.error("Error generating email:", error);
    res.status(500).json({ error: "Error generating email" });
  }
});

// Email sender route
app.post("/send-email", async (req, res) => {
  const { recipients, subject, body } = req.body;

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients,
      subject: subject,
      text: body,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

// Handle fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
