"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useEffect, useState } from "react";
import { useWorkoutStore } from "../../lib/useWorkoutStore";
import WorkoutModal from "../../components/WorkoutModal";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const workouts = useWorkoutStore((state) => state.workouts);
  const setWorkouts = useWorkoutStore((state) => state.setWorkouts);

  useEffect(()=>{
    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts")
      const data= await res.json()
      if(data.success) {
        setWorkouts(data.workouts)
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
        //등록된 데이터 클릭 시 모달 출력 X
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
    </div>
  );
}
