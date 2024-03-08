const router = require("express").Router();
const ComboDataController = require('../controller/ComboData')
const middlewareController = require("../middleware/middlewareController")

router.get('/getAllCombo', middlewareController.verifyToken, ComboDataController.getAllData)

module.exports = router