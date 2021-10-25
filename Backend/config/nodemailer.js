const nodemailer = require("nodemailer");

// Function to send email.
const sendEmail = async (email, otp) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: "Verification <sachan.ayush27@gmail.com>",
            to: email,
            subject: "Verify your email",
            text: `Your OTP is ${otp}.\nDo not share with anyone`
        }

        const results = await transport.sendMail(mailOptions, (error, info) => {
            console.log(info);
        });
        return results;

    } catch (error) {
        return error;
    }
}

module.exports = sendEmail;