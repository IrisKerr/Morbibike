import { createSlice } from '@reduxjs/toolkit'
import {
  ActionTypes,
  SuperModalType,
} from '../../modules/super-modal/SuperModalTypes'

interface initialStateType {
  isOpen: boolean
  type: ActionTypes
  entity: SuperModalType | undefined
  rentalId?: number | undefined
}
const initialState: initialStateType = {
  isOpen: false,
  type: 'view',
  entity: undefined,
}

const superModalSlice = createSlice({
  name: 'superModal',

  initialState: initialState, // Utilisez initialBikes comme état initial
  reducers: {
    open(state) {
      state.isOpen = true
    },
    close(state) {
      state.isOpen = false
    },
    setEntity(
      state,
      action: {
        payload: {
          type: ActionTypes
          entity: SuperModalType
          rentalId: number | undefined
        }
      }
    ) {
      state.type = action.payload.type
      state.entity = action.payload.entity
      state.rentalId = action.payload.rentalId
      state.isOpen = true
    },
  },
})

export const { open, close, setEntity } = superModalSlice.actions // Exposez les actions pour être utilisées ailleurs

export default superModalSlice.reducer // Exportez le réducteur
