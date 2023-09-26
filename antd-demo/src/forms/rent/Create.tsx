// RentalForm.tsx
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DatePicker, Button } from 'antd'
import { addRentalAction } from '../../store/actions/rentalActions'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Rent } from '../../models/types'
import { isOverlapping } from '../../utils/rentalUtils'
import { selectBikeById } from '../../store/reducers/bikeSlice'
import { message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

interface Props {
  handleCancel: () => void
}

const datePickerStyle: React.CSSProperties = {
  marginRight: '0.5rem',
}

export const Rental = ({ handleCancel }: Props) => {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ])

  // hook custom useDispatch
  const dispatch = useAppDispatch()

  const { id } = useParams<{ id?: string }>()
  console.log('id du vélo via url', id)
  const selectedId = id ? Number(id) : undefined

  const bike = useAppSelector(selectBikeById(Number(selectedId)))
  console.log('infos vélo', bike)

  // import du state qui contient les données de location
  const rentals = useAppSelector((state) => state.rentals.rentals)
  console.log('rentals', rentals)

  // définir la locale française
  dayjs.locale('fr')

  const handleAddRental = () => {
    if (bike) {
      if (dateRange[0] && dateRange[1] && typeof bike.id === 'number') {
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

        console.log('bikeId', typeof bike.id)

        // création de l'objet de location pour stocker dans le store
        const rentalData: Rent = {
          id: Date.now(),
          bikeId: bike.id,
          start_date: formattedStartDate.toDate(),
          end_date: formattedEndDate.toDate(),
        }

        console.log('dates location', rentalData)

        if (!isOverlapping(rentalData, rentals)) {
          // ajout des données de location dans le store sous Rent
          dispatch(addRentalAction(rentalData))
          console.log('ajout effectué')
          setDateRange([null, null])
          handleCancel()
        } else {
          // pas d'ajout des données de location et message erreur
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
      <Button type="primary" onClick={handleAddRental}>
        Ajouter la location
      </Button>
    </>
  )
}

export default Rental
