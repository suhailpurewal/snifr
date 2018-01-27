module.exports = function(sequelize, DataTypes) {
    var Dog = sequelize.define("Dog", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sex: {
            type: DataTypes.BOOLEAN, //true === female, false === male
            allowNull: false
            // validate: {
            //     len: [1]
            // }
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        fixed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
            // validate: {
            //     len: [1]
            // }
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [0,255]
            }
        },
        temperament: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0
            }
        }
    });
    
    Dog.associate = function(models) {
        Dog.belongsTo(models.User);
        Dog.hasOne(models.Survey);
        Dog.hasOne(models.Filter)
    };

    return Dog;
};

