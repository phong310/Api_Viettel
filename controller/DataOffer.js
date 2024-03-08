const DataModel = require('../models/DataModel');

const DataOfferController = {
    getAll: async (req, res) => {
        try {
            const DataOffer = await DataModel.find({ type: 'data-offer' });
            res.status(200).json(DataOffer)

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },
}
module.exports = DataOfferController