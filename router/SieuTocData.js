const router = require("express").Router();
const DataSieuTocController = require("../controller/SieuTocData");
const middlewareController = require('../middleware/middlewareController');

router.get("/get-all", middlewareController.verifyToken, DataSieuTocController.getAll)
router.post("/add-new", DataSieuTocController.addNewData)
router.put("/update/:id", DataSieuTocController.updateSieuTocData)
router.delete('/:id', DataSieuTocController.deleteSieuTocData)

module.exports = router