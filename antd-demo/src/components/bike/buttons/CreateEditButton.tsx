import React, { useState } from 'react'
import { Button, Modal } from 'antd' // Importez le composant Modal d'Ant Design

import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import Edit from '../../../forms/bike/Edit'
import { useAppDispatch } from '../../../store/hooks'
import { open } from '../../../store/reducers/superModalSlice'
import Action from '../action/Action'
import {
  SuperModalType,
  ActionTypes,
} from '../../../modules/super-modal/SuperModalTypes'

export const EditButton = () => {
  // const icon = actionType === 'create' ? <PlusOutlined /> : <EditOutlined />;

  return (
    <>
      <Action type="update" entity={SuperModalType.velo} />
      <Action type="create" entity={SuperModalType.velo} />
      <Action type="delete" entity={SuperModalType.velo} />
      <Action type="create" entity={SuperModalType.rent} />
      <Action type="update" entity={SuperModalType.rent} />
    </>
  )
}

export type EditButtonType = { EditButton: typeof EditButton }
