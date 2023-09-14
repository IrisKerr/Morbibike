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
  velo: Velo
  start_date: Date
  end_date: Date
}
