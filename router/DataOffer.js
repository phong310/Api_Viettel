const router = require("express").Router();
const DataOfferController = require('../controller/DataOffer');
const middlewareController = require('../middleware/middlewareController')

router.get('/get-all-offer', DataOfferController.getAll);

module.exports = router;