module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define("User", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zipcode: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    User.associate = function(models) {
        //associate Author with Games
        //When author is deleted, also delete their games
        User.hasMany(models.Game, {
            onDelete: "cascade"
        });
    };

    return User;
};
