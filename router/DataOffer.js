const router = require("express").Router();
const DataOfferController = require('../controller/DataOffer');
const middlewareController = require('../middleware/middlewareController')

router.get('/get-all-offer', middlewareController.verifyToken, DataOfferController.getAll);

module.exports = router;