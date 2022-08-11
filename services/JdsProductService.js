const Axios = require('axios');

const base_url = 'https://60c18de74f7e880017dbfd51.mockapi.io/api/v1/jabar-digital-services/product';

const JdsProductService = {
    getProduct: async function (product = null) {
        const res = await Axios.get(base_url, {
            params: {
                product
            }
        });
        return res.data;
    },

    getProductAdmin: async function (department = null, product = null, price = null, sort = null) {
        const res = await Axios.get(base_url, {
            params: {
                department,
                product,
                price
            }
        });

        if (sort === 'price_asc') {
            return res.data.sort((a, b) => a.price - b.price);
        }else if (sort === 'price_desc') {
            return res.data.sort((a, b) => b.price - a.price);
        }
        return res.data;
    }
}

module.exports = JdsProductService;