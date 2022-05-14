const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('restaurant_menus', {
    menu_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'restaurants',
        key: 'res_id'
      }
    },
    menu_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    menu_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    menu_image_dir: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'restaurant_menus',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "menu_id" },
          { name: "res_id" },
        ]
      },
      {
        name: "menu_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "menu_id" },
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
