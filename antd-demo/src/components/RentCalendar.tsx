// RentCalendar.tsx
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { RootState } from '../store/store'
// import { Rent } from '../models/types'
import { Calendar } from 'antd'
import { Typography } from 'antd'

const { Title } = Typography

// propriétés css du title
const titleStyle: React.CSSProperties = {
  margin: '5rem 0 1.5rem 0',
  padding: '1rem',
}

const RentCalendar: React.FC = () => {
  const navigate = useNavigate()

  // accès au tableau de locations depuis le state Redux
  const rentals = useSelector((state: RootState) => state.rentals.rentals)
  console.log('locations en cours', rentals)

  // récupère l'id du vélo depuis rentals
  const bikeId = rentals.length > 0 ? rentals[0].velo.id : undefined

  /// Au clic sur une date, vérifie s'il y a une réservation de vélo
  const onSelect = (date: dayjs.Dayjs) => {
    const rentalForDate = rentals.find(
      (rental) =>
        dayjs(rental.start_date).isBefore(date) &&
        dayjs(rental.end_date).isAfter(date)
    )

    if (rentalForDate) {
      // Redirige vers la page de détail du vélo en utilisant l'ID du vélo associé à la réservation
      navigate(`/bike/${rentalForDate.velo.id}`)
    } else {
      console.error('Aucune réservation de vélo pour cette date.')
    }
  }

  // gère les changements de panneau dans le calendrier
  const onPanelChange = (value: dayjs.Dayjs, mode: 'month' | 'year') => {
    // log dans la console la date sélectionnée et le mode de vue
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  // render la donnée dans la cellule du calendrier
  const dateCellRender = (date: dayjs.Dayjs) => {
    // vérif si la date est bien une date de location
    const isRentalDate = rentals.some(
      (rental) =>
        dayjs(rental.start_date).isBefore(date) &&
        dayjs(rental.end_date).isAfter(date)
    )

    return isRentalDate ? (
      <div className="rental-date">{date.date()}</div>
    ) : (
      date.date()
    )
  }

  return (
    <div>
      <Title level={4} style={titleStyle}>
        Locations en cours :
      </Title>
      <Calendar
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
        onSelect={onSelect}
      />
    </div>
  )
}

export default RentCalendar
