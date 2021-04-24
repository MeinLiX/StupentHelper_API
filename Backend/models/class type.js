export default (sequelize, DataTypes) => sequelize.define('class type', {
  'idClass type': {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING(45),
    allowNull: false
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
  ]
})
