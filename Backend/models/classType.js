export default (sequelize, DataTypes) => sequelize.define('classtype', {
  idClassType: {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  typeName: {
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
  tableName: 'classtype',
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
