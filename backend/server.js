const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Movies = require("./data");
const async = require("async");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://AdminTim:sup3rst4rcu5t@localhost:27017/chtest?authSource=admin";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//To stop problems with CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

/* Perform a basic task on the database. 
  If there is an error or the response code isn't 200 return down otherwise up */
router.get("/healthCheck", (req, res) => {
  Movies.findOne((err, data) => {
    if (err)
      return res.json({ success: false, data: {"status": "DOWN"}});

    return (res.statusCode == 200) 
      ? res.json({success: true, data: {"status": "UP"} }) : res.json({success: false, data: {"status": "DOWN"}}); 
  });
});

/* Get all movies */
router.get("/getMovies", (req, res) => {
  Movies.find((err, data) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, data: data });
  });
});

/* Get a single movie according to it's id.
  If the movie doesn't exist then no data is returned at this stage */
router.get("/getMovie", (req, res) => {
  if (req.query.movie_id) {
    Movies.findOne({'movie_id': req.query.movie_id}, (err, data) => {
      if (err) return res.json({ success: false, error: err });

      return res.json({ success: true, data: data });
    });
  }
});

/* Produce a report using MongoDB data manipulation functions */
router.get("/report", (req, res) => {
    async.parallel({
      movies_available_in_3d: function(callback) {
        Movies.count({available_in_3d: true}, (err, data) => {
          if (err) callback(null, null)
          callback(null, data);
        });
      },
      most_oscar_nominations: function(callback) {
        Movies.aggregate([{"$sort":{oscar_nominations: -1}}], (err, data) => {
          if (err) callback(null, null)
          callback(null, data[0].title);
        });
      }
    }, function(err, data) {
      return res.json({ success: true, data: data });
    });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));