const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const UserModel = require("../models/UsersModel");


let refreshTokenArr = [];

const authController = {
    // Tạo access Token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            role: user.Role
        },
            process.env.JWT_ACCESS_KEY, { expiresIn: "1d" }
        )
    },

    // Tạo refresh Token
    generateRefreshTokensss: (user) => {
        return jwt.sign(
            {
                id: user.id,
                Role: user.Role
            },
            process.env.JWT_REFESH_KEY, { expiresIn: "365d" }
        )
    },

    // REGISTER 
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const hashConfirmPass = await bcrypt.hash(req.body.confirm, salt);

            // create new
            const newUser = await new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                confirm: hashConfirmPass,
                // phone: "NaN",
                status: 1
            })

            const user = await newUser.save();
            res.status(200).json(user)

        } catch (e) {
            res.status(500).json({ Err: e.message })
        }

    },

    // LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await UserModel.findOne({
                username: req.body.username
            });

            if (!user) {
                return res.status(500).json("Wrong username !");
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatch) {
                return res.status(500).json("Wrong password !");
            }

            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshTokensss(user);

            // Lưu refresh token vào mảng
            refreshTokenArr.push(refreshToken);

            // Lưu refresh token vào cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            // Trả về phản hồi với access token và refresh token
            res.status(200).json({ user, accessToken, refreshToken });
        } catch (e) {
            console.error("Error while finding user", e.message);
            res.status(500).json({ err: e.message });
        }
    },




    // REFRESH TOKEN
    requestRefeshToken: (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated")
        
        if (!refreshTokenArr.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid")
        }

        // verify refresh token
        jwt.verify(refreshToken, process.env.JWT_REFESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            // Nếu có refresh token mới rồi lọc cái cũ ra
            refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken)


            // Tạo mới một accessToken và refreshToken
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshTokensss(user);
            refreshTokenArr.push(newRefreshToken);

            // lưu refresh token vào cookie
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken })
        })

    },

    // LOGOUT
    logoutUser: async (req, res) => {
        refeshTokens = refreshTokenArr.filter((token) => token !== req.cookies.refreshToken);
        res.clearCookie("refreshToken");
        res.status(200).json("Logout success !")
    },
}

module.exports = authController