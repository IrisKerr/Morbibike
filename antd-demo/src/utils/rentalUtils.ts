import { Rent } from '../models/types'

export const isOverlapping = (newRental: Rent, existingRentals: Rent[]) => {
  return existingRentals.some((existingRental) => {
    const startA = existingRental.start_date
    const endA = existingRental.end_date
    const startB = newRental.start_date
    const endB = newRental.end_date

    return startA <= endB && endA >= startB
  })
}
