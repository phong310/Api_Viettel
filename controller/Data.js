const DataModel = require('../models/DataModel')

const DataController = {

    // Test 
    test: async (req, res) => {
        res.status(200).json("Hello world")
    },

    getAllData: async (req, res) => {
        try {
            const Data = await DataModel.find({ type: 'data' });
            res.status(200).json(Data)
        } catch (e) {
            res.status(500).json({ err: e })
        }
    },

    // Add data
    addNewData: async (req, res) => {
        try {
            // if (!req.body.name ||
            //     !req.body.price ||
            //     !req.body.data ||
            //     !req.body.syntax ||
            //     !req.body.phone ||
            //     !req.body.hot ||
            //     !req.body.register ||
            //     !req.body.description ||
            //     !req.body.type) {
            //     return res.status(400).json({ error: "Missing required fields" });
            // }
            const newData = {
                name: req.body.name,
                price: req.body.price,
                data: req.body.data,
                syntax: req.body.syntax,
                phone: req.body.phone,
                hot: req.body.hot,
                register: req.body.register,
                description: req.body.description,
                type: req.body.type
            };

            const DataNetWork = new DataModel(newData);
            await DataNetWork.save();
            res.status(200).json(DataNetWork);
        } catch (e) {
            res.status(500).json({ err: e });
        }
    },

    // update
    updateData: async (req, res) => {
        try {
            const DataId = req.params.id;
            const updateUser = {
                name: req.body.name,
                price: req.body.price,
                data: req.body.data,
                syntax: req.body.syntax,
                phone: req.body.phone,
                hot: req.body.hot,
                register: req.body.register,
                description: req.body.description,
                type: req.body.type
            }
            const query = { _id: DataId };
            const options = { new: true };
            const result = await DataModel.findOneAndUpdate(query, updateUser, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // delete
    deleteData: async (req, res) => {
        try {
            const DataId = req.params.id;
            const itemDelete = await DataModel.findByIdAndDelete(DataId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    }

}

module.exports = DataController