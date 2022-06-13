const express = require('express');
const { restaurants, delivery_fees } = require('../models');

const router = express.Router();

router.get('/burger', async (req, res, next) => {
    try {
        const find_burger_res = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
            where: {
                res_category: '버거',
            }
        });
        res.json(find_burger_res);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/chicken', async (req, res, next) => {
    try {
        const find_chicken_res = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
            where: {
                res_category: '치킨',
            }
        });
        res.json(find_chicken_res);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/pizza', async (req, res, next) => {
    try {
        const find_pizza_res = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
            where: {
                res_category: '피자',
            }
        });
        res.json(find_pizza_res);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/zzangggae', async (req, res, next) => {
    try {
        const find_zzanggae_res = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
            where: {
                res_category: '중식',
            }
        });
        res.json(find_zzanggae_res);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/korea', async (req, res, next) => {
    try {
        const find_korea_res = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
            where: {
                res_category: '한식',
            }
        });
        res.json(find_korea_res);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/japanese', async (req, res, next) => {
    try {
        const find_japanese_res = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
            where: {
                res_category: '일식',
            }
        });
        res.json(find_japanese_res);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/zokbal', async (req, res, next) => {
    try {
        const find_zokbal_res = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
            where: {
                res_category: '족발',
            }
        });
        res.json(find_zokbal_res);        
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/bunsik', async (req, res, next) => {
    try {
        const find_bunsik_res = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
            where: {
                res_category: '분식',
            }
        });
        res.json(find_bunsik_res);        
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/cafe', async (req, res, next) => {
    try {
        const find_cafe_res = await restaurants.findAll({
            include: [{
                model: delivery_fees,
                as: 'delivery_fees',
                attributes: ['del_fee', 'del_min_order_price']
            }],
            attributes: ['res_id', 'res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price', 'res_image_dir'],
            where: {
                res_category: '카페/디저트',
            }
        });
        res.json(find_cafe_res);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;