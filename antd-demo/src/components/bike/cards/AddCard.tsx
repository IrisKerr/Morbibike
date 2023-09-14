import { useState } from 'react'
import { Button, Modal } from 'antd' // Importez le composant Modal d'Ant Design
import CreateBikeForm from '../../../forms/BikeCreateForm'

export const AddCard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleShowCreateForm = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Button type="primary" className="ant-btn" onClick={handleShowCreateForm}>
        + Ajouter un vélo
      </Button>
      <Modal
        title="Ajout d'un Vélo"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateBikeForm handleCancel={handleCancel} />
      </Modal>
    </div>
  )
}

export type AddCardType = { AddCard: typeof AddCard }
