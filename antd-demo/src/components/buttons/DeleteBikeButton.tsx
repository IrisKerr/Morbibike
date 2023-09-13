import React, { useState } from 'react'
import { Button, Modal } from 'antd' // Importez le composant Modal d'Ant Design
// import DeleteBikeForm from '../forms/BikeCreateForm'; // Utilisez le composant de formulaire que nous avons créé précédemment
import { DeleteOutlined } from '@ant-design/icons'

const DeleteBikeButton = () => {
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
        icon={<DeleteOutlined />}
        //   onClick={() => onEditClick(bike)}
      >
        Supprimer
      </Button>

      <Modal
        title="Etes-vous sûr de vouloir supprimer ce vélo ?"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {/* <DeleteBikeForm handleCancel={handleCancel}/> */}
      </Modal>
    </div>
  )
}

export default DeleteBikeButton
