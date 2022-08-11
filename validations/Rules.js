const { validationResult, check } = require('express-validator');

const Rules = {
    execute(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(422).json({
            //     status: "error",
            //     message: errors.array()
            // });
            return res.status(422).json({ errors: errors.mapped() });
        }
        next();
    },
    check(param1, param2) {
        return check(param1, param2);
    }
};

module.exports = Rules;