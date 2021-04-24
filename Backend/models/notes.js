export default (sequelize, DataTypes) => sequelize.define('subject', {
    idNote: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING(100000)
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
    tableName: 'notes',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "idNote" },
            ]
        },
        {
            name: "idNote_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "idNote" },
            ]
        },
        {
            name: "subjectId_idx",
            using: "BTREE",
            fields: [
                { name: "subjectId" },
            ]
        },
    ]
})
