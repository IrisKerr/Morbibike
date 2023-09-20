// RentalForm.tsx
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { DatePicker, Button } from 'antd'
import { addRentalAction } from '../../store/actions/rentalActions'
import { updateBikeRents } from '../../store/reducers/bikeSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Rent } from '../../models/types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { isOverlapping } from '../../utils/rentalUtils'
import { selectBikeById } from '../../store/reducers/bikeSlice'
import { message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

interface RentalFormProps {
  handleCancel: () => void
}

const datePickerStyle: React.CSSProperties = {
  marginRight: '0.5rem',
}

const Rental: React.FC<RentalFormProps> = ({ handleCancel }) => {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ])

  // hook custom useDispatch
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { id } = useParams<{ id?: string }>()
  console.log('id du vélo via url', id)
  const selectedId = id ? Number(id) : undefined
  const bikeId = useAppSelector(selectBikeById(Number(selectedId)))
  console.log('id du vélo', bikeId)

  // import du state qui contient les données de location
  const rentals = useAppSelector((state) => state.rentals.rentals)
  console.log('rentals', rentals)

  // définir la locale française
  dayjs.locale('fr')

  const handleAddRental = () => {
    if (bikeId) {
      if (dateRange[0] && dateRange[1] && typeof bikeId.id === 'number') {
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
          velo: { id: bikeId.id },
          start_date: formattedStartDate.toDate(),
          end_date: formattedEndDate.toDate(),
        }

        console.log('dates location', rentalData)

        //Argument of type 'RentalState' is not assignable to parameter of type 'Rent[]'.
        // 'RentalState' is missing the following properties from type 'Rent[]':
        if (!isOverlapping(rentalData, rentals)) {
          // Utilisez directement dispatch pour ajouter la location
          console.log('données location', rentalData)

          // ajout des données de location dans le store sous Rent
          dispatch(addRentalAction(rentalData))
          console.log('ajout effectué')
          // ajout de la location dans le tableau rents de Velo
          dispatch(updateBikeRents({ bikeId: bikeId.id, rent: rentalData }))

          setDateRange([null, null])
          handleCancel()
          navigate('/')
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
      <Button type="primary" onClick={handleAddRental}>
        Ajouter la location
      </Button>
    </>
  )
}

export default Rental
