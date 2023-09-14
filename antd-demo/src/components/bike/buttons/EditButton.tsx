import React, { useState } from 'react'
import { Button, Modal } from 'antd' // Importez le composant Modal d'Ant Design

import { EditOutlined } from '@ant-design/icons'
import Edit from '../../../forms/bike/Edit'

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
        <Edit handleCancel={handleCancel} />
      </Modal>
    </div>
  )
}

export type EditButtonType = { EditButton: typeof EditButton }
