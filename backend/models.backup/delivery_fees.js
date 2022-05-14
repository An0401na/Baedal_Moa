const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('delivery_fees', {
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'restaurants',
        key: 'res_id'
      }
    },
    del_fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    del_min_order_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'delivery_fees',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "res_id" },
          { name: "del_fee" },
        ]
      },
    ]
  });
};
