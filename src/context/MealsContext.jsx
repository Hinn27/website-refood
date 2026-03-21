import { createContext, useContext, useState, useEffect } from 'react';

const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/meals');
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      const data = await response.json();
      setMeals(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching meals:', err);
      setError(err.message);
      // Fallback to static data if API fails in development
      try {
          const { allMeals } = await import('../utils/mealsData');
          setMeals(allMeals);
      } catch (fallbackErr) {
          console.error('Fallback error:', fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const seedDatabase = async (force = false) => {
    try {
      setLoading(true);
      const url = force ? '/api/seed?force=true' : '/api/seed';
      const response = await fetch(url, { method: 'POST' });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to seed database');
      }
      await fetchMeals();
      return data;
    } catch (err) {
      console.error('Error seeding database:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (mealData) => {
    try {
      const response = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealData),
      });
      if (!response.ok) throw new Error('Failed to add meal');
      await fetchMeals();
    } catch (err) {
      console.error('Error adding meal:', err);
      throw err;
    }
  };

  const updateMeal = async (id, mealData) => {
    try {
      const response = await fetch('/api/meals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mealData, id }),
      });
      if (!response.ok) throw new Error('Failed to update meal');
      await fetchMeals();
    } catch (err) {
      console.error('Error updating meal:', err);
      throw err;
    }
  };

  const deleteMeal = async (id) => {
    try {
      const response = await fetch(`/api/meals?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete meal');
      await fetchMeals();
    } catch (err) {
      console.error('Error deleting meal:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <MealsContext.Provider value={{
      meals,
      loading,
      error,
      refreshMeals: fetchMeals,
      seedDatabase,
      addMeal,
      updateMeal,
      deleteMeal
    }}>
      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = () => {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error('useMeals must be used within a MealsProvider');
  }
  return context;
};
