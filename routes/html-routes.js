// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("../public/homepage.html");
    }
    res.sendFile(path.join(__dirname, "../public/landingPage.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/homepage", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  app.get("/saved-games", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/savedGames.handlebars"));
  });
};
