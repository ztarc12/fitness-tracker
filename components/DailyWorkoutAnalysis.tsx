// "use client"

// import { useWorkoutStore } from "@/lib/useWorkoutStore"
// import DailyWorkoutChart from "./DailyWorkoutChart"
// export default function DailyWorkoutAnalysis({date}: {date:string}) {
//   const workouts = useWorkoutStore((state) => state.workouts)

//   const dailyWorkouts = workouts.filter((w) => w.date === date)

//   const grouped = dailyWorkouts.reduce((acc: Record<string, any[]>, workout) => {
//     const title = workout.title
//     if(!acc[title]) {
//       acc[title] = []
//     }
//     acc[title].push(workout)
//     return acc
//   }, {})
//   return (
//     <div>
//       {Object.keys(grouped).length === 0 ? (
//         <p>선택한 날짜에 운동 기록이 없습니다.</p>
//       ) : (
//         Object.keys(grouped).map((exerciseTitle) => {
//           const records = grouped[exerciseTitle]
//           const latestRecord = records[records.length - 1]
//           return (
//             <DailyWorkoutChart
//               key={exerciseTitle}
//               exerciseTitle={exerciseTitle}
//               weight={latestRecord.weight}
//               sets={latestRecord.sets}
//               reps={latestRecord.reps}
//             />
//           )
//         })
//       )}
//     </div>
//   )
// }