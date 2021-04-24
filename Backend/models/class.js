export default (sequelize, DataTypes) => sequelize.define('class', {
  idClass: {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  number: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  from: {
    type: DataTypes.TIME,
    allowNull: false
  },
  to: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'class',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idClass" },
      ]
    },
  ]
})
