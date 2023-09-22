// RentCalendar.tsx
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

import dayjs from 'dayjs'
import 'dayjs/locale/fr' // Import de la locale française

// import { Rent } from '../models/types'
import { Calendar, theme, ConfigProvider } from 'antd'

interface BikeCalendarProps {
  bikeId: number | undefined
}

export const ItemCalendar: React.FC<BikeCalendarProps> = ({ bikeId }) => {
  const { token } = theme.useToken()

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  }

  const calendarStyle: React.CSSProperties = {
    minWidth: '320px',
  }

  // accès au tableau de locations depuis le state Redux
  const rentals = useSelector((state: RootState) => state.rentals.rentals)
  console.log('locations en cours', rentals)

  // gère les changements de panneau dans le calendrier
  const onPanelChange = (value: dayjs.Dayjs, mode: 'month' | 'year') => {
    // log dans la console la date sélectionnée et le mode de vue
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  // render la donnée dans la cellule du calendrier
  const dateCellRender = (date: dayjs.Dayjs) => {
    // vérif si la date est bien une date de location conforme
    const rentalDates = rentals.filter(
      (rental) =>
        dayjs(rental.start_date).isBefore(date) &&
        dayjs(rental.end_date).isAfter(date) &&
        rental.bikeId === bikeId
    )

    console.log('rentalDates', rentalDates)
    const isRented = rentalDates.length > 0

    const cellStyle: React.CSSProperties = {
      backgroundColor: isRented ? '#cc3535' : '#bad6ae',
      color: isRented ? 'inherit' : 'white',
      borderRadius: '2rem',

      height: '0.5rem',
      width: '0.5rem',
    }

    return <div style={cellStyle}> &nbsp;</div>
  }

  dayjs.locale('fr') // configuration de la locale françasie

  return (
    <div style={wrapperStyle}>
      <ConfigProvider locale={{ locale: dayjs.locale('fr') }}>
        <Calendar
          fullscreen={false}
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}
          style={calendarStyle}
        />
      </ConfigProvider>
    </div>
  )
}

export type ItemCalendarType = { ItemCalendar: typeof ItemCalendar }
