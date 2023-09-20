import { useAppSelector, useAppDispatch } from '../../store/hooks'
import Create from './Create'
import { close } from '../../store/reducers/superModalSlice'

export const RentForm = () => {
  const { isOpen, type, entity } = useAppSelector((state) => state.superModal)

  const dispatch = useAppDispatch()

  // pour gérer la fermeture de la modale
  const handleCancel = () => {
    dispatch(close())
  }

  return (
    <>
      {type === 'create' && <Create handleCancel={handleCancel} />}
      {/* {type === 'update' && <Update handleCancel={() => {}} />} */}
    </>
  )
}