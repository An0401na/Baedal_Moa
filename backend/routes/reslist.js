const express = require('express');
const { delivery_fees, restaurants } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const resList = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
        });
        res.json(resList);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;