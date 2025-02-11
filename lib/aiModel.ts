import * as tf from '@tensorflow/tfjs'
import { Exercise, fetchDataApi } from './wgerAPI'
import exerciseMapping from '@/lib/exerciseMapping.json'

declare global {
  var __MODEL__: tf.Sequential | null
  var __WGER_EXERCISES__ : Exercise[] | null
}

if (globalThis.__MODEL__ === undefined) {
  globalThis.__MODEL__ = null
}

if (globalThis.__WGER_EXERCISES__ === undefined) {
  globalThis.__WGER_EXERCISES__ = null
}

let model: tf.Sequential | null = null

export async function loadModel(){
  if (globalThis.__MODEL__) {
    model = globalThis.__MODEL__
    return
  }
  try {
    model = tf.sequential()
    model.add(tf.layers.dense({ units: 16, inputShape: [3], activation: 'relu'}))
    model.add(tf.layers.dense({units: 4, activation: 'linear'}))
    model.compile({loss:'meanSquaredError', optimizer: 'sgd'})
    globalThis.__MODEL__ = model
  }
  catch (error) {
    console.error("모델 로드 실패:", error);
  }
}

export async function loadExerciseMapping(): Promise<Exercise[]>{
  if(globalThis.__WGER_EXERCISES__ && Array.isArray(globalThis.__WGER_EXERCISES__)) {
    return globalThis.__WGER_EXERCISES__
  }
  const exercises = await fetchDataApi()
  console.log('wger API에서 받아온 운동 목록', exercises)
  globalThis.__WGER_EXERCISES__ = exercises
  return exercises
}

export async function predictRecommend(inputData: number[]): Promise<string[]>{
  if(!model) {
    await loadModel()
  }
  try {
    const inputTensor = tf.tensor2d([inputData])
    const outputTensor = model!.predict(inputTensor) as tf.Tensor
    const outputData = outputTensor.dataSync()
    console.log('모델 예측 출력', outputData)

    const rawValue = outputData[0]
    if(typeof rawValue !== "number" || isNaN(rawValue)) {
      console.error("예측 값이 유효하지 않습니다", rawValue)
      return ['추천 운동 없음']
    }
    
    // const predictedIndex = Math.round(outputData[0])
    const predictedIndex = Math.round(rawValue)

    const exercises = await loadExerciseMapping()
    console.log('불러온 운동 목록 length', exercises.length)
    if(exercises.length === 0) {
      return ["추천 운동 없음 exercises 배열이 비어있음"]
    }

    const randomOffset = Math.floor(Math.random() * 5)
    const baseIndex = predictedIndex + randomOffset

    const recommendationCount = 5
    let recommendations: string[] = [];
    for(let i=0; i < recommendationCount; i++) {
      const index = ((baseIndex + i) % exercises.length + exercises.length) % exercises.length
      console.log("계산된 인덱스", index)
      if(!exercises[index] || !exercises[index].name) {
        console.error('해당 인덱스 정보가 없어요', index, exercises)
        recommendations.push('추천 운동 없음')
      } else {
        recommendations.push(exercises[index].name)
      }
    }
    // const recommendExercise = exercises[index].name
    const mapping: Record<string, string> = exerciseMapping as Record<string, string>
    const koreanName = recommendations.map(name => mapping[name] || name);
    // return exercises[index].name
    return koreanName
  } catch (error) {
    console.error('예측 실패', error)
    throw error
  }
}

// 현재는 중량, 세트수, 반복횟수의 평균값으로 운동 추천을 받는 것까지