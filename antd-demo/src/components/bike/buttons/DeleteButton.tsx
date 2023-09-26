import Action from '../action/Action'
import { SuperModalType } from '../../../modules/super-modal/SuperModalTypes'

export const DeleteButton = () => {
  return (
    <>
      <Action type="delete" entity={SuperModalType.velo} />
    </>
  )
}

export type DeleteButtonType = { DeleteButton: typeof DeleteButton }
