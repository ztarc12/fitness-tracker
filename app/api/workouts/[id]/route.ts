import { connectDB } from "@/lib/mongodb";
import { Workout } from "@/models/Workout";
import { NextResponse } from "next/server";

export async function PUT(req: Request, {params}:{params: Promise<{id: string}>}) {
  const { id } = await params
  await connectDB()
  const { title, weight, sets, reps} = await req.json()

  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(
      // params.id,
      id,
      {title, weight, sets, reps},
      {new: true}
    )
    if (!updatedWorkout) {
      return NextResponse.json({success: false, error: "운동 기록을 찾을 수 없습니다."})
    }
    const normalizedWorkout = {
      id: updatedWorkout._id,
      ...updatedWorkout.toObject()
    }
    return NextResponse.json({success: true, workout: normalizedWorkout})
  } catch (error) {
    return NextResponse.json({success: false, error: '운동 기록 수정 실패'})
  }
}

export async function DELETE(req: Request, {params}:{params:Promise<{id: string}>}) {
  const { id } = await params
  await connectDB()

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(id)

    if(!deletedWorkout) {
      return NextResponse.json({success: false, error: '운동 기록을 찾을수 없습니다.'})
    }
    return NextResponse.json({success: true, message: '운동 기록 삭제 완료'})
  } catch (error) {
    return NextResponse.json({success: false, error: '운동 기록 삭제 실패'})
  }
}