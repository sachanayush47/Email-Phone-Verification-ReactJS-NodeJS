const router = require("express").Router();
const verificationController = require("../controller/verification")

// Registering the user.
router.post("/register", verificationController.register);

// Verifying the user.
router.post("/verify", verificationController.verify);

module.exports = router;