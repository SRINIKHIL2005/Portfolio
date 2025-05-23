import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configure your Gmail credentials here
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dronasrinikhil@gmail.com',
    pass: 'xfuy xfka vcal nheu'
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await transporter.sendMail({
      from: email,
      to: 'dronasrinikhil@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      text: message + `\n\nFrom: ${name} <${email}>`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
