const User = require('../models/User');

const UserRepository = {
    find: async (id) => {
        return await User.findByPk(id);
    },

    findByNik: async (nik) => {
        return await User.findOne({
            where: {
                nik
            },
            attributes: {
                include: ['password']
            }
        });
    },

    findByEmail: async (email) => {
        return await User.findOne({
            where: {
                email
            },
            attributes: {
                include: ['password']
            }
        });
    },

    create: async (data) => {
        return await User.create(data);
    },

    deleteByEmail: async (email) => {
        return await User.destroy({
            where: {
                email
            }
        });
    }
}

module.exports = UserRepository;