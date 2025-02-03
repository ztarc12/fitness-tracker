import { create } from "zustand";

interface Workout {
  id: string;
  title: string;
  date: string;
  sets: number;
  reps: number;
}

interface WorkoutStore {
  workouts: Workout[];
  setWorkouts: (Workouts: Workout[]) => void;
  addWorkout: (workout: Workout) => void;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],
  setWorkouts: (workouts) => set({workouts}),
  addWorkout: (workout) => set((state) => ({ workouts: [...state.workouts, workout]})),
}))