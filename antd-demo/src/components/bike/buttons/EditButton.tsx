import React, { useState } from 'react'
import { Button, Modal } from 'antd' // Importez le composant Modal d'Ant Design

import { EditOutlined } from '@ant-design/icons'
import Edit from '../../../forms/bike/Edit'
import { useAppDispatch } from '../../../store/hooks'
import { open } from '../../../store/reducers/superModalSlice'
import Action from '../action/Action'
import { SuperModalType } from '../../../modules/super-modal/SuperModalTypes'

export const EditButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const dispatch = useAppDispatch()

  const handleShowCreateForm = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Action type="update" entity={SuperModalType.velo} />
      <Action type="create" entity={SuperModalType.velo} />
      <Action type="create" entity={SuperModalType.rent} />

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
    </>
  )
}

export type EditButtonType = { EditButton: typeof EditButton }
