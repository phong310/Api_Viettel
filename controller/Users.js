const UserModel = require('../models/UsersModel')
const bcrypt = require("bcrypt");

const UserController = {

    getAllUser: async (req, res) => {
        try {
            const User = await UserModel.find();
            res.status(200).json(User)

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // Add new
    createNewUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const hashConfirmPass = await bcrypt.hash(req.body.confirm, salt);

            const newUser = await new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                confirm: hashConfirmPass,
                phone: req.body.phone,
                status: req.body.status
            })

            const user = await newUser.save();
            res.status(200).json(user)

        } catch (e) {
            res.status(500).json({ Err: e.message })
        }
    },

    // delete
    deleteUser: async (req, res) => {
        try {
            const UserId = req.params.id
            const itemDelete = await UserModel.findByIdAndDelete(UserId);
            res.status(200).json(itemDelete);

        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // update 
    updateUsers: async (req, res) => {
        try {
            const UserId = req.params.id;
            const updateUser = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                confirm: req.body.confirm,
                phone: req.body.phone,
                status: req.body.status,

            }
            const query = { _id: UserId };
            const options = { new: true };
            const result = await UserModel.findOneAndUpdate(query, updateUser, options);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ Err: e })
        }
    },

    // Search
    searchUserList: async (req, res) => {
        try {
            const username = req.query.username;
            const status = req.query.status;
            let query = {};
            if (username & status) {
                query = { username: new RegExp(username, "i"), status: status }
            } else if (username) {
                query = { username: new RegExp(username, "i")};
            } else if (status) {
                query = { status: status }
            }

            const data = await UserModel.find(query);
            res.status(200).json(data)

        } catch (e) {
            res.status(500).json({ err: e })
        }
    }

}

module.exports = UserController