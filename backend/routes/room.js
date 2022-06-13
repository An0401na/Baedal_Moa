const express = require('express');
const { Op } = require('sequelize');
const { users, rooms, restaurants, room_members, room_member_menus, delivery_fees } = require('../models');
const getDistance = require('../functions/getDistance');

const router = express.Router();

//주변에 존재하는 방 load
router.post('/', async (req, res, next) => {
    try {
        //사용자 위치 파악
        const user = await users.findOne({
            attributes: ['user_location_x', 'user_location_y'],
            where: {
                user_id: req.body.user_id
            }
        });
        
        //활성화된 방만 꺼내옴
        const room = await rooms.findAll({
            where: {
                room_is_active: true,
            }
        });

        //위치 기반
        const findroom = []
        for (let i in room) {
            let dist = getDistance(room[i].room_location_x, room[i].room_location_y, user.user_location_x, user.user_location_y)
            //1000 => 1km
            if (dist <= 200000000) {
                /*
                const hostname = await users.findOne({
                    attributes: ['user_nickname'],
                    where: {
                        user_id: room[i].host_user_id
                    }
                });
                */
                
                //res정보 꺼내옴
                const res = await restaurants.findOne({
                    attributes: ['res_id', 'res_name', 'res_location', 'res_min_order_price'],
                    where: {
                        res_id: room[i].res_id
                    }
                });
                
                //해당 방에 참여한 사람 꺼내옴
                const find_room_user = await room_members.findAll({
                    attributes: ['user_id'],
                    where: {
                        room_id: room[i].room_id,
                    }
                });

                //해당 방에 참여한 사람의 정보, 메뉴를 꺼내옴
                //배열 초기화 (변수 scope 문제)
                let roomUser = [];     //해당 방에 참여한 사람의 정보
                let roomUserMenu = [];    //해당 방에 참여한 사람이 시킨 메뉴의 정보

                for (let j in find_room_user) {                    
                    //해당 방에 참여한 사람의 정보
                    const room_user = await users.findOne({
                        attributes: ['user_id','user_nickname','user_location_x', 'user_location_y', 'user_cash'],
                        where: {
                            user_id: find_room_user[j].user_id,
                        }
                    })
                    roomUser.push(room_user);

                    //해당 방에 참여한 사람이 시킨 메뉴 정보(여러 개 존재)
                    const find_room_member_menus = await room_member_menus.findAll({
                        attributes: ['user_id', 'menu_id', 'menu_price', 'menu_count'],
                        where: {
                            room_id: room[i].room_id,
                            user_id: find_room_user[j].user_id,
                        }
                    })
                    roomUserMenu.push(find_room_member_menus);
                }

                room[i].dataValues.room_user = roomUser;
                room[i].dataValues.room_member_menus = roomUserMenu;
                room[i].dataValues.res = res;
                //room[i].host_user_id = hostname.user_nickname;
                findroom.push(room[i]);
            }
        }

        console.log(findroom);
        res.json(findroom);

    } catch (err) {
        console.error(err);
        next(err);
    }
});

//방장이 방생성
router.post('/create', async (req, res, next) => {
    try {
        //room 생성
        await rooms.create({
            room_name: req.body.room_name,
            host_user_id: req.body.host_user_id,
            res_id: req.body.res_id,
            address: req.body.address,
            room_max_people: req.body.room_max_people,
            room_start_time: req.body.room_start_time,
            room_expire_time: req.body.room_expire_time,
            room_location_x: req.body.room_location_x,
            room_location_y: req.body.room_location_y,
            room_order_price: req.body.room_order_price,
            room_del_fee: req.body.room_del_fee,
            room_is_active : true,
        });

        //생성된 room의 id를 불러옴
        const room_id = await rooms.findOne({
            attributes: ['room_id'],
            order: [['room_id', 'DESC']],
            where: {
                host_user_id: req.body.host_user_id,
            }
        });
        
        //room_member db저장
        await room_members.create ({
            room_id: room_id.room_id,
            user_id: req.body.host_user_id,
            user_total_price: req.body.room_order_price,
            user_del_fee: req.body.room_del_fee,
        });

        //room_members_menu가 문자열로 오니 객체로 파싱
        const roomMemberMenu = JSON.parse(req.body.room_member_menus)

        //room_members_menus db 저장
        for (i in roomMemberMenu[0]) {
            await room_member_menus.create({
                room_id: room_id.room_id,
                menu_id: roomMemberMenu[0][i].menu_id,
                user_id: roomMemberMenu[0][i].user_id,
                menu_price: roomMemberMenu[0][i].menu_price,
                menu_count: roomMemberMenu[0][i].menu_count,
            });
        }
        
        //room_id front에게 보내줌
        res.json(room_id);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//방참여
router.post('/join', async (req, res, next) => {
    try {
        //참가자의 총 계산금액 변수 설정(scope문제해결)
        let userTotalPrice = 0;

        //room_member_menus에 참가할 사람 추가
        const roomMemberMenus = JSON.parse(req.body.room_member_menus);
        
        for (i in roomMemberMenus) {
            userTotalPrice += roomMemberMenus[i].menu_price * roomMemberMenus[i].menu_count;
            await room_member_menus.create({
                room_id: req.body.room_id,
                menu_id: roomMemberMenus[i].menu_id,
                user_id: req.body.user_id,
                menu_price: roomMemberMenus[i].menu_price,
                menu_count: roomMemberMenus[i].menu_count,
            });
        }

        //기존 방 참가자의 총 계산금액 구하기
        const find_room_members_totalprice = await room_members.findAll({
            attribute: ['user_total_price'],
            where: {
                room_id: req.body.room_id,
            }
        });

        //기존 방에 참가한 인원수 세는 변수
        let countRoomUser = 1;
        //방에 참가할 사람과 기존 방에 참가한 사람의 총 계산금액 구하기 (인당 배달비 계산)
        let roomTotalPrice = userTotalPrice;

        //총 계산금액을 구하며 기존 방 인원수 세기
        for (i in find_room_members_totalprice) {
            countRoomUser += 1;
            roomTotalPrice += find_room_members_totalprice[i].user_total_price;
        }

        //방의 가게 정보 알아내기
        const find_res_id = await rooms.findOne({
            attributes: ['res_id'],
            where: {
                room_id: req.body.room_id,
            }
        });

        /*
        //가게의 배달료 구하기
        const find_del_fee = await delivery_fees.findOne({
            attributes: ['del_fee'],
            where: {
                res_id: find_res_id.res_id,
                del_min_order_price: { [Op.lte]: roomTotalPrice }
                //del_min_order_price <= roomTotalPrice
            }
        });
        */
        
        //참가한 유저의 배달기 가져오기
        const find_user_delfee = await room_members.findOne({
            attributes: ['user_del_fee'],
            where: {
                room_id: req.body.room_id,
            }
        });

        //방에 참가함으로써 새로운 인당 배달료 계산
        let delFee = Math.ceil((find_user_delfee.user_del_fee * (countRoomUser - 1)) / countRoomUser);

        //room_members에 추가
        await room_members.create({
            room_id: req.body.room_id,
            user_id : req.body.user_id,
            user_total_price : userTotalPrice,
            user_del_fee: delFee
        })

        //방에 참가함으로써 기존 유저들의 인당배달료를 수정함
        await room_members.update({
            user_del_fee: delFee
        }, {
            where: { room_id: req.body.room_id },
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//사용자가 방을 나감 1. 방장이 나갈경우 2. 유저가 나갈경우
router.post('/out', async (req, res, next) => {
    try {
        //room_member_menu 에 해당 사용자 삭제
        await room_member_menus.destroy({
            where: {
                room_id: req.body.room_id,
                user_id: req.body.user_id,
            }
        });
        //room_members 에 해당 사용자 삭제
        await room_members.destroy({
            where: {
                room_id: req.body.room_id,
                user_id: req.body.user_id,
            }
        });

        //방장이 나갔는지 아닌지 확인
        const findhost = await rooms.findOne({
            attribute: ['host_user_id'],
            where: {
                room_id: req.body.room_id,
            }
        });

        //방장이 나감
        if (req.body.user_id == findhost.host_user_id) {
            //해당 방에 참여한 두번째 유저가 있는 지 검사, 두번째 유저가 있으면 그사람이 방장이 되고, 없으면 방 삭제
            const finduser = await room_members.findOne({
                attribute: ['user_id'],
                where: {
                    room_id: req.body.room_id,
                }
            });

            //해당방에 유저가 없음
            if (finduser == null) {
                //방 삭제
                await rooms.destroy({
                    where: {
                        room_id: req.body.room_id,
                    }
                });
            }
            //해당방에 유저가 있음
            else {
                await rooms.update({
                    host_user_id: finduser.user_id,
                }, {
                    where: { room_id: req.body.room_id }
                });
            }
        }
        //유저가 나감
        else {
            //인당 배달비 다시 계산

            //총 계산금액을 구하고 방 인원수 세기
            const find_room_members_totalprice = await room_members.findAll({
                attributes: ['user_total_price'],
                where: {
                    room_id: req.body.room_id,
                }
            });

            //방에 참가한 인원수 변수
            let countRoomUser = 0;
            //방에 참가한 사람의 총 계산금액
            let roomTotalPrice = 0;

            //총 계산금액을 구하며 방 인원 수 세기
            for (i in find_room_members_totalprice) {
                countRoomUser += 1;
                roomTotalPrice += find_room_members_totalprice[i].user_total_price;
            }

            //방의 가게 정보 알아내기
            const find_res_id = await rooms.findOne({
                attributes: ['res_id'],
                where: {
                    room_id: req.body.room_id,
                }
            });

            //가게의 배달료 구하기
            const find_del_fee = await delivery_fees.findOne({
                attributes: ['del_fee'],
                where: {
                    res_id: find_res_id.res_id,
                    del_min_order_price: { [Op.lte]: roomTotalPrice }
                }
            });

            //유저가 떠남으로써 새로운 인당 배달료 계산
            let delFee = Math.ceil(find_del_fee.del_fee / countRoomUser);

            //room_members 수정
            await room_members.update({
                user_del_fee: delFee
            }, {
                where: { room_id: req.body.room_id }
            });
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
});

//주문 성공
router.post('/expire', async (req, res, next) => {
    try {
        //방 비활성화 시키기
        await rooms.update({
            room_is_active: 0
        }, {
            where: {
                room_id: req.body.room_id,
            }
        });

        //주문 시키기

        //방에 참여한 사람들의 정보 인당 배달비를 꺼냄
        const find_menu_price = await room_members.findAll({
            attribute: ['user_id', 'user_total_price', 'user_del_fee'],
            where: {
                room_id: req.body.room_id,
            }
        });

        //사용자 point 차감
        for (i in find_menu_price) {
            //i번째 사용자의 cash를 불러옴
            let user_cash = await users.findOne({
                attribute: ['user_cash'],
                where: {
                    user_id : find_menu_price[i].user_id,
                }
            })
            
            //update 할 유저 캐시 구함
            let updatecash = user_cash.user_cash - find_menu_price[i].user_del_fee - find_menu_price[i].user_total_price;

            //유저 캐시 차감
            await users.update({
                user_cash: updatecash
            }, {
                where: { user_id: find_menu_price[i].user_id }
            });
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
