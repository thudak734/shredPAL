import React, { useEffect, useContext } from 'react';
import Shredpal from "../apis/Shredpal";
import { WorkoutsContext } from '../context/WorkoutsContext';
import { useNavigate } from "react-router-dom";

const WorkoutList = (props) => {
  const { workouts, setWorkouts } = useContext(WorkoutsContext);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Shredpal.get("/");
        console.log("Fetched workouts:", response.data.data.workouts); // Log fetched workouts
        setWorkouts(response.data.data.workouts || []); // Guard against undefined workouts
      } catch (err) {
        console.error("Error fetching workouts:", err);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await Shredpal.delete(`/${id}`);
      setWorkouts(workouts.filter(workout => workout.id !== id));
    } catch (err) {
      console.error("Error deleting workout:", err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/workouts/${id}/update`);
  };

  const handleWorkoutSelect = (id) => {

    navigate(`/workouts/${id}`);
  };

  return (
    <div className="list-group">
      <table className='table table-hover table-dark'>
        <thead>
          <tr className='bg-primary'>
            <th scope="col">User</th>
            <th scope="col">Workout</th>
            <th scope="col">Duration</th>
            <th scope="col">Details</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {workouts && workouts.length > 0 ? (
            workouts.map((workout) => (
              <tr onClick={() => handleWorkoutSelect(workout.id)} key={workout.id}>
                <td>{workout.username}</td>
                <td>{workout.workout}</td>
                <td>{workout.workout_duration}</td>
                <td>{workout.workout_details}</td>
                <td>
                  <button onClick={(e) => handleUpdate(e, workout.id)} className="btn btn-warning">Update</button>
                </td>
                <td>
                  <button onClick={(e) => handleDelete(e, workout.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No workouts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutList;
