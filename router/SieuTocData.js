const router = require("express").Router();
const DataSieuTocController = require("../controller/SieuTocData");
const middlewareController = require('../middleware/middlewareController');

router.get("/get-all", middlewareController.verifyToken, DataSieuTocController.getAll)

module.exports = router