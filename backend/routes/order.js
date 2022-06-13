const express = require('express');
const { room_member_menus, rooms, restaurant_menus, restaurants, room_members } = require('../models');

const router = express.Router();

//user_id를 받으면 그동안 참여했던 모든 방의 번호, 주문가게, 주문한 메뉴랑 개수, 가격(메뉴 가격이랑 1/n한 배달비 따로), 주문완료시간 보내기
router.post('/', async(req, res, next) => {
    try {
        const find_menu = await room_member_menus.findAll({
            attributes: ['room_id', 'menu_id', 'menu_price', 'menu_count'],
            where: {
                user_id: req.body.user_id,
            }
        });

        for (i in find_menu) {
            //주문가게, 주문메뉴 json에 넣기
            const find_res_id = await restaurant_menus.findOne({
                attributes: ['res_id', 'menu_name'],
                where: {
                    menu_id: find_menu[i].menu_id,
                }
            });
            const find_resname = await restaurants.findOne({
                attributes: ['res_name'],
                where: {
                    res_id: find_res_id.res_id,
                }
            });
            find_menu[i].dataValues.menu_id = find_res_id.menu_name;
            find_menu[i].dataValues.res_id = find_resname.res_name;

            //주문 완료 시간 json에 넣기
            const find_time = await rooms.findOne({
                attributes: ['room_expire_time'],
                where: {
                    room_id: find_menu[i].room_id,
                    room_is_active: false,
                }
            });
            find_menu[i].dataValues.room_expire_time = find_time.room_expire_time;

            //1/n 배달비 json에 넣기
            const find_delfee = await room_members.findOne({
                attributes: ['user_del_fee'],
                where: {
                    room_id: find_menu[i].room_id,
                    user_id: req.body.user_id,
                }
            });
            find_menu[i].dataValues.user_del_fee = find_delfee.user_del_fee;
        }

        res.json(find_menu);

    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;