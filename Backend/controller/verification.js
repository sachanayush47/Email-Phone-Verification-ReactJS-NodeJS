const User = require("../model/user");
const Otp = require("../model/otp");
const sendEmail = require("../config/nodemailer");
const fast2sms = require("fast-two-sms");

// Generates a random 6 digit number for OTP.
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Send OTP as SMS.
async function sendSMS(number, otp) {
    const res = await fast2sms.sendMessage({
        authorization: process.env.API_KEY,
        message: `${otp} from Ayush Sachan`,
        numbers: [number],
    });
    return res;
}

// Validates email.
function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Validate number.
function validateNumber(email) {
    if (email.length == 10 && !isNaN(email)) {
        return true;
    }
    return false;
}

module.exports = {
    register: (req, res) => {
        const { name, email, password } = req.body;

        console.log(req.body);

        // Check if email already exist or not.
        User.findOne({ email: email }, (err, user) => {
            if (err) return res.send("Error occured" + err.message);
            if (user) {
                return res.send("Email/Phone already exists.");
            } else {
                // Adding user to DB and sending OTP to email/phone.
                User.create({ name: name, email: email, password: password }, (err, user) => {
                    if (err) return res.send("Error occured" + err.message);

                    const otp = generateOtp();

                    if (validateEmail(email)) {
                        // SENDING EMAIL and adding OTP to DB.
                        sendEmail(user.email, otp)
                            .then((result) => {
                                Otp.create({ otp: otp, userId: user._id });
                            })
                            .catch((err) => console.log(err));
                    } else if (validateNumber(email)) {
                        // SENDING SMS AND adding OTP to DB.
                        sendSMS(email, otp).then((result) => {
                            console.log(result);
                            Otp.create({ otp: otp, userId: user._id });
                        });
                    } else {
                        return res.send("Invalid phone/email.");
                    }

                    return res.status(201).send("OTP sent. Valid for only 2 minutes");
                });
            }
        });
    },

    verify: (req, res) => {
        const { otp, email } = req.body;

        // Finding the user provided OTP in the DB.
        Otp.findOne({ otp: otp }, async (err, otp) => {
            console.log("OTP:" + otp);
            if (!otp) {
                return res.send("Incorrect OTP");
            }

            const isExist = await User.exists({ _id: otp.userId });
            if (!isExist) {
                return res.send("Incorrect OTP or it has been expired.");
            }

            // If OTP founded then finding the associated user with this OTP using userID.
            User.findById(otp.userId, async (err, user) => {
                // If the current email and the email in DB matches then
                // update the "verified" to "true"
                if (email == user.email) {
                    await User.findByIdAndUpdate(otp.userId, { verified: true });
                    await Otp.deleteOne({ _id: otp._id });
                    res.send(`${email} has been successfully verified`);
                } else {
                    res.send("Incorrect OTP or it has been expired.");
                }
            });
        });
    },
};
