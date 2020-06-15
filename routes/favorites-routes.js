/* eslint-disable quotes */
/* eslint-disable indent */
// Requiring our Todo model
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    // Registers new user into DataBase
    app.post("/api/favorites", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/favorites");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
};