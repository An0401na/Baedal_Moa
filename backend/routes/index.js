const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { rooms } = require('../models');
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
})

module.exports = router;