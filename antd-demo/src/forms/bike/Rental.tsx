// RentalForm.tsx
import React, { useState } from 'react'
import { DatePicker, Button } from 'antd'
import { addRentalAction } from '../../store/actions/rentalActions'
import { Rent } from '../../models/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { isOverlapping } from '../../utils/rentalUtils'
import dayjs, { Dayjs } from 'dayjs'

interface RentalFormProps {
  bikeId?: number
}

const Rental: React.FC<RentalFormProps> = ({ bikeId }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)
  // import du state qui contient les données de location
  const rentals = useSelector((state: RootState) => state.rentals)
  console.log('rentals', rentals)

  const handleAddRental = () => {
    if (startDate && endDate && typeof bikeId === 'number') {
      //   // vérifier si les dates de location souhaitées ne se chevauchent pas
      //   const isOverlapping = rentals.some((rental) => {
      //     return (
      //       dayjs(startDate).isBefore(rental.end_date) &&
      //       dayjs(endDate).isAfter(rental.start_date)
      //     )
      //   })

      //   if (isOverlapping) {
      //     // Les dates de location se chevauchent, vous pouvez gérer cela ici
      //     console.error('Les dates de location se chevauchent.')
      //     return
      //   }

      const rentalData: Rent = {
        id: Date.now(),
        velo: { id: bikeId },
        start_date: startDate,
        end_date: endDate,
      }

      //Argument of type 'RentalState' is not assignable to parameter of type 'Rent[]'.
      // 'RentalState' is missing the following properties from type 'Rent[]':
      if (!isOverlapping(rentalData, rentals)) {
        // Utilisez directement dispatch pour ajouter la location
        addRentalAction(rentalData)

        setStartDate(null)
        setEndDate(null)
      } else {
        console.error('Les dates de location se chevauchent.')
      }
    }
  }

  return (
    <div>
      <DatePicker
        value={startDate}
        onChange={(date) => setStartDate(date)}
        placeholder="Date de début"
      />
      <DatePicker
        value={endDate}
        onChange={(date) => setEndDate(date)}
        placeholder="Date de fin"
      />
      <Button type="primary" onClick={handleAddRental}>
        Ajouter la location
      </Button>
    </div>
  )
}

export default Rental
