const router = require("express").Router();
const DataOfferController = require('../controller/DataOffer');
const middlewareController = require('../middleware/middlewareController')

router.get('/get-all-offer', middlewareController.verifyToken, DataOfferController.getAll);
router.post('/add-new-offer', DataOfferController.addNewData);
router.put('/update/:id', DataOfferController.updateOfferData);
router.delete('/:id', DataOfferController.deleteOfferData);

module.exports = router;