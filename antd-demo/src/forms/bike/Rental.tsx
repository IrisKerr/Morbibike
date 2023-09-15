// RentalForm.tsx
import React, { useState } from 'react'

import { DatePicker, Button } from 'antd'
import { addRentalAction } from '../../store/actions/rentalActions'
import { updateBikeRents } from '../../store/reducers/bikeSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Rent } from '../../models/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { isOverlapping } from '../../utils/rentalUtils'
import { message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

interface RentalFormProps {
  bikeId?: number
}

const datePickerStyle: React.CSSProperties = {
  marginRight: '0.5rem',
}

const Rental: React.FC<RentalFormProps> = ({ bikeId }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  // hook custom useDispatch
  const dispatch = useAppDispatch()
  // import du state qui contient les données de location
  const rentals = useAppSelector((state) => state.rentals.rentals)
  console.log('rentals', rentals)

  // définir la locale française
  dayjs.locale('fr')

  const handleAddRental = () => {
    if (startDate && endDate && typeof bikeId === 'number') {
      // Formatage des dates au format "YYYY-MM-DD"
      const formattedStartDate: Dayjs = dayjs(startDate)
      const formattedEndDate: Dayjs = dayjs(endDate)

      console.log(formattedStartDate)
      console.log(formattedEndDate)

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

      //Argument of type 'RentalState' is not assignable to parameter of type 'Rent[]'.
      // 'RentalState' is missing the following properties from type 'Rent[]':
      if (!isOverlapping(rentalData, rentals)) {
        // Utilisez directement dispatch pour ajouter la location
        console.log(rentalData)

        // ajout des données de location dans le store sous Rent
        dispatch(addRentalAction(rentalData))
        console.log('ajout effectué')
        // ajout de la location dans le tableau rents de Velo
        dispatch(updateBikeRents({ bikeId: bikeId, rent: rentalData }))

        setStartDate(null)
        setEndDate(null)
      } else {
        console.error('Les dates de location se chevauchent.')
      }
    }
  }

  return (
    <>
      <DatePicker
        value={startDate}
        onChange={(date) => setStartDate(date ? dayjs(date) : null)}
        placeholder="Date de début"
        style={datePickerStyle}
      />
      <DatePicker
        value={endDate}
        onChange={(date) => setEndDate(date ? dayjs(date) : null)}
        placeholder="Date de fin"
        style={datePickerStyle}
      />
      <Button type="primary" onClick={handleAddRental}>
        Ajouter la location
      </Button>
    </>
  )
}

export default Rental
