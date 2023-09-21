import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { DatePicker, Button } from 'antd'

import {
  updateRentalAction,
  updateRentalListAction,
} from '../../store/actions/rentalActions'
import { updateBikeRents } from '../../store/reducers/bikeSlice'
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
  // state local pour stocker l'id du velo
  const [bikeId, setBikeId] = useState<number | undefined>(undefined)
  // set date range
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ])

  const rentalId = useAppSelector((state) => state.rentals.selectedId)
  console.log('id location', rentalId)
  const rentalsList = useSelector((state: RootState) => state.rentals.rentals)
  console.log('locations en cours', rentalsList)

  const selectedRental = rentalsList.find((rental) => rentalId === rental.id)

  console.log('Location correspondante :', selectedRental)

  if (selectedRental) {
    const bikeId = selectedRental.velo.id
    console.log('ID du vélo correspondant à la location :', bikeId)
    setBikeId(bikeId)
  }

  console.log('id location', rentalId)

  // définir la locale française
  dayjs.locale('fr')

  useEffect(() => {
    // Lorsque le composant est monté, recherchez les dates de location pour le vélo sélectionné
    const selectedBikeRents = rentalsList.filter((rental) => {
      if (bikeId && typeof bikeId === 'number') {
        return rental.velo.id === bikeId
      }
      return false
    })

    if (selectedBikeRents.length > 0) {
      // Si des locations sont trouvées, prenez la première location (vous pouvez ajuster cette logique selon vos besoins)
      const firstRent = selectedBikeRents[0]
      const startDate = dayjs(firstRent.start_date)
      const endDate = dayjs(firstRent.end_date)

      // Mettez à jour la valeur initiale du dateRange avec les dates de location
      setDateRange([startDate, endDate])
    }
  }, [bikeId, rentalsList])

  const editRental = () => {
    if (bikeId) {
      if (dateRange[0] && dateRange[1] && typeof bikeId === 'number') {
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
          velo: { id: bikeId },
          start_date: formattedStartDate.toDate(),
          end_date: formattedEndDate.toDate(),
        }
        console.log('dates location', rentalData)

        // Identifid si location préexistante avec mêmes dates
        const existingRentalIndex = rentalsList.findIndex(
          (rental) =>
            rental.velo.id === bikeId &&
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

        //Argument of type 'RentalState' is not assignable to parameter of type 'Rent[]'.
        // 'RentalState' is missing the following properties from type 'Rent[]':
        if (!isOverlapping(rentalData, rentalsList)) {
          // Utilisez directement dispatch pour ajouter la location
          console.log('données location', rentalData)

          // ajout des données de location dans le store sous Rent
          dispatch(updateRentalAction(rentalData))
          console.log('ajout effectué')
          // ajout de la location dans le tableau rents de Velo
          dispatch(updateBikeRents({ bikeId: bikeId, rent: rentalData }))

          setDateRange([null, null])
          handleCancel()
        } else {
          console.log('Les dates de location se chevauchent.')
          message.error('Oups.. Le vélo est déjà loué sur ces dates...')
          setDateRange([null, null])
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
