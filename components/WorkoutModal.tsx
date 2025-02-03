import { useState } from "react";
import { useWorkoutStore } from "../lib/useWorkoutStore";

interface WorkoutModalProps {
  date: string;
  onClose: () => void;
}

export default function WorkoutModal({ date, onClose }: WorkoutModalProps) {
  const [title, setTitle] = useState("");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const addWorkout = useWorkoutStore((state) => state.addWorkout);

  const handleSubmit = async () => {
    if (!title) return;
    const newWorkout = {title, date, sets, reps}

    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(newWorkout),
      headers: {"Content-Type" : "application/json"}
    })
    const result = await res.json()
    if(result.success) {
      addWorkout(result.workout)
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-2">운동 기록 추가</h2>
        <p className="text-gray-600">{date}</p>
        <input
          type="text"
          className="w-full border p-2 my-2"
          placeholder="운동 이름 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-between items-center my-2">
          <label className="text-gray-700">세트</label>
          <input
            type="number"
            className="border p-2 w-16"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
            min={1}
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-gray-700">반복 횟수</label>
          <input
            type="number"
            className="border p-2 w-16"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
            min={1}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
