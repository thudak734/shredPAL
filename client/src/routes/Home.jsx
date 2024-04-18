import React from 'react'
import Header from '../components/Header'
import AddWorkout from '../components/AddWorkout'
import WorkoutList from '../components/WorkoutList'


const Home = () => {
  return (
    <div>
        <Header />
        <AddWorkout />
        <WorkoutList />
    </div>
  )
}

export default Home
