import React, { useContext, useState} from 'react';
import Shredpal from "../apis/Shredpal"
import { WorkoutsContext } from '../context/WorkoutsContext';


const AddWorkout = () => {
    const {addWorkouts} = useContext(WorkoutsContext);

    const [username, setUserName] = useState("");
    const [workout, setWorkout] = useState("");
    const [workoutDetails, setWorkoutDetails] = useState("");
    const [workoutDuration, setWorkoutDuration] = useState("Workout Duration");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await Shredpal.post("/", {
                username: username,
                workout: workout,
                workout_details: workoutDetails,
                workout_duration: workoutDuration
            });
            addWorkouts(response.data.data.workouts)
        }catch(err){

        }
    }

    return (
        <div className='mb-4 d-flex justify-content-center'>
            <form action="" className="w-75">
                <div className="row">
                    <div className="col-md-4">
                        <input 
                        value={username} 
                        onChange={(e) => setUserName(e.target.value)} 
                        type="text" 
                        className="form-control mb-3" 
                        placeholder='Username' />
                    </div>
                    <div className="col-md-4">
                        <input 
                        value={workout} 
                        onChange={(e) => setWorkout(e.target.value)} 
                        className="form-control mb-3" 
                        type="text" 
                        placeholder="Workout Type" />
                    </div>
                    <div className="col-md-4">
                        <input 
                        value={workoutDetails} 
                        onChange={(e) => setWorkoutDetails(e.target.value)} 
                        className="form-control mb-3" 
                        type="text" 
                        placeholder="Workout Details" />
                    </div>
                    <div className="col-md-2">
                        <select 
                        value={workoutDuration} 
                        onChange={(e) => setWorkoutDuration(e.target.value)} 
                        className="form-control mb-3"
                        style={{ width: "110%" }}
                        >
                            <option disabled>{workoutDuration}</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button onClick={handleSubmit} className="btn btn-primary btn-block">Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddWorkout;
