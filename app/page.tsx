import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">운동 기록 & 분석</h1>
      <p className="mb-4">운동을 기록하고 AI 추천을 받아보세요!</p>
      <Link href={`/dashboard`}>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
          대쉬보드로 이동
        </button>
      </Link>
    </div>
  );
}
