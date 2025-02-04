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
  updateWorkout: (updatedWorkout: Workout) => void
  deleteWorkout: (id : string) => void
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workouts: [],
  setWorkouts: (workouts) => set({workouts}),
  addWorkout: (workout) => set((state) => ({ workouts: [...state.workouts, workout]})),
  updateWorkout: (updatedWorkout) => set((state) => ({workouts: state.workouts.map((workout) => workout.id === updatedWorkout.id ? updatedWorkout : workout)})),
  deleteWorkout: (id) => set((state) => ({workouts: state.workouts.filter((workout) => workout.id !== id)})),
}))