export default (sequelize, DataTypes) => sequelize.define('weekday', {
  idWeekday: {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  Weekday: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: "Weekday_UNIQUE"
  }
}, {
  sequelize,
  tableName: 'weekday',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        {name: "idWeekday"},
      ]
    },
    {
      name: "idWeekday_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        {name: "idWeekday"},
      ]
    },
    {
      name: "Weekday_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        {name: "Weekday"},
      ]
    },
  ]
})
