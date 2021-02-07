export default (sequelize, DataTypes) => sequelize.define('subject', {
  idSubject: {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'subject',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        {name: "idSubject"},
      ]
    },
    {
      name: "idSubject_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        {name: "idSubject"},
      ]
    },
  ]
})
