import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { WorkoutsContext } from '../context/WorkoutsContext';
import Shredpal from '../apis/Shredpal';

const UpdateWorkout = (props) => {
    
    const { id } = useParams();
    let navigate = useNavigate();
    const {workouts} = useContext(WorkoutsContext)
    const [workout, setWorkout] = useState("")
    const [workoutDetails, setWorkoutDetails] = useState("")
    const [workoutDuration, setWorkoutDuration] = useState("")

   

    useEffect(() => {
        const fetchData = async () => {
            const response = await Shredpal.get(`/${id}`)
            console.log("API response:", response); // Log entire response object
            console.log("Response data:", response.data.data); // Log response data            
            setWorkout(response.data.data.workout.workout)
            setWorkoutDetails(response.data.data.workout.workout_details)
            setWorkoutDuration(response.data.data.workout.workout_duration)
        }
        fetchData();
        
    },[]);
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatedWorkout = await Shredpal.put(`/${id}`,
        
        {
            workout,
            workout_details: workoutDetails,
            workout_duration: workoutDuration
        })
        console.log(updatedWorkout)
        navigate("/")
    }

    return (
        <div>
            <h1>{workouts.workout}</h1>
            <form action="">
                <div className="form-group">
                    <label htmlFor="workout">Workout</label>
                    <input
                        value={workout}
                        onChange={(e) => setWorkout(e.target.value)}
                        id="workout"
                        className='form-control'
                        type="text" />
                </div>

                <div className='form-group'>
                    <label htmlFor="workout_details">Workout Details</label>
                    <input 
                        value={workoutDetails}
                        onChange={(e) => setWorkoutDetails(e.target.value)}
                        id="workout_details" 
                        className='form-control' 
                        type="text" />
                </div>

                <div className='form-group'>
                    <label htmlFor="workout_duration">Workout Duration</label>
                    <input 
                        value={workoutDuration}
                        onChange={(e) => setWorkoutDuration(e.target.value)}
                        id="workout_duration" 
                        className='form-control' 
                        type="number" />
                </div>
                <button type='submit' onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateWorkout
