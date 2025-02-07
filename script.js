document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById("name").value,
        organisation: document.getElementById("organisation").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    const response = await fetch("/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
});

/* server.js */
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password"
    }
});

app.post("/send-email", (req, res) => {
    const { name, organisation, email, mobile, subject, message } = req.body;
    const mailOptions = {
        from: email,
        to: "your-email@gmail.com",
        subject: `New Contact: ${subject}`,
        text: `Name: ${name}\nOrganisation: ${organisation}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: "Error sending email" });
        }
        res.json({ message: "Email sent successfully" });
    });
});

app.listen(3000, () => console.log("Server started on port 3000"));
