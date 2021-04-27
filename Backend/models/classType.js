export default (sequelize, DataTypes) => sequelize.define('classType', {
  'idClassType': {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING(45),
    allowNull: false,
    references: {
      model: 'user',
      key: 'idUser'
    }
  }
}, {
  sequelize,
  tableName: 'classType',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idClassType" },
      ]
    },
    {
      name: "userId_idx",
      using: "BTREE",
      fields: [
        { name: "userId" },
      ]
    },
  ]
})
