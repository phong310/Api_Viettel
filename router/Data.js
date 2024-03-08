const router = require("express").Router();
const DataController = require("../controller/Data")
const middlewareController = require("../middleware/middlewareController")

router.get('/test',DataController.test)
router.get('/getAll', middlewareController.verifyToken, DataController.getAllData);
router.post('/add-new', DataController.addNewData);
router.put('/update/:id', DataController.updateData);
router.delete('/:id', DataController.deleteData)

module.exports = router