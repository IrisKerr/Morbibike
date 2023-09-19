import { Rent } from '../models/types'

export const isOverlapping = (newRental: Rent, existingRentals: Rent[]) => {
  return existingRentals.some((existingRental) => {
    // ne vérifie pas le chevauchement si la location concerne un autre vélo
    if (existingRental.velo.id !== newRental.velo.id) {
      return false
    }
    const startA = existingRental.start_date
    const endA = existingRental.end_date
    const startB = newRental.start_date
    const endB = newRental.end_date

    return startA <= endB && endA >= startB
  })
}
