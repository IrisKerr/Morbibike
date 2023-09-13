import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
// EditBike a créer
// import { EditBike } from '../store/reducers/bikeSlice'; 
const { Option } = Select;

interface FormValues {
    name: string;
    model: string;
    year: number;
    bikeType: string;
    color: string;
  }

  interface CreateBikeFormProps {
    handleCancel: () => void;
  }

const Edit: React.FC<CreateBikeFormProps> = ({ handleCancel }) => {
  const dispatch = useDispatch();
  //const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    console.log('Valeurs du formulaire :', values);
   
  };

  return (
  <div>Form à ajouter</div>
  );
};

export default Edit;
