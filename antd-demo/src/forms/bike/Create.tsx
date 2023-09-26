import { Form, Input, Button, Select } from 'antd'
import { useAppDispatch } from '../../store/hooks'
import { addBike } from '../../store/reducers/bikeSlice'

const { Option } = Select

interface FormValues {
  name: string
  model: string
  year: number
  bikeType: string
  color: string
  image: string
}

interface Props {
  handleCancel: () => void
}

export const Create = ({ handleCancel }: Props) => {
  const dispatch = useAppDispatch()
  const [form] = Form.useForm()

  const onFinish = (values: FormValues) => {
    console.log('Valeurs du formulaire :', values)
    // Gestion de la soumission du formulaire en stockant les données dans Redux
    const addNewBikeWithId = { ...values, id: Date.now(), rents: [] } // Utilisation de la timestamp comme ID pour simplifier
    try {
      dispatch(addBike(addNewBikeWithId))
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

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          Ajouter le vélo
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Create
