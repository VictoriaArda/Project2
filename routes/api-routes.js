// Requiring our models and passport as we've configured it
var db = require('../models');
var passport = require('../config/passport');

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function(req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, '/api/login');
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // ==================================================================
  // Favorites api routes
  // Route to get favorites from members client side based on user_id
  app.get('/api/favorites/:id', function(req, res) {

    db.Favorite.findAll({
      where: {
        UserId: req.params.id
      },
      include: [db.User]
    }).then(function(dbFavorites) {
      res.json(dbFavorites);
      //.status(200);

    });
  });
  // Route for posting favorites from members client side to db
  app.post('/api/favorites', function(req, res) {
    db.Favorite.create(req.body).then(function(dbFavorites) {
      res.json(dbFavorites);
    });
  });
  // ==================================================================
  // Route to delete favorite based on user id param and body's favorite id
  app.delete('/api/favorites/:id', function(req, res) {
    // console.log(req.params.id);
    // console.log(req.body);
    db.Favorite.destroy({
      where: {
        UserId: req.params.id,
        id: req.body.id
      }
    }).then(function(dbFavorite) {
      res.json(dbFavorite);
    });
  });

};