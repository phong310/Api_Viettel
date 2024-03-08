const DataModel = require('../models/DataModel')

const ComboDataController = {
    getAllData: async (req, res) => {
        try {
            const Data = await DataModel.find({ type: 'data-combo' });
            res.status(200).json(Data)
        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

}

module.exports = ComboDataController