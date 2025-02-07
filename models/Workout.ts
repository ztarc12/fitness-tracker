import mongoose, {Schema, model, models} from "mongoose";

const WorkoutSchema = new Schema({
  title: {type: String, required: true},
  date: {type: String, required: true},
  weight: {type: Number, required: true},
  sets: {type: Number, required: true},
  reps: {type: Number, required: true},
}, {versionKey: false})

export const Workout = models.Workout || model("Workout", WorkoutSchema)