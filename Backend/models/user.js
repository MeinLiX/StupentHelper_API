export default (sequelize, DataTypes) => sequelize.define('user', {
  idUser: {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: "email_UNIQUE"
  },
  password: {
    type: DataTypes.STRING(75),
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'user',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idUser" },
      ]
    },
    {
      name: "email_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "email" },
      ]
    },
  ]
})
