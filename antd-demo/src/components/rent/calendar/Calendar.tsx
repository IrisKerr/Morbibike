// RentCalendar.tsx
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import Action from '../../bike/action/Action'
import { useAppDispatch } from '../../../store/hooks'
import { setSelectedId } from '../../../store/reducers/rentalSlice'
import { SuperModalType } from '../../../modules/super-modal/SuperModalTypes'

import dayjs from 'dayjs'
import 'dayjs/locale/fr' // Import de la locale française
import { Calendar, ConfigProvider, Typography } from 'antd'

const { Title } = Typography

const titleStyle: React.CSSProperties = {
  margin: '5rem auto 1rem',
  padding: '1rem',
  color: '#ffffff',
}

const calendarStyle: React.CSSProperties = {
  maxWidth: '1000px',
  margin: 'auto',
  marginBottom: '4rem',
}

export const OverviewCalendar = () => {
  const dispatch = useAppDispatch()

  // accès au tableau de locations depuis le state Redux
  const rentals = useSelector((state: RootState) => state.rentals.rentals)
  console.log('locations en cours', rentals)
  const bikes = useSelector((state: RootState) => state.bikes.bikes)
  console.log('vélos loués', bikes)

  /// Au clic sur une date, vérifie s'il y a une réservation de vélo
  const onSelect = (date: dayjs.Dayjs) => {
    console.log('locations', rentals)
    const rentalForDate = rentals.find(
      (rental) =>
        dayjs(rental.start_date).isBefore(date) &&
        dayjs(rental.end_date).isAfter(date)
    )

    console.log('rentalforDate', rentalForDate)

    if (rentalForDate) {
      // je stocke l'ID de la location dans le store
      dispatch(setSelectedId(rentalForDate.id))
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
    // vérif si la date est bien une date de location conforme
    const rentalDates = rentals.filter(
      (rental) =>
        dayjs(rental.start_date).isBefore(date) &&
        dayjs(rental.end_date).isAfter(date)
    )

    // console.log('rentalDates', rentalDates)

    return rentalDates ? (
      <>
        {rentalDates.map((rentalDate) => (
          <div
            key={rentalDate.id}
            style={{
              backgroundColor: 'white',
              marginBottom: '0.2rem',
            }}
          >
            <Action
              type="update"
              entity={SuperModalType.rent}
              text={bikes.find((bike) => bike.id === rentalDate.bikeId)?.name}
              rentalId={rentalDate.id}
            />
          </div>
        ))}
      </>
    ) : (
      date.format('D')
    )
  }

  dayjs.locale('fr') // configuration de la locale françasie

  return (
    <>
      <Title level={2} style={titleStyle} id="calendrier-locations">
        Locations en cours
      </Title>
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

export type OverviewCalendarType = { OverviewCalendar: typeof OverviewCalendar }
