require("dotenv").config();
const express = require("express");
const cors = require("cors")
const db = require("./db");
const morgan = require("morgan");
const app = express();



app.use(cors())
app.use(express.json())

//get all workouts
app.get("/api/v1/workouts", async (req, res) => {

    try {
        const results = await db.query("select * from workouts");
console.log(results)
        res.status(200).json({
            results: results.rows.length,
            data: {
                workouts: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
});

//get a workout and its reviews
app.get("/api/v1/workouts/:id", async (req, res) => {
    try {
        const workout = await db.query("SELECT * FROM workouts WHERE id = $1", [
            req.params.id,
        ]);

        // If no workout is found, return a 404 status code
        if (workout.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Workout not found",
            });
        }

        const reviews = await db.query("SELECT * FROM reviews WHERE workout_id = $1", [
            req.params.id,
        ]);
        
        res.status(200).json({
            status: "success",
            data: {
                workout: workout.rows[0],
                reviews: reviews.rows,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
});

// app.get("/api/v1/workouts/:id", async (req, res) => {
   
//     try {

//         const workout = await db.query("select * from workouts where id = $1", [
//             req.params.id,
//         ]);

//         const reviews = await db.query("select * from reviews where workout_id = $1", [
//             req.params.id,
//         ]);

        
//         res.status(200).json({

//             status: "success",
//             data: {
//                 workouts: workout.rows[0],
//                 reviews: reviews.rows,
//             },

//         });
   
//     } catch (err) {
//         console.log(err)
//     }

// });

app.get("/api/v1/workouts:id/reviews", async (req, res)=>{

})

//create a workout
app.post("/api/v1/workouts", async (req, res) => {

    try {
        const results = await db.query("insert into workouts (username, workout, workout_details, workout_duration) values ($1, $2, $3, $4) returning *", [req.body.username, req.body.workout, req.body.workout_details, req.body.workout_duration]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                workouts: results.rows[0],
            },
        });

    } catch (err) {
        console.log(err)
    }


});

// update workout
app.put("/api/v1/workouts/:id", async (req, res) => {

    try {
        const results = await db.query("update workouts set workout = $1, workout_details = $2, workout_duration = $3 where id = $4 returning *", [req.body.workout, req.body.workout_details, req.body.workout_duration, req.params.id]);

        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                workouts: results.rows[0],
            },

        });
    } catch (err) {
        console.log(err)
    }


});
//delete workout
app.delete("/api/v1/workouts/:id", async (req, res) => {
    try {
        const { id } = req.params; // Retrieve the ID from req.params
        const results = await db.query("DELETE FROM workouts WHERE id = $1", [id]);

        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                workouts: results.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred while deleting the workout." });
    }
});

//delete a review
// app.delete("/api/v1/workouts/:id", async (req, res) => {
//     try {
//         const { id } = req.params; // Retrieve the ID from req.params
//         const results = await db.query("DELETE FROM workouts WHERE id = $1", [id]);

//         console.log(results);

//         res.status(200).json({
//             status: "success",
//             data: {
//                 workouts: results.rows[0],
//             },
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "An error occurred while deleting the workout." });
//     }
// });

//post a review
app.post("/api/v1/workouts/:id/addReview", async (req, res) => {

    try{
            const newReview = await db.query("INSERT INTO reviews (workout_id, name, review) values ($1, $2, $3) returning *;", [req.params.id, req.body.name, req.body.review])
            res.status(201).json({
                status: 'success',
                data: {
                    review: newReview.rows[0]
                }
            })
            

    } catch(err){
        console.log(err)
    }

})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
})