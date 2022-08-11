const JdsProductService = require("../services/JdsProductService");
const RateConvertionService = require("../services/RateConvertionService");

const ProductController = {
    index: async (req, res) => {
        const products = await JdsProductService.getProduct();
        const rate = await RateConvertionService.convert('IDR', 'USD', 1);
        const results = products.map(product => {
            return {
                ...product,
                price_idr: (product.price * rate['result']).toFixed(2),
            }
        });
        res.status(200).json({
            status: "success",
            data: results
        })
    },

    indexAdmin: async (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                status: "error",
                message: "You are not authorized to access this resource"
            })
        }
        const { department, product, price, sort } = req.query;
        const products = await JdsProductService.getProductAdmin(department, product, price, sort);
        const rate = await RateConvertionService.convert('IDR', 'USD', 1);
        const results = products.map(product => {
            return {
                ...product,
                price_idr: (product.price * rate['result']).toFixed(2),
            }
        });
        res.status(200).json({
            status: "success",
            data: results
        })
    },

    myProduct: async (req, res) => {
        const products = await JdsProductService.getProduct(req.user.product);
        const rate = await RateConvertionService.convert('IDR', 'USD', 1);
        const results = products.map(product => {
            return {
                ...product,
                price_idr: (product.price * rate['result']).toFixed(2),
            }
        });
        res.status(200).json({
            status: "success",
            data: results
        })
    }
}

module.exports = ProductController;