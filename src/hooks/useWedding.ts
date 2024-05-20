import { getWedding } from '../api/wedding'
import { useEffect, useState } from 'react'
import { Wedding } from '@/models/wedding'

function useWedding() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // wedding 데이터 호출
  useEffect(() => {
    setLoading(true)

    // 데이터 보장 방법 - callback, promise, async/await
    getWedding()
      .then((response) => {
        if (response.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.')
        }

        // console.log('response', response)
        return response.json()
      })
      .then((data) => {
        // console.log('data', data)
        setWedding(data)
        setLoading(false)
      })
      .catch((e) => {
        console.log('에러발생', e)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { wedding, loading, error }
}

export default useWedding
