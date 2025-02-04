import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/models/Workout";
import { NextResponse } from "next/server";

export async function PUT(req: Request, {params}:{params: {id: string}}) {
  await connectDB()
  const { title, sets, reps} = await req.json()

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      params.id,
      {title, sets, reps},
      {new: true}
    )
    if (!updatedWorkout) {
      return NextResponse.json({success: false, error: "운동 기록을 찾을 수 없습니다."})
    }
    return NextResponse.json({success: true, workout: updatedWorkout})
  } catch (error) {
    return NextResponse.json({success: false, error: '운동 기록 수정 실패'})
  }
}

export async function Delete(req: Request, {params}:{params:{id: string}}) {
  await connectDB()

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(params.id)

    if(!deletedWorkout) {
      return NextResponse.json({success: false, error: '운동 기록을 찾을수 없습니다.'})
    }
    return NextResponse.json({success: true, message: '운동 기록 삭제 완료'})
  } catch (error) {
    return NextResponse.json({success: false, error: '운동 기록 삭제 실패'})
  }
}