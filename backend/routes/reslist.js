const express = require('express');
const { delivery_fees, restaurants, restaurant_menus } = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

const router = express.Router();

//가게 리스트 뽑아다가 전송
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

//검색
router.post('/search', async (req, res, next) => {
    try {
        const reslist = [];

        const find_res = await restaurants.findAll({
                include: [{
                    model: delivery_fees,
                    as: 'delivery_fees',
                    attributes: ['del_fee', 'del_min_order_price']
                }],
                attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
                where: {
                    res_name: {
                        [Op.like]: "%" + req.body.keyword + "%"
                    }
                }
        });

        for (i in find_res) {
            reslist.push(find_res[i].dataValues);
        }

        const findmenu = await restaurant_menus.findAll({
            attributes: ['res_id'],
            where: {
                menu_name: {
                    [Op.like]: "%" + req.body.keyword + "%"
                }
            }
        });

        for (i in findmenu) {
            const find = await restaurants.findAll({
                include: [{
                    model: delivery_fees,
                    as: 'delivery_fees',
                    attributes: ['del_fee', 'del_min_order_price']
                }],
                attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
                where: {
                    res_id: findmenu[i].res_id,
                }
            });

            for (j in find)
                reslist.push(find[j].dataValues);
        }

        res.json(reslist);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;