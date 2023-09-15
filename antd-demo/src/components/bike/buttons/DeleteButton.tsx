import React, { useState } from 'react'
import { Button, Modal } from 'antd' // Importez le composant Modal d'Ant Design
// import DeleteBikeForm from '../forms/BikeCreateForm'; // Utilisez le composant de formulaire que nous avons créé précédemment
import { DeleteOutlined } from '@ant-design/icons'
import { deleteBike } from '../../../store/reducers/bikeSlice'
import { selectBikeById } from '../../../store/reducers/bikeSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../store/hooks'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const DeleteButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { id } = useParams<{ id?: string }>()
  const bikeId = id ? Number(id) : undefined

  const handleShowCreateForm = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleDelete = () => {
    // Dispatchez l'action de suppression avec l'ID du vélo
    dispatch(deleteBike(bikeId!)) // As the componenent is rendered when bikeId is not undefined we can safely assume it won't be undefined here
    console.log('vélo supprimé')
    setIsModalVisible(false) // Fermez la boîte de dialogue modale après la suppression
    navigate('/')
  }

  return bikeId ? (
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
        <Button onClick={handleDelete}>Supprimer</Button>
      </Modal>
    </div>
  ) : (
    <></>
  )
}

export type DeleteButtonType = { DeleteButton: typeof DeleteButton }
