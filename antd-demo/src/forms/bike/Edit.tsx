import { useEffect } from 'react'
import { Form, Input, Button, Select, message } from 'antd'
import { useAppDispatch } from '../../store/hooks'
import { editBike } from '../../store/reducers/bikeSlice'
import { selectBikeById } from '../../store/reducers/bikeSlice'
import { useAppSelector } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import { Rent, Velo } from '../../models/types'

const { Option } = Select

interface FormValues {
  name: string
  model: string
  year: number
  bikeType: string
  color: string
  image: string
  rents: Rent[]
}

interface Props {
  handleCancel: () => void
}

export const Edit = ({ handleCancel }: Props) => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()
  const { id } = useParams<{ id?: string }>()
  // const bikeId = id ? Number(id) : undefined
  const selectedBike = useAppSelector(selectBikeById(Number(id)))
  console.log(selectedBike)

  useEffect(() => {
    // Met à jour les champs du formulaire avec les nouvelles valeurs du state
    form.setFieldsValue(selectedBike)
  }, [selectedBike, form])

  const onFinish = (values: FormValues) => {
    console.log('Valeurs du formulaire :', values)

    const updatedBikeData: Velo = {
      // Utilise les valeurs du formulaire pour mettre à jour le vélo
      id: selectedBike!.id,
      ...values, // Utilise les valeurs du formulaire pour mettre à jour les autres champs du vélo
    }

    console.log('update bike', updatedBikeData)
    try {
      dispatch(editBike(updatedBikeData))
      // Afficher un message de succès
      message.success('Le vélo a été modifié avec succès!')
      // réinitialisation du formulaire
      form.resetFields()
      // fermeture de la modale
      handleCancel()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form
      form={form} // Important de linker la ref et le composant via la props form (voir doc antdesign)
      name="createBikeForm"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item name="rents" hidden>
        <Input />
      </Form.Item>

      <Form.Item
        label="Nom"
        name="name"
        rules={[
          {
            required: true,
            message: 'Veuillez saisir le nom du vélo!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Modèle"
        name="model"
        rules={[
          {
            required: true,
            message: 'Veuillez saisir le modèle du vélo!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Année"
        name="year"
        rules={[
          {
            required: true,
            message: "Veuillez saisir l'année du vélo!",
          },
        ]}
      >
        <Input
          type="number"
          min="1990"
          max="2023"
          step="1"
          defaultValue={2023}
        />
      </Form.Item>

      <Form.Item
        label="Type de vélo"
        name="bikeType"
        rules={[
          {
            required: true,
            message: 'Veuillez sélectionner le type de vélo!',
          },
        ]}
      >
        <Select>
          <Option value="VTT">VTT</Option>
          <Option value="Vélo de route">Vélo de route</Option>
          <Option value="Vélo de ville">Vélo de ville</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Couleur"
        name="color"
        rules={[
          {
            required: true,
            message: 'Veuillez saisir la couleur du vélo!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[
          {
            required: true,
            message: `Veuillez saisir le lien de l'image du vélo!`,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="rents" hidden>
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          Modifier le vélo
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Edit
