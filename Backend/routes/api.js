const router = require("express").Router();
const emailController = require("../controller/emailVerification")

// Registering the user.
router.post("/register", emailController.register);

// Verifying the user.
router.post("/verify", emailController.verify);

module.exports = router;