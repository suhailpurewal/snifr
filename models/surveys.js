module.exports = function(sequelize, DataTypes) {
    var Survey = sequelize.define("Survey", {
        q1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
        q2: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
        q3: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
        q4: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
        q5: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
        q6: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
        q7: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
        q8: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
        q9: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
        q10: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isInt: true,
            min: 1,
            max: 5
        },
    });

    Survey.associate = function(models) {
        Survey.belongsTo(models.Dog, {
            onDelete: 'cascade'
        });
    };

    return Survey;
}