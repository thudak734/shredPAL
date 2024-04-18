import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import { WorkoutsContextProvider } from './context/WorkoutsContext';
import WorkoutDetailPage from './routes/WorkoutDetailPage';

const App = () => {
  return (
    <WorkoutsContextProvider>
        <div className='container'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts/:id/update" element={<UpdatePage />} />
          <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
        </Routes>
      </Router>
    </div>
    </WorkoutsContextProvider>
  );
};

export default App;
