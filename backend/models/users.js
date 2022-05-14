const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_nickname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_token: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_location_x: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    user_location_y: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: true
    },
    user_cash: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "users_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
