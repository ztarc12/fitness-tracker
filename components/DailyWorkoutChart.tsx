// "use client";

// import {
//   // BarElement,
//   // LinearScale,
//   // scales,
//   Chart as ChartJS,
//   LinearScale,
//   CategoryScale,
//   PointElement,
//   // LineElement,
//   Legend,
//   Title,
//   Tooltip,
//   // plugins,
// } from "chart.js";
// import { Bar, Radar, Scatter } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   // LinearScale,
//   // BarElement,
//   LinearScale,
//   // LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // interface DailyWorkoutChartProps {
// //   exerciseTitle: string;
// //   workouts: Array<{ weight: number; sets: number; reps: number}>;
// // }

// interface DailyWorkoutChartProps {
//   exerciseTitle: string;
//   weight: number;
//   sets: number;
//   // reps: number;
// }

// export default function DailyWorkoutChart({exerciseTitle, weight, sets} : DailyWorkoutChartProps) {
//     // 데이터: x축은 세트 수, y축은 중량
//     const data = {
//       datasets: [
//         {
//           label: exerciseTitle,
//           data: [{ x: sets, y: weight }],
//           backgroundColor: "rgba(255, 99, 132, 0.5)",
//           pointRadius: 6, // 점 크기 조절
//         },
//       ],
//     };
  
//     const options = {
//       responsive: true,
//       maintainAspectRatio: false, // 컨테이너 크기에 맞게 조절
//       scales: {
//         x: {
//           type: "linear",
//           position: "bottom",
//           ticks: {
//             // x축 tick 값에 "세트" 텍스트를 추가
//             callback: (value: any) => value + "세트",
//             stepSize: 1,
//           },
//           title: {
//             display: true,
//             text: "세트 수",
//           },
//         },
//         y: {
//           type: "linear",
//           beginAtZero: true,
//           ticks: {
//             display: false, // y축 tick 텍스트 숨김
//           },
//           grid: {
//             display: false, // 그리드 라인 숨김 (필요 시 유지 가능)
//           },
//           title: {
//             display: true,
//             text: "중량 (kg)",
//           },
//         },
//       },
//       plugins: {
//         legend: {
//           display: false,
//         },
//         title: {
//           display: true,
//           text: exerciseTitle + " 운동 분석",
//         },
//       },
//     };
  
//     return (
//       <div style={{ height: "300px" }}>
//         <Scatter data={data} options={options} />
//       </div>
//     );
// }

// //  const DailyWorkoutChart: FC<DailyWorkoutChartProps> = ({exerciseTitle, workouts}) => {
// //   const latestWorkout = workouts[workouts.length - 1]

// //   const data = {
// //     labels: ['Weight (kg)', 'Sets', 'Reps'],
// //     datasets: [
// //       {
// //         label: exerciseTitle,
// //         data: [latestWorkout.weight, latestWorkout.sets, latestWorkout.reps],
// //         backgroungColor: [
// //           'rgba(255, 99, 132, 0.5)',
// //           'rgba(54, 162, 235, 0.5)',
// //           'rgba(75, 192, 192, 0.5)',
// //         ]
// //       }
// //     ]
// //   }

// //   const options = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     scales: {
// //       x: {
// //         beginAtZero: true,
// //         ticks: {
// //           stepSize: 1,
// //           callback: (tickValue: string | number, index: number, ticks: any[]) => {
// //             return Math.round(Number(tickValue)).toString()
// //           }
// //         }
// //       }
// //     },
// //     plugins: {
// //       legend: {
// //         display: false,
// //       },
// //       title: {
// //         display: true,
// //         text: exerciseTitle
// //       }
// //     }
// //   }
// //   return (
// //     <div style={{ height: '300px', marginBottom: '2rem'}}>
// //       <Bar data={data} options={options}/>
// //     </div>
// //   )
// // }


// // export default DailyWorkoutChart
