const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { rooms, restaurants } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const room = await rooms.findAll({
            where: {
                room_is_active:true
            }
        });
        res.json(room);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/reslist', async(req, res, next) => {
    try{
        const resList = await restaurants.findAll({
            attributes: ['res_name', 'res_location', 'res_category', 'res_information', 'res_min_order_price'],
        })
        res.json(resList);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;