const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('restaurants', {
    res_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    res_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    res_location: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    res_location_x: {
      type: DataTypes.DECIMAL(16,14),
      allowNull: true
    },
    res_location_y: {
      type: DataTypes.DECIMAL(17,14),
      allowNull: true
    },
    res_category: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    res_information: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    res_min_order_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    res_image_dir: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'restaurants',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "res_id" },
        ]
      },
      {
        name: "res_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "res_id" },
        ]
      },
    ]
  });
};
