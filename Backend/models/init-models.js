const {DataTypes} = sequelize;
import sequelize from 'sequelize';
import _Class  from "./class.js";
import _deadline from "./deadline.js";
import _notes from "./notes.js";
import _schedule from "./schedule.js";
import _teacher from "./teacher.js";
import _subject from "./subject.js";
import _user from "./user.js";
import _weekday from "./weekday.js";
import _classtype from './classtype.js';

function initModels(sequelize) {
  let Class = _Class(sequelize, DataTypes);
  let classtype = _classtype(sequelize, DataTypes);
  let deadline = _deadline(sequelize, DataTypes);
  let notes = _notes(sequelize, DataTypes);
  let schedule = _schedule(sequelize, DataTypes);
  let subject = _subject(sequelize, DataTypes);
  let teacher = _teacher(sequelize, DataTypes);
  let user = _user(sequelize, DataTypes);
  let weekday = _weekday(sequelize, DataTypes);

  deadline.belongsTo(subject, { foreignKey: "subjectId"});
  subject.hasMany(deadline, { foreignKey: "subjectId"});
  notes.belongsTo(subject, { foreignKey: "subjectId"});
  subject.hasMany(notes, { foreignKey: "subjectId"});
  schedule.belongsTo(Class, { foreignKey: "classId"});
  Class.hasMany(schedule, { foreignKey: "classId"});
  schedule.belongsTo(classtype, { foreignKey: "classtypeId"});
  classtype.hasMany(schedule, { foreignKey: "classtypeId"});
  schedule.belongsTo(subject, { foreignKey: "subjectId"});
  subject.hasMany(schedule, { foreignKey: "subjectId"});
  schedule.belongsTo(teacher, { foreignKey: "teacherId"});
  teacher.hasMany(schedule, { foreignKey: "teacherId"});
  schedule.belongsTo(user, { foreignKey: "userId"});
  user.hasMany(schedule, { foreignKey: "userId"});
  schedule.belongsTo(weekday, { foreignKey: "weekdayId"});
  weekday.hasMany(schedule, { foreignKey: "weekdayId"});

  return {
    Class,
    classtype,
    deadline,
    notes,
    schedule,
    subject,
    teacher,
    user,
    weekday,
  };
}
export default initModels;
