/* 
================================================================
    Title: index.js
    Author: Carl Logan
    Date: 9/2/2022
    Description: Contains the routing for pets-r-us html files.
================================================================
*/

// require modules for use in the app
const express = require("express");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const morgan = require("morgan");

// set the port on the Node global environment variable
const PORT = process.env.PORT || 3000;
// set the path for reference in the express static middleware
const mainPath = path.join(__dirname, "public");
// set the path for referencing the views
const viewsPath = path.join(__dirname, "views");

// set the express application
const app = express();

// middleware logger
app.use(morgan("tiny"));

// point ejs to .html extensions instead of .ejs
app.engine(".html", ejs.renderFile);
// set the view engine, path for views, and extension
app.set("views", path.resolve(viewsPath));
app.set("view engine", "html");

// tell express to start at the public folder for internal and external requests
// mainly used to ensure internal routing finds and can use the correct files
app.use(express.static(mainPath));

// place possible routes into an object for reference
const routes = {
    "/": "index",
    "/index.html": "index",
    "/index": "index",
    "/grooming": "grooming",
    "/grooming.html": "grooming"
};

// iterate over the routes object to find the requested route
// then render the view
for(let [key, value] of Object.entries(routes)) {
    app.get(key, (req, res) => {
        res.render(value);
    });
};

// handle a 404 error request
app.use((req, res) => {
    res.status(404).render("404");
});

// listen for a connection on the specified port
app.listen(PORT, () => {
    console.log("Listening: Port " + PORT);
});

