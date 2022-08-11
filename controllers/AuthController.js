const UserRepository = require("../repositories/UserRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../constants");

const AuthController = {
    login: async (req, res) => {
        const { email, nik, password } = req.body;
        let user = null;
        if (!email) {
            user = await UserRepository.findByNik(nik);
        } else {
            user = await UserRepository.findByEmail(email);
        }
        if (!user) {
            res.status(404).json({
                status: "error",
                message: "User not found"
            })
        }
        let hashedPasswordNodejs = user.password.replace(/^\$2y(.+)$/i, '$2a$1');
        bcrypt.compare(password, hashedPasswordNodejs, async function(err, result) {
            if (!result) {
                return res.status(401).json({
                    status: "error",
                    error: 'Invalid password',
                    message: 'Please check your email, nik, or password'
                });
            } else {
                const access_token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '3d' });
                user.dataValues.access_token = access_token;
                delete user.dataValues.password;
                return res.status(200).json({
                        status: "success",
                        data: user
                });
            }
        });
    },

    register: async (req, res) => {
        const { name, email, nik, password } = req.body;
        const role = 'user';
        $randomProduct = ['Salad', 'Chips', 'Chair', 'Tuna', 'Fish', 'Bacon', 'Pants'];

        let user = await UserRepository.findByNik(nik);
        if (user) {
            return res.status(409).json({
                status: "error",
                message: "User already exists"
            })
        }
        user = await UserRepository.findByEmail(email);
        if (user) {
            return res.status(409).json({
                status: "error",
                message: "User already exists"
            })
        }

        const result = await UserRepository.create({
            name,
            email,
            nik,
            password,
            role,
            product: $randomProduct[Math.floor(Math.random() * $randomProduct.length)]
        });

        return res.status(201).json({
            status: "success",
            data: result
        })
    }
}

module.exports = AuthController;