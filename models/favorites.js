// Creating our Favorites model
module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define('Favorite', {
    // The favs title cannot be null
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // The image cannot be null
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // The url cannot be null
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });
  //===================================================
  // Handles foreign key constraint
  Favorites.associate = function(models) {
    // A favorite can't be created without a User due to the foreign key constraint
    Favorites.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  //====================================================
  return Favorites;
};