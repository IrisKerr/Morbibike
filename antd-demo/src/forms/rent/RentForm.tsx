import { useAppSelector } from '../../store/hooks'
// import Create from './Create'
// import Update from './Edit'

export const RentForm = () => {
  const { isOpen, type, entity } = useAppSelector((state) => state.superModal)

  return (
    <>
      {/* {type === 'create' && <Create handleCancel={() => {}} />}
      {type === 'update' && <Update handleCancel={() => {}} />} */}
    </>
  )
}
