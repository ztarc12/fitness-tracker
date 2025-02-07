"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useEffect, useState } from "react";
import { useWorkoutStore } from "../../lib/useWorkoutStore";
import WorkoutModal from "../../components/WorkoutModal";
import RecommendWorkout from "@/components/RecommendWorkout";
// import DailyWorkoutAnalysis from "@/components/DailyWorkoutAnalysis";
// import WorkoutChart from "@/components/WorkoutChart";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const workouts = useWorkoutStore((state) => state.workouts);
  const setWorkouts = useWorkoutStore((state) => state.setWorkouts);
  const [selectedAnalysisDate, setSelectedAnalysisDate] = useState<string>('')
  useEffect(()=>{
    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts")
      const data= await res.json()
      if(data.success) {
        const normalizedWorkouts = data.workouts.map((w: any) => ({
          id: w._id,
          ...w,
        }))
        setWorkouts(normalizedWorkouts)
      }
    }
    fetchWorkouts()
  },[setWorkouts])
  // const handleDateClick = (info: { dateStr: string}) => {
  //   alert(`선택한 날짜: ${info.dateStr}`)
  // }
  return (
    <div>
      <h2>운동 기록</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={koLocale}
        editable={true}
        selectable={true}
        dateClick={(info) => {setSelectedDate(info.dateStr); setSelectedWorkout(null);}}
        eventClick={(info) => {
          console.log('클릭된 이벤트', info.event.title)
          const workout = workouts.find((w) => w.id === info.event.id)
          if(workout) {
            setSelectedWorkout(workout)
            setSelectedDate(workout.date)
          }
        }}
        
        events={workouts.map((workout) => ({
          // title: workout.title,
          id: workout.id,
          title: `${workout.title} - ${workout.sets}세트 ${workout.reps}회`,
          start: workout.date,
          allDay: true,
        }))}
      />
      {selectedDate && (
        <WorkoutModal
          date={selectedDate}
          workoutId={selectedWorkout?.id || null}
          existingWorkout={selectedWorkout || null}
          onClose={() => {setSelectedDate(null); setSelectedWorkout(null);}}
        />
      )}
      <div>
        <input
          type="date"
          value={selectedAnalysisDate}
          onChange={(e) => setSelectedAnalysisDate(e.target.value)}
        />
      </div>
      <RecommendWorkout/>
      {/* {selectedAnalysisDate && (
        <DailyWorkoutAnalysis date={selectedAnalysisDate} />
      )} */}
    </div>
  );
}
