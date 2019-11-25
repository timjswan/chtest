// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const MoviesSchema = new Schema(
  {
    movie_id: Number,
    title: String,
    description: String,
    producer: String,
    available_in_3d: Boolean,
    age_rating: String,
    oscar_nominations: Number,
    likes: Number,
    comments: [{
    	user: String,
    	message: String,
    	dateCreated: String,
    	like: Number
    }]
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Movies", MoviesSchema);