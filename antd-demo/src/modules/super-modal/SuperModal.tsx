import { Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { close } from '../../store/reducers/superModalSlice'
import { SuperModalType, getTitle } from './SuperModalTypes'
import Edit from '../../forms/bike/Edit'
import Create from '../../forms/bike/Create'
import { BikeForm } from '../../forms/bike/BikeForm'

export const SuperModal = () => {
  const { isOpen, type, entity } = useAppSelector((state) => state.superModal)
  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(close())
  }

  const forms = {
    [SuperModalType.velo]: <BikeForm />,
    [SuperModalType.rent]: <></>,
    [SuperModalType.client]: <>Formulaire des client</>,
  }

  return (
    <Modal
      title={getTitle(type, entity)}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <>{entity && forms[entity]}</>
    </Modal>
  )
}

export default SuperModal
