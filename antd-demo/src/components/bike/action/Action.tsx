import React, { useState } from 'react'
import { Button } from 'antd' // Importez le composant Modal d'Ant Design

import { EditOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../store/hooks'
import { open, setEntity } from '../../../store/reducers/superModalSlice'
import {
  ActionTypes,
  SuperModalType,
} from '../../../modules/super-modal/SuperModalTypes'

interface Props {
  type: ActionTypes
  entity: SuperModalType
}

export const Action = ({ type, entity }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <Button
        type="primary"
        className="ant-btn"
        onClick={() => dispatch(setEntity({ type: type, entity: entity }))}
        icon={<EditOutlined />}
        //   onClick={() => onEditClick(bike)}
      >
        {type} {entity}
      </Button>
    </>
  )
}

export default Action
