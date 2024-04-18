import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WorkoutsContext } from '../context/WorkoutsContext';
import Shredpal from '../apis/Shredpal';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const WorkoutDetailPage = () => {
  const { id } = useParams();
  const { selectedWorkout, setSelectedWorkout } = useContext(WorkoutsContext);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching workout data...");
        const response = await Shredpal.get(`/${id}`);
        console.log("Workout data received:", response);
        setSelectedWorkout(response.data.data);
      } catch (err) {
        console.error("Error fetching workout data:", err);
      }
    };

    console.log("Component mounted, fetching data...");
    fetchData();
  }, [id]);

  console.log("Selected workout:", selectedWorkout);

  return ( 
  <div>
        {selectedWorkout ? (
      <>
        <h1 className='text-center display-1'>{selectedWorkout.workout.name}</h1>
        <div className="mt-3">
          <Reviews reviews={selectedWorkout.reviews} />
        </div>
        <AddReview />
      </>
    ) : (
      <p>Loading...</p>
    )}

    </div>
  );
};

export default WorkoutDetailPage;
