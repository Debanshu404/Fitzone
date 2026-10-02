import React, { useState, useEffect } from 'react';
import { ExerciseCard, SearchInput } from '../components';
import { fetchData, exerciseOptions } from '../utils/fetchData';

const Exercise = () => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialExercises = async () => {
      setLoading(true);
      try {
        const data = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=30', exerciseOptions);
        if (Array.isArray(data)) {
          setExercises(data);
        }
      } catch (err) {
        console.error('Initial exercises fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialExercises();
  }, []);

  return (
    <div className="bg-[#faf8f5] noise-bg min-h-screen text-neutral-900 pb-24">
      <SearchInput
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      {loading ? (
        <div className="flex justify-center items-center py-24 text-lg font-bold text-ef-blue">
          Loading 1,300+ Exercise Tutorials...
        </div>
      ) : (
        <ExerciseCard
          exercises={exercises}
          bodyPart={bodyPart}
          setExercises={setExercises}
        />
      )}
    </div>
  );
};

export default Exercise;
