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
    }
  });
  return Favorites;
};