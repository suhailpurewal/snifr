module.exports = function(sequelize, DataType) {
    var User = sequelize.define("User", {
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
        },
        zip_code: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                is: /^\d{5}$/
            }
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Dog, {
            onDelete: 'cascade'
        });
    };
    
    User.findByUsername = function(username, cb){
        User.findOne({ where: {username: username}}).then(user => {
            if (user){
                return cb(null, user);
            } else {
                return cb(null, null);
            }
        });
    };
    
    return User;
};