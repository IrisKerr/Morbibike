import React, { useState } from 'react'
import { Button, Modal } from 'antd' // Importez le composant Modal d'Ant Design
import EditBikeForm from '../../../forms/BikeCreateForm' // Utilisez le composant de formulaire que nous avons créé précédemment
import { EditOutlined } from '@ant-design/icons'

export const EditButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleShowCreateForm = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      <Button
        type="primary"
        className="ant-btn"
        onClick={handleShowCreateForm}
        icon={<EditOutlined />}
        //   onClick={() => onEditClick(bike)}
      >
        Modifier
      </Button>

      <Modal
        title="Modification d'un Vélo"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <EditBikeForm handleCancel={handleCancel} />
      </Modal>
    </div>
  )
}

export type EditButtonType = { EditButton: typeof EditButton }
