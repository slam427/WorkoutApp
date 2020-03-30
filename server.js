const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


//local instanbce of MongoDB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


//connect directly to the HerokuDB - username and pw should be in process.env
mongoose.connect(process.env.MONGODB_URI || "mongodb://dbuser:MYPASS@ds035593.mlab.com:35593/heroku_5t3dhqnx", { useNewUrlParser: true });



// Enter Routes Here
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/api/workouts", (req, res) => {
db.Workout.find({}, (err, data) => {
    if(err)
        throw err;
    res.json(data);
});
});

app.post("/api/workouts", (req, res) => {
db.Workout.create(req.body, (err, data) => {
    if(err)
        throw err;
    res.json(data);
});
});


app.put("/api/workouts/:id", (req, res) => {
db.Workout.findByIdAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)}, {$set: {exercises: req.body}}, (err, data) => {
    if(err)
        throw err;
    res.json(data);
});
});

app.get("/api/workouts/range", (req, res) => {
db.Workout.find({}, (err, data) => {
    if(err)
        throw err;
    res.json(data);
});
});


app.listen(PORT, () => {
console.log(`App running on port ${PORT}!`);
});