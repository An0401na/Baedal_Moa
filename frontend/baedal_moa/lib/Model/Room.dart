// To parse this JSON data, do
//
//     final room = roomFromJson(jsonString);

import 'dart:convert';

List<Room> roomFromJson(String str) =>
    List<Room>.from(json.decode(str).map((x) => Room.fromJson(x)));

String roomToJson(List<Room> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Room {
  Room({
    required this.roomId,
    required this.roomName,
    required this.hostUserId,
    required this.resId,
    required this.roomMaxPeople,
    required this.roomStartTime,
    required this.roomExpireTime,
    required this.roomLocationX,
    required this.roomLocationY,
    required this.roomOrderPrice,
    required this.roomDelFee,
    required this.roomInfo,
    required this.roomIsActive,
  });

  int roomId;
  String roomName;
  int hostUserId;
  int resId;
  int roomMaxPeople;
  DateTime roomStartTime;
  DateTime roomExpireTime;
  String roomLocationX;
  String roomLocationY;
  int roomOrderPrice;
  int roomDelFee;
  String roomInfo;
  int roomIsActive;

  factory Room.fromJson(Map<String, dynamic> json) => Room(
        roomId: json["room_id"],
        roomName: json["room_name"],
        hostUserId: json["host_user_id"],
        resId: json["res_id"],
        roomMaxPeople: json["room_max_people"],
        roomStartTime: DateTime.parse(json["room_start_time"]),
        roomExpireTime: DateTime.parse(json["room_expire_time"]),
        roomLocationX: json["room_location_x"],
        roomLocationY: json["room_location_y"],
        roomOrderPrice: json["room_order_price"],
        roomDelFee: json["room_del_fee"],
        roomInfo: json["room_info"],
        roomIsActive: json["room_is_active"],
      );

  Map<String, dynamic> toJson() => {
        "room_id": roomId,
        "room_name": roomName,
        "host_user_id": hostUserId,
        "res_id": resId,
        "room_max_people": roomMaxPeople,
        "room_start_time": roomStartTime.toIso8601String(),
        "room_expire_time": roomExpireTime.toIso8601String(),
        "room_location_x": roomLocationX,
        "room_location_y": roomLocationY,
        "room_order_price": roomOrderPrice,
        "room_del_fee": roomDelFee,
        "room_info": roomInfo,
        "room_is_active": roomIsActive,
      };
}
