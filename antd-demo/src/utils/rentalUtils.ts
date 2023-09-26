import { Rent } from '../models/types'

// util pour vérifier le chevauchement des dates pour la location
export const isOverlapping = (newRental: Rent, existingRentals: Rent[]) => {
  return existingRentals.some((existingRental) => {
    // ne vérifie pas le chevauchement si la location concerne un autre vélo
    if (existingRental.bikeId !== newRental.bikeId) {
      return false
    }
    const startA = existingRental.start_date
    const endA = existingRental.end_date
    const startB = newRental.start_date
    const endB = newRental.end_date

    return startA <= endB && endA >= startB
  })
}
