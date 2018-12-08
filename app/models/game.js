module.exports = function(sequelize, Sequelize) {
    const Game = sequelize.define("Game", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        console: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gsPriceBuy: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        gsPriceSell: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        userSellPrice: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    });

    Game.associate = function(models) {
        //We're saying that a Game should belong to a User
        //A Game can't be created without a User due to the foreign key constraint
        Game.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Game;
};
