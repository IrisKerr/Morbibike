// RentalForm.tsx
import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import { addRentalAction } from '../store/actions/rentalActions';
import { Rent } from '../models/types';
import dayjs, { Dayjs } from 'dayjs'

interface RentalFormProps {
  bikeId: number;
}

const RentalForm: React.FC<RentalFormProps> = ({ bikeId }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleAddRental = () => {
    if (startDate && endDate) {
      const rentalData: Rent = {
        id: Date.now(),
        velo: { id: bikeId },
        start_date: startDate,
        end_date: endDate,
      };

      // Utilisez directement dispatch pour ajouter la location
      addRentalAction(rentalData);

      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <>
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
    </>
  );
};

export default RentalForm;
