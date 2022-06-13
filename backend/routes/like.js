const express = require('express');
const { like, restaurants, delivery_fees, } = require('../models');

const router = express.Router();

router.post('/update', async(req, res, next) => {
    try {
        //찜 추가
        if (req.body.is_like == 'true' ) {
            await like.create({
                user_id: req.body.user_id,
                res_id: req.body.res_id,
            });
        }
        //찜 삭제
        else {
            await like.destroy({
                where: {
                    user_id: req.body.user_id,
                    res_id: req.body.res_id,
                }
            });
        }
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.post('/get', async (req, res, next) => {
    try {
        const find_like = await like.findAll({
            attributes: ['user_id', 'res_id'],
            where: {
                user_id: req.body.user_id,
            }
        });

        for (i in find_like) {
            const find_res = await restaurants.findOne({
                attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
                where: {
                    res_id : find_like[i].res_id,
                }
            });
            find_like[i].dataValues.res_id = find_res.res_id;
            find_like[i].dataValues.res_name = find_res.res_name;
            find_like[i].dataValues.res_location = find_res.res_location;
            find_like[i].dataValues.res_category = find_res.res_category;
            find_like[i].dataValues.res_information = find_res.res_information;
            find_like[i].dataValues.res_min_order_price = find_res.res_min_order_price;
            find_like[i].dataValues.res_image_dir = find_res.res_image_dir;
            
            const find_del = await delivery_fees.findAll({
                attributes: ['del_fee', 'del_min_order_price'],
                where: {
                    res_id : find_like[i].res_id,
                }
            });

            find_like[i].dataValues.delivery_fees = find_del;
           
            delete find_like[i].dataValues.user_id;
        }

        res.json(find_like);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;