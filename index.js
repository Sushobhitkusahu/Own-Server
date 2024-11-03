require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Require cors here

const app = express(); // Initialize app first
app.use(cors()); // Then apply CORS middleware
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "7f2e09001@smtp-brevo.com", 
        pass:  process.env.SENDINBLUE_API_KEY,
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, message } = req.body;
    console.log("Received message:", message); 
    const mailOptions = {
        from: " sushobhitsahu@gmail.com",
        to: to,
        subject: subject,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send({ message: "Error sending email" });
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send({ message: "Email sent successfully" });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
