module.exports = function(sequelize, DataTypes) {
    var Filter = sequelize.define("Filter", {
        sex_pref: {
            type: DataTypes.BOOLEAN,  //female === true, male === false
            allowNull: true
        },
        size_pref: {
            type: DataTypes.STRING,
            allowNull: true
        },
        temperament_pref: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fixed_pref: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

    Filter.associate = function(models) {
        Filter.belongsTo(models.Dog, {
            onDelete: 'cascade'
        });
    };
    
    return Filter;
}