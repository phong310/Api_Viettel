const router = require("express").Router();
const AuthController = require("../controller/AuthController");
const middlewareController = require("../middleware/middlewareController")

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser)
router.post("/logout", middlewareController.verifyToken, AuthController.logoutUser)
router.post("/refresh", AuthController.requestRefeshToken);


module.exports = router