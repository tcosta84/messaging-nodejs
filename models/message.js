module.exports = function(sequelize, DataTypes){
    var Message = sequelize.define('Message', {
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        expiration_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        status_code: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        freezeTableName: true,
        tableName: 'message',
        underscored: true
    });

    return Message;
};
