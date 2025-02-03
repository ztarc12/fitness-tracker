import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!;

if(!MONGODB_URI) {
  throw new Error("⚠️MongoDB URI가 설정되지 않았습니다!")
}

export const connectDB = async () => {
  if(mongoose.connection.readyState >= 1){
    return
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'fitness'
    })
    console.log('✅ MongoDB 연결 성공!')
  } catch (error) {
    console.error("❌ MongoDB 연결 실패:", error)
  }
}