const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    room_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    room_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    host_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'restaurants',
        key: 'res_id'
      }
    },
    room_max_people: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    room_start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    room_expire_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    room_location_x: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    room_location_y: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    room_order_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    room_del_fee: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    room_info: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    room_is_acitve: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rooms',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "room_id" },
        ]
      },
      {
        name: "host_user_id",
        using: "BTREE",
        fields: [
          { name: "host_user_id" },
        ]
      },
      {
        name: "res_id",
        using: "BTREE",
        fields: [
          { name: "res_id" },
        ]
      },
    ]
  });
};
