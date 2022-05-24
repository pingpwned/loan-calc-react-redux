import { useState, useEffect } from 'react'

export type TApiResponse = {
  amountInterval: {
    min: number
    max: number
    step: number
    defaultValue: number
  }
  termInterval: { min: number; max: number; step: number; defaultValue: number }
}

export const useApi = () => {
  const [intervals, setIntervals] = useState<TApiResponse>()
  const [loading, setLoading] = useState<boolean>(false)

  const url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3002/intervals'
      : 'https://loan-calc-example.herokuapp.com/intervals'

  const getApiData = async () => {
    setLoading(true)
    try {
      const apiRes = await fetch(url)
      const json = await apiRes.json()
      setIntervals(json)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }
  useEffect(() => {
    getApiData()
  }, [])

  return { intervals, loading }
}
