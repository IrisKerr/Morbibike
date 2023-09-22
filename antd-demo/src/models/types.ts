import dayjs, { Dayjs } from 'dayjs'

// types.ts
export interface Velo {
  id: number
  name: string
  model: string
  year: number
  bikeType: string
  color: string | undefined
  image: string
}

export interface Rent {
  id: number
  bikeId: number
  start_date: Date | Dayjs
  end_date: Date | Dayjs
}
