const router = require("express").Router();
const DataController = require("../controller/Data")
const middlewareController = require("../middleware/middlewareController")

router.get('/getAll', DataController.getAllData);
router.post('/add-new', DataController.addNewData);
router.put('/update/:id', DataController.updateData);
router.delete('/:id', DataController.deleteData)
router.get('/search',DataController.searchDataNetWork)

module.exports = router