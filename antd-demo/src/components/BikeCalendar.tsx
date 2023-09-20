// RentCalendar.tsx
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'
import { Tag } from 'antd'

import dayjs from 'dayjs'
import 'dayjs/locale/fr' // Import de la locale française

// import { Rent } from '../models/types'
import { Calendar, ConfigProvider, Typography } from 'antd'
const { Title } = Typography

const calendarStyle: React.CSSProperties = {
  maxWidth: '600px',
}

const BikeCalendar: React.FC = () => {
  const navigate = useNavigate()
  // accès au tableau de locations depuis le state Redux
  const rentals = useSelector((state: RootState) => state.rentals.rentals)
  console.log('locations en cours', rentals)
  const bikes = useSelector((state: RootState) => state.bikes.bikes)
  console.log('vélos loués', bikes)

  console.log(bikes[0].name)

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

  // couleurs des tags
  const colors = [
    'magenta',
    'blue',
    'green',
    'red',
    'orange',
    'purple',
    'cyan',
    'gold',
    'lime',
  ]

  // render la donnée dans la cellule du calendrier
  const dateCellRender = (date: dayjs.Dayjs) => {
    // vérif si la date est bien une date de location conforme
    const rentalDates = rentals.filter(
      (rental) =>
        dayjs(rental.start_date).isBefore(date) &&
        dayjs(rental.end_date).isAfter(date)
    )

    console.log('rentalDates', rentalDates)

    return rentalDates ? (
      <>
        {rentalDates.map((rentalDate, index) => (
          <Tag
            key={rentalDate.velo.id} // Assurez-vous d'utiliser une clé unique pour chaque tag
            className="rental-date"
            color={colors[index % colors.length]}
          >
            {bikes.find((bike) => bike.id === rentalDate.velo.id)?.name}
          </Tag>
        ))}
      </>
    ) : (
      date.format('D')
    )
  }

  dayjs.locale('fr') // configuration de la locale françasie

  return (
    <>
      <ConfigProvider locale={{ locale: dayjs.locale('fr') }}>
        <Calendar
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}
          onSelect={onSelect}
          style={calendarStyle}
        />
      </ConfigProvider>
    </>
  )
}

export default BikeCalendar