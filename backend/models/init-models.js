var DataTypes = require("sequelize").DataTypes;
var _delivery_fees = require("./delivery_fees");
var _like = require("./like");
var _restaurant_menus = require("./restaurant_menus");
var _restaurants = require("./restaurants");
var _room_member_menus = require("./room_member_menus");
var _room_members = require("./room_members");
var _rooms = require("./rooms");
var _users = require("./users");

function initModels(sequelize) {
  var delivery_fees = _delivery_fees(sequelize, DataTypes);
  var like = _like(sequelize, DataTypes);
  var restaurant_menus = _restaurant_menus(sequelize, DataTypes);
  var restaurants = _restaurants(sequelize, DataTypes);
  var room_member_menus = _room_member_menus(sequelize, DataTypes);
  var room_members = _room_members(sequelize, DataTypes);
  var rooms = _rooms(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  rooms.belongsToMany(users, { as: 'user_id_users', through: room_members, foreignKey: "room_id", otherKey: "user_id" });
  users.belongsToMany(rooms, { as: 'room_id_rooms', through: room_members, foreignKey: "user_id", otherKey: "room_id" });
  room_member_menus.belongsTo(restaurant_menus, { as: "menu", foreignKey: "menu_id"});
  restaurant_menus.hasMany(room_member_menus, { as: "room_member_menus", foreignKey: "menu_id"});
  delivery_fees.belongsTo(restaurants, { as: "re", foreignKey: "res_id"});
  restaurants.hasMany(delivery_fees, { as: "delivery_fees", foreignKey: "res_id"});
  restaurant_menus.belongsTo(restaurants, { as: "re", foreignKey: "res_id"});
  restaurants.hasMany(restaurant_menus, { as: "restaurant_menus", foreignKey: "res_id"});
  rooms.belongsTo(restaurants, { as: "re", foreignKey: "res_id"});
  restaurants.hasMany(rooms, { as: "rooms", foreignKey: "res_id"});
  room_member_menus.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
  rooms.hasMany(room_member_menus, { as: "room_member_menus", foreignKey: "room_id"});
  room_members.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
  rooms.hasMany(room_members, { as: "room_members", foreignKey: "room_id"});
  room_member_menus.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(room_member_menus, { as: "room_member_menus", foreignKey: "user_id"});
  room_members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(room_members, { as: "room_members", foreignKey: "user_id"});
  rooms.belongsTo(users, { as: "host_user", foreignKey: "host_user_id"});
  users.hasMany(rooms, { as: "rooms", foreignKey: "host_user_id"});

  return {
    delivery_fees,
    like,
    restaurant_menus,
    restaurants,
    room_member_menus,
    room_members,
    rooms,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
