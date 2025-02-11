import { loadModel, predictRecommend } from "@/lib/aiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await loadModel()

    const { userData } = await req.json()
    const recommendExerciseName = await predictRecommend(userData)

    return NextResponse.json({
      success: true,
      recommendation: recommendExerciseName
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: '추천 생성 실패'
    })
  }
}