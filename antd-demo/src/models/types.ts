import { Dayjs } from 'dayjs'

// types.ts
export interface Velo {
  id: number
  name: string
  model: string
  year: number
  bikeType: string
  color: string | undefined
  rents: Rent[]
}

export interface Rent {
  id: number
  velo: { id: number }
  start_date: Dayjs
  end_date: Dayjs
}
