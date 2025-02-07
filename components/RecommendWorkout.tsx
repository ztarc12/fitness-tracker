"use client"

import { calculateWorkout, filterWorkouts } from "@/lib/calculateWorkout"
import { useWorkoutStore } from "@/lib/useWorkoutStore"
import { useState } from "react"

export default function RecommendWorkout() {
  const workouts = useWorkoutStore((state) => state.workouts)
  const [recommend, setRecommend] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const recentWorkouts = filterWorkouts(workouts)
  const averages = calculateWorkout(recentWorkouts)


  const handleRecommend = async () => {
    setLoading(true)
    const userData = [averages.avgWeight, averages.avgSets, averages.avgReps]
    console.log('api 호출 전 userData', userData)
    const res = await fetch('/api/predictRecommend', {
      method: "POST",
      body : JSON.stringify({userData}),
      headers: {"Content-Type" : "application/json"}
    })
    const data = await res.json()
    console.log('api 응답', data)
    if(data.success) {
      setRecommend(data.recommend)
    } else {
      alert('추천 생성에 실패 했습니다.')
    }
    setLoading(false)
  }
  return(
    <div>
      <button onClick={handleRecommend} disabled={loading}>
        {loading ? "추천 운동 생성 중..." : "운동 추천 받기"}
      </button>
      {recommend !== null && (
        <div>
          <p>추천 점수 : {recommend}</p>
        </div>
      )}
    </div>
  )
}