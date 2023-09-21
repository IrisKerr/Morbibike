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
  rents: Rent[]
}

export interface Rent {
  id: number
  velo: { id: number }
  start_date: Date | Dayjs
  end_date: Date | Dayjs
}
