import React, {useState, createContext} from "react";

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = props => {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);


    const addWorkouts = (workout) => {
        setWorkouts([...workouts, workout])
    }
    return (
        <WorkoutsContext.Provider 
            value={{ 
                workouts, 
                setWorkouts, 
                addWorkouts, 
                selectedWorkout, 
                setSelectedWorkout,
             }}
        >
            {props.children}
        </WorkoutsContext.Provider>
    )
}