export default (sequelize, DataTypes) => sequelize.define('material', {
  idMaterial: {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  path: {
    type: DataTypes.STRING(512),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  subjectId: {
    type: DataTypes.STRING(45),
    allowNull: false,
    references: {
      model: 'subject',
      key: 'idSubject'
    }
  }
}, {
  sequelize,
  tableName: 'material',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        {name: "idMaterial"},
      ]
    },
    {
      name: "subjectId_idx",
      using: "BTREE",
      fields: [
        {name: "subjectId"},
      ]
    },
  ]
})
