const Axios = require('axios');
const { RATE_CONVERTION_API_KEY } = require('../constants');

const base_url_convert = 'https://api.apilayer.com/fixer/convert' 

const RateConvertionService = {
    convert: async function (to, from, amount) {
        const res = await Axios.get(base_url_convert, {
            params: {
                to,
                from,
                amount
            },
            headers: {
                'apikey': RATE_CONVERTION_API_KEY
            }
        });

        return res.data;
    }
}

module.exports = RateConvertionService;