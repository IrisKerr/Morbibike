import { Action } from '../action/Action'
import { SuperModalType } from '../../../modules/super-modal/SuperModalTypes'

export const AddCard = () => {
  return (
    <>
      <Action type="create" entity={SuperModalType.velo} />
    </>
  )
}

export type AddCardType = { AddCard: typeof AddCard }
