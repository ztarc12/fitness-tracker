export interface Exercise {
  id: number
  name: string
  description: string
  category: number
}

export async function fetchDataApi(): Promise<Exercise[]> {
  try {
    const response = await fetch('https://wger.de/api/v2/exercise/?language=2&status=2')
    const data = await response.json() as { results: Exercise[] }
    console.log('API 데이터',data)
    if (data.results && Array.isArray(data.results)) {
      console.log("Wger API 운동목록 (results)", data.results)
      return data.results
    } else {
      console.error("data.result가 배열이 아닙니다.", data)
      return []
    }
    // console.log('API 데이터',data)
    // return data.results
  } catch (error) {
    console.error("Wger API 호출 실패", error)
    return []
  }
}