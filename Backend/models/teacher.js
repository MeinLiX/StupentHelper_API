export default (sequelize, DataTypes) => sequelize.define('teacher', {
  idTeacher: {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  surname: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  'middle name': {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'teacher',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idTeacher" },
      ]
    },
    {
      name: "idTeacher_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idTeacher" },
      ]
    },
  ]
})
