export interface WorkoutRecord {
  date : string
  weight: number
  sets: number
  reps: number
}

export const calculateWorkout = (workouts: WorkoutRecord[]) => {
  if(workouts.length === 0) {
    return { avgWeight: 0, avgSets: 0, avgReps: 0}
  }
  const totalWeight = workouts.reduce((sum, workout) => sum + workout.weight, 0)
  const totalSets = workouts.reduce((sum, workout) => sum + workout.sets, 0)
  const totalReps = workouts.reduce((sum,workout) => sum + workout.reps, 0)
  const count = workouts.length
  return {
    avgWeight: totalWeight / count,
    avgSets: totalSets / count,
    avgReps: totalReps / count
  }
}

export const filterWorkouts = (workouts: WorkoutRecord[]) => {
  const fourweeksAgo = new Date()
  fourweeksAgo.setDate(fourweeksAgo.getDate() - 28)
  return workouts.filter((workout) => new Date(workout.date) >= fourweeksAgo)
}