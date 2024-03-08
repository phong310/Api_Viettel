const router = require("express").Router();
const ComboDataController = require('../controller/ComboData')
const middlewareController = require("../middleware/middlewareController")

router.get('/getAllCombo', middlewareController.verifyToken, ComboDataController.getAllData)
router.post('/add-new-combo', ComboDataController.addNewData)
router.put('/update/:id', ComboDataController.updateComboData)
router.delete('/:id',ComboDataController.deleteComboData)

module.exports = router