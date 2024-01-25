import React, { useState, useEffect } from 'react'
import { selectRentalById } from '../../store/reducers/rentalSlice'
import { DatePicker, Button, message } from 'antd'
import {
  updateRentalAction,
  updateRentalListAction,
} from '../../store/actions/rentalActions'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Rent } from '../../models/types'
import { isOverlapping } from '../../utils/rentalUtils'
import dayjs, { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

interface Props {
  handleCancel: () => void
}

const datePickerStyle: React.CSSProperties = {
  marginRight: '0.5rem',
}

const titleStyle: React.CSSProperties = {
  color: '#3d5757',
}

export const Edit = ({ handleCancel }: Props) => {
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

  const bikes = useAppSelector((state) => state.bikes.bikes)

  // définir la locale française
  dayjs.locale('fr')

  // useEffect pour afficher les dates de location dans le rangepicker àq chaque location sélectionnée
  useEffect(() => {
    if (selectedRental) {
      const startDate = dayjs(selectedRental.start_date)
      const endDate = dayjs(selectedRental.end_date)
      // stockage dans le rangepicker des dates de location
      setDateRange([startDate, endDate])
    }
  }, [selectedRental])

  // fonction pour éditer/modifier la location sélectionnée
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

        // Vérif si la date de fin est antérieure à la date de début
        if (formattedEndDate.isBefore(formattedStartDate)) {
          message.error(
            'Les dates ne sont pas valides. La date de fin doit être ultérieure à la date de début.'
          )
          return
        }

        // création de l'objet de location stocké dans le store
        const rentalData: Rent = {
          id: selectedRental.id,
          bikeId: selectedRental.bikeId,
          start_date: formattedStartDate.toDate(),
          end_date: formattedEndDate.toDate(),
        }
        console.log('dates location editRental', rentalData)

        // Identifie si les dates ont été modifiées
        const datesModified =
          dayjs(rentalData.start_date).isSame(selectedRental.start_date) &&
          dayjs(rentalData.end_date).isSame(selectedRental.end_date)

        console.log('Statut Modification des dates', datesModified)

        if (datesModified) {
          // si les dates n'ont pas été modifiées, alors ajout des dates dans le rangePicker et fermeture modale
          console.log('dates non modifiées')
          setDateRange([formattedStartDate, formattedEndDate])
          handleCancel()
        } else {
          // si dates modifiées, elles s'afficheront dans le rangepicker
          const startDate = dayjs(selectedRental.start_date)
          const endDate = dayjs(selectedRental.end_date)
          setDateRange([startDate, endDate])

          // outrepasser le chevauchement de date si l'id de location est le même
          if (selectedRental.id === rentalData.id) {
            dispatch(updateRentalAction(rentalData))
            setDateRange([null, null])
            handleCancel()
            return
          }

          // Identifie si une location préexistante a les mêmes dates
          const existingRentalIndex = rentalsList.findIndex(
            (rental) =>
              rental.bikeId === selectedRental.bikeId &&
              dayjs(rental.start_date).isSame(formattedStartDate) &&
              dayjs(rental.end_date).isSame(formattedEndDate)
          )

          if (existingRentalIndex !== -1) {
            // Supprime la location préexistante de l'état global
            const updatedRentals = [...rentalsList]
            updatedRentals.splice(existingRentalIndex, 1)

            // Utilise directement dispatch pour mettre à jour la liste de locations
            dispatch(updateRentalListAction(updatedRentals))
          }

          if (isOverlapping(rentalData, rentalsList)) {
            console.log('données de location modifiées', rentalData)
            // ajout des données de location dans le store sous Rent
            dispatch(updateRentalAction(rentalData))
            // Afficher un message de succès
            message.success('La location a été modifiée avec succès!')
            console.log('modification de date effectuée')

            setDateRange([formattedStartDate, formattedEndDate])
            handleCancel()
          } else {
            // message erreur si chevauchement de dates
            console.log('Les dates de location se chevauchent.')
            message.error('Oups.. Le vélo est déjà loué sur ces dates...')
            setDateRange(initialDateRange)
          }
        }
      }
    }

    console.log('location selectionne', selectedRental?.bikeId)
  }

  return (
    <>
      <h3 style={titleStyle}>
        {selectedRental
          ? bikes.find((bike) => bike.id === selectedRental.bikeId)?.name || ''
          : ''}
      </h3>
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
