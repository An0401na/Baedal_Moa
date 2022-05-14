const express = require('express');
const { users, rooms } = require('../models');
const getDistance = require('../functions/getDistance')

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let user_xy = await users.findOne({
            attributes: ['user_location_x', 'user_location_y'],
            where: {
                user_nickname: req.query.user_nickname
                //query
            }
        });
        
        const room = await rooms.findAll({
            where: {
                room_is_active: true,
            }
        });
        console.log(user_xy.user_location_x);
        console.log(user_xy.user_location_y);

        const findroom = []
        for (let i in room) {
            let dist = getDistance(room[i].room_location_x, room[i].room_location_y, user_xy.user_location_x, user_xy.user_location_y)
            console.log(dist);
            if(dist <= 200000)
            findroom.push(room[i])
        }
        res.json(findroom);

    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        rooms.create({
            room_name: req.query.room_name,
            host_user_id: req.query.host_user_id,
            res_id: req.query.res_id,
            room_max_people: req.query.room_max_people,
            room_start_time: req.query.room_start_time,
            room_expire_time: req.query.room_expire_time,
            room_location_x: req.query.room_location_x,
            room_location_y: req.query.room_location_y,
            room_order_prcie: req.query.room_order_price,
            room_del_fee: req.query.room_del_fee,
            room_is_active : req.query.room_is_active,
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/join', async (req, res, next) => {
    try {

    } catch (err) {
        console.error(err);
        next(err);
    }
});
module.exports = router;