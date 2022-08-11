const Rules = require('./Rules');

const UserRules = Object.assign(
    {    
        register: [
            Rules.check('name').isLength({ min: 3 }),
            Rules.check('email').isEmail(),
            Rules.check('nik').isLength({ min: 16, max: 16 }),
            Rules.check('password').isLength({ min: 6 })
        ],
        login: [
            Rules.check('email').isEmail().optional({ nullable: true, checkFalsy: true }),
            Rules.check('nik').isLength({ min: 16, max: 16 }),
            Rules.check('password').isLength({ min: 6 })
        ],
    },
    Rules
);

module.exports = UserRules;