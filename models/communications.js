module.exports = function(sequelize, DataTypes) {
    var Communication = sequelize.define("Communication", {
        message_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        message_content: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
    });

    Communication.associate = function(models) {
        Communication.belongsTo(models.User, {foreignKey: 'initiator_id', targetKey: 'id'})
        Communication.belongsTo(models.User, {foreignKey: 'receiver_id', targetKey: 'id'})
    }
    return Communication;
};
