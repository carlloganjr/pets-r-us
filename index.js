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
const boarding = require("./boarding.js");
const training = require("./training.js");
const Customers = require("./models/customers");
const Booking = require("./models/booking");
const { default: mongoose } = require("mongoose");

// set the address for the database
const MONGO_CONNECT = "mongodb+srv://web340_admin:2NK75jyQAAuR1ejn@bellevueuniversity.dbdc0d0.mongodb.net/web340DB";
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
app.engine(".html", ejs.__express);
// set the view engine, path for views, and extension
app.set("views", path.resolve(viewsPath));
app.set("view engine", "html");

// tell express to start at the public folder for internal and external requests
// mainly used to ensure internal routing finds and can use the correct files
app.use(express.static(mainPath));

// make it easier to capture the values from the input on the registration page
app.use(express.urlencoded({ extended: true })); 

// set the format for the customer documents
app.use(express.json()); 

// place possible routes into an object for reference
const routes = {
    "/": "index",
    "/index.html": "index",
    "/index": "index",
    "/grooming": "grooming",
    "/grooming.html": "grooming",
    "/register": "register",
    "/register.html": "register",
    "/appointments": "appointments"
};

// iterate over the routes object to find the requested route
// then render the view
for(let [key, value] of Object.entries(routes)) {
    app.get(key, (req, res) => {
        res.render(value);
    });
};

// get the boarding pages when requested
app.get("/boarding", (req, res) => {
    res.render("boarding", {
        boardingInformation: boarding.boardingInfo
    });
});

// get the training pages when requested
app.get("/training", (req, res) => {
    res.render("training", {
        puppy: training.puppy,
        adolescence: training.adolescence,
        adult: training.adult
    });
});

// when the registration posts the request, add it to the database
app.post("/register", (req, res) => {
    const customers = new Customers({
        customerId: req.body.customerId,
        email: req.body.email
    });

    // check for errors loading to the database
    // then redirect to the home page
    Customers.create(customers, (err, customers) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

// get the booking view and create the options list from a json file
app.get("/booking", (req, res) => {
    let jsonFile = fs.readFileSync('./public/data/services.json');
    let services = JSON.parse(jsonFile);

    res.render("booking", {
        options: services
    })
});

// post the data from the form to the database
app.post("/booking", (req, res) => {
    const booking = new Booking({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        service: req.body.services
    });

    // check for errors loading to the database
    // then redirect to the home page
    Booking.create(booking, (err, appt) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

// get the customers page when requested
// request information from the database
// render the database information to the table
app.get("/customers", (req, res) => {
    Customers.find({}, (err, list) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("customers", {
                customerList: list
            });
        }
    });
});

// API for the appointments page to request data
app.get("/api/appointments/:email", async(req, res, next) => {
    Booking.find({'email': req.params.email}, (err, appointment) => {
        if(err) {
            console.log(err);
            next(err);
        }
        else {
            res.json(appointment);
        }
    });
});

// handle a 404 error request
app.use((req, res) => {
    res.status(404).render("404");
});

// connect to the database
mongoose.connect(MONGO_CONNECT).then(() => {
    console.log("MongoDB successfully connected.");
}).catch((err) => {
    console.log("MongoDB Error: " + err);
});

// listen for a connection on the specified port
app.listen(PORT, () => {
    console.log("Listening: Port " + PORT);
});

