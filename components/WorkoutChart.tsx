// "use client";

// import { useWorkoutStore } from "@/lib/useWorkoutStore";
// import {
//   BarElement,
//   CategoryScale,
//   Chart as ChartJS,
//   Legend,
//   LinearScale,
//   Title,
//   Tooltip,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function WorkoutChart() {
//   const workouts = useWorkoutStore((state) => state.workouts);

//   const now = new Date()
//   const year = now.getFullYear()
//   const month = now.getMonth()
//   const totalDays = new Date(year, month + 1, 0).getDate()
//   const charhHeight = totalDays * 20

//   const exeriseCount = workouts.reduce(
//     (acc: { [key: string]: number }, workout: any) => {
//       acc[workout.title] = (acc[workout.title] || 0) + 1;
//       return acc;
//     },
//     {}
//   );

//   const labels = Object.keys(exeriseCount);
//   const dataValues = Object.values(exeriseCount);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "운동 실행 횟수",
//         data: dataValues,
//         backgroungColor: "rgba(9, 230, 230, 0.5)",
//       },
//     ],
//   };

//   const options = {
//     // indexAxis: 'y' as const,
//     responsive: true,
//     maintainAssoectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 1,
//           callback: (value: number) => Math.round(value).toString(),
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "운동별 기록 횟수",
//       },
//     },
//   };
//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">운동 데이터 분석</h2>
//       <div style={{height: `${charhHeight}px`}}>
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// }
