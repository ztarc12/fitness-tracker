import * as tf from '@tensorflow/tfjs'

declare global {
  var __MODEL__: tf.Sequential | null
}

if (globalThis.__MODEL__ === undefined) {
  globalThis.__MODEL__ = null
}

let model: tf.Sequential | null = null

export async function loadModel(){
  if (globalThis.__MODEL__) {
    model = globalThis.__MODEL__
    return
  }
  try {
    model = tf.sequential()
    model.add(tf.layers.dense({ units: 1, inputShape: [3]}))
    model.compile({loss:'meanSquaredError', optimizer: 'sgd'})
    globalThis.__MODEL__ = model
  }
  catch (error) {
    console.error("모델 로드 실패:", error);
  }
}

export async function predictRecommend(inputData: number[]): Promise<number> {
  if(!model) {
    await loadModel()
  }
  try {
    const inputTensor = tf.tensor2d([inputData])
    const outputTensor = model!.predict(inputTensor) as tf.Tensor
    const outputData = outputTensor.dataSync()

    return outputData[0]
  } catch (error) {
    console.error('예측 실패', error)
    throw error
  }
}