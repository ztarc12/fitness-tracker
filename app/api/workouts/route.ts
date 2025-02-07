import { connectDB } from "@/lib/mongodb"
import { Workout } from "@/models/Workout"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
  await connectDB();
  const {title, date, weight, sets, reps} = await req.json()

  try {
    const newWorkout = new Workout({title, date, weight, sets, reps})
    await newWorkout.save()
    return NextResponse.json({success: true, workout: newWorkout})
  } catch (error) {
    return NextResponse.json({success: false, error: '운동 기록 저장 실패'})
  }
}

export async function GET() {
  // await connectDB;
  // const workouts = await Workout.find().sort({date: -1})
  // return NextResponse.json({success: true, workouts})
  try {
    await connectDB();
    const workouts = await Workout.find().sort({date: -1})
    return NextResponse.json({success: true, workouts})
  } catch (error) {
    console.error("❌ 운동 데이터 가져오기 실패:", error)
    return NextResponse.json({success: false, workouts: []})
  }
}