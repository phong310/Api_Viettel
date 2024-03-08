const DataModel = require('../models/DataModel')

const DataSieuTocController = {

    getAll: async (req, res) => {
        try {
            const Data = await DataModel.find({ type: 'data-sieutoc' });
            res.status(200).json(Data)

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

}
module.exports = DataSieuTocController