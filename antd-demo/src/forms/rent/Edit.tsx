import React, { useState, useEffect, useRef } from 'react'
import { selectRentalById } from '../../store/reducers/rentalSlice'
import { DatePicker, Button } from 'antd'

import {
  updateRentalAction,
  updateRentalListAction,
} from '../../store/actions/rentalActions'
// import { updateBikeRents } from '../../store/reducers/bikeSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Rent } from '../../models/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { isOverlapping } from '../../utils/rentalUtils'
import { message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

interface RentalFormProps {
  handleCancel: () => void
}

const datePickerStyle: React.CSSProperties = {
  marginRight: '0.5rem',
}

const Edit: React.FC<RentalFormProps> = ({ handleCancel }) => {
  const dispatch = useAppDispatch()

  // etat local des dates pour le datepicker
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ])

  //  dates initiales de location
  const [initialDateRange, setInitialDateRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([null, null])

  const rentalId = useAppSelector((state) => state.rentals.selectedId)
  console.log('id location', rentalId)

  const selectedRental = useAppSelector(selectRentalById(Number(rentalId)))
  console.log('location sélectionnée', selectedRental)

  const rentalsList = useAppSelector((state) => state.rentals.rentals)
  console.log('liste des locations', rentalsList)

  // définir la locale française
  dayjs.locale('fr')

  useEffect(() => {
    if (selectedRental) {
      const startDate = dayjs(selectedRental.start_date)
      const endDate = dayjs(selectedRental.end_date)
      // stockage dans le rangepicker des dates de location
      setDateRange([startDate, endDate])
    }
  }, [selectedRental])

  const editRental = () => {
    if (selectedRental) {
      if (
        dateRange[0] &&
        dateRange[1] &&
        typeof selectedRental.bikeId === 'number'
      ) {
        const formattedStartDate: Dayjs = dateRange[0]!
        const formattedEndDate: Dayjs = dateRange[1]!

        console.log(formattedStartDate)
        console.log(formattedEndDate)

        // Vérif si la date de début est antérieure à aujourd'hui
        const currentDate: Dayjs = dayjs()
        if (formattedStartDate.isBefore(currentDate, 'day')) {
          message.error(
            "La date de début de location ne peut pas être antérieure à aujourd'hui."
          )
          return
        }

        // Vérifiez si la date de fin est antérieure à la date de début
        if (formattedEndDate.isBefore(formattedStartDate)) {
          message.error(
            'Les dates ne sont pas valides. La date de fin doit être ultérieure à la date de début.'
          )
          return
        }

        const rentalData: Rent = {
          id: Date.now(),
          bikeId: selectedRental.bikeId,
          start_date: formattedStartDate.toDate(),
          end_date: formattedEndDate.toDate(),
        }
        console.log('dates location editRental', rentalData)

        // Identifid si les dates ont été modifiées
        const datesModified =
          dayjs(rentalData.start_date).isSame(selectedRental.start_date) &&
          dayjs(rentalData.end_date).isSame(selectedRental.end_date)

        if (datesModified) {
          console.log('non exécuté')
          setDateRange([null, null])
          handleCancel()
        } else {
          const startDate = dayjs(selectedRental.start_date)
          const endDate = dayjs(selectedRental.end_date)
          setDateRange([startDate, endDate])

          // Identifiez si une location préexistante a les mêmes dates
          const existingRentalIndex = rentalsList.findIndex(
            (rental) =>
              rental.bikeId === selectedRental.bikeId &&
              dayjs(rental.start_date).isSame(formattedStartDate) &&
              dayjs(rental.end_date).isSame(formattedEndDate)
          )

          if (existingRentalIndex !== -1) {
            // Supprimez la location préexistante de l'état global
            const updatedRentals = [...rentalsList]
            updatedRentals.splice(existingRentalIndex, 1)

            // Utilisez directement dispatch pour mettre à jour la liste de locations
            dispatch(updateRentalListAction(updatedRentals))
          }

          if (!isOverlapping(rentalData, rentalsList)) {
            // Utilisez directement dispatch pour ajouter la location
            console.log('données de location modifiées', rentalData)
            // ajout des données de location dans le store sous Rent
            dispatch(updateRentalAction(rentalData))
            console.log('modification de date effectuée')
            // ajout de la location dans le tableau rents de Velo
            // dispatch(updateBikeRents({ bikeId: bikeId, rent: rentalData }))
            setDateRange([null, null])
            handleCancel()
          } else {
            console.log('Les dates de location se chevauchent.')
            message.error('Oups.. Le vélo est déjà loué sur ces dates...')
            // const startDate = dayjs(selectedRental.start_date)
            // const endDate = dayjs(selectedRental.end_date)
            // setDateRange([startDate, endDate])
            setDateRange(initialDateRange)
          }
        }
      }
    }
  }

  return (
    <>
      <RangePicker
        value={dateRange}
        onChange={(dates) => {
          if (Array.isArray(dates) && dates.length === 2) {
            setDateRange(dates)
          }
        }}
        placeholder={['Date de début', 'Date de fin']}
        style={datePickerStyle}
      />
      <Button type="primary" onClick={editRental}>
        Modifier la location
      </Button>
    </>
  )
}

export default Edit
