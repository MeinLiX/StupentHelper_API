export default (sequelize, DataTypes) => sequelize.define('schedule', {
  idSchedule: {
    type: DataTypes.STRING(45),
    allowNull: false,
    primaryKey: true
  },
  parity: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  classId: {
    type: DataTypes.STRING(45),
    allowNull: false,
    references: {
      model: 'class',
      key: 'idClass'
    }
  },
  subjectId: {
    type: DataTypes.STRING(45),
    allowNull: false,
    references: {
      model: 'subject',
      key: 'idSubject'
    }
  },
  weekdayId: {
    type: DataTypes.STRING(45),
    allowNull: false,
    references: {
      model: 'weekday',
      key: 'idWeekday'
    }
  },
  classtypeId: {
    type: DataTypes.STRING(45),
    allowNull: false,
    references: {
      model: 'class type',
      key: 'idClass type'
    }
  },
  teacherId: {
    type: DataTypes.STRING(45),
    allowNull: false,
    references: {
      model: 'teacher',
      key: 'idTeacher'
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
  tableName: 'schedule',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        {name: "idSchedule"},
      ]
    },
    {
      name: "idSchedule_UNIQUE",
      unique: true,
      using: "BTREE",
      fields: [
        {name: "idSchedule"},
      ]
    },
    {
      name: "classId_idx",
      using: "BTREE",
      fields: [
        {name: "classId"},
      ]
    },
    {
      name: "subjectId_idx",
      using: "BTREE",
      fields: [
        {name: "subjectId"},
      ]
    },
    {
      name: "weekdayId_idx",
      using: "BTREE",
      fields: [
        {name: "weekdayId"},
      ]
    },
    {
      name: "classtypeId_idx",
      using: "BTREE",
      fields: [
        {name: "classtypeId"},
      ]
    },
    {
      name: "teacherId_idx",
      using: "BTREE",
      fields: [
        {name: "teacherId"},
      ]
    },
    {
      name: "userId_idx",
      using: "BTREE",
      fields: [
        {name: "userId"},
      ]
    },
  ]
})
