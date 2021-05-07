export default (sequelize, DataTypes) => sequelize.define('deadline', {
  idDeadline: {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  task: {
    type: DataTypes.STRING(512),
    allowNull: true
  },
  isDone: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  subjectId: {
    type: DataTypes.STRING(45),
    allowNull: false,
    references: {
      model: 'subject',
      key: 'idSubject'
    }
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
  tableName: 'deadline',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "idDeadline" },
      ]
    },
    {
      name: "subjectId_idx",
      using: "BTREE",
      fields: [
        { name: "subjectId" },
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
