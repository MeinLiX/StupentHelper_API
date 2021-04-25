export default (sequelize, DataTypes) => sequelize.define('class type', {
  'idClass type': {
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
  tableName: 'class type',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idClass type" },
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
