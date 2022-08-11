const Helper = require("../helpers/Helper");
const UserRepository = require("../repositories/UserRepository");

const UserController = {
    me: async (req, res) => {
        const user = await UserRepository.find(req.user.id);
        res.status(200).json({
            status: "success",
            data: user
        })
    },

    generatePassword: async (req, res) => {
        const { nik, role } = req.query;
        const password = await Helper.generatePassword();
        res.status(200).json({
            status: "success",
            data: {
                nik,
                role,
                password
            }
        })
    },

    destroyByEmail: async (req, res) => {
        const { email } = req.query;
        const result = await UserRepository.deleteByEmail(email);
        res.status(200).json({
            status: "success",
            data: result
        })
    }
}

module.exports = UserController;