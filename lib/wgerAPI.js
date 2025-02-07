export async function fetchDataApi() {
  try {
    const response = await fetch('https://wger.de/api/v2/exercise/?language=2&status=2')
    const data = response.json()
    console.log('123',data)
    // return data.results
  }
}