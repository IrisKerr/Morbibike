import React, { useState } from 'react'
import { Button } from 'antd' // Importez le composant Modal d'Ant Design

import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useAppDispatch } from '../../../store/hooks'
import { open, setEntity } from '../../../store/reducers/superModalSlice'
import {
  ActionTypes,
  SuperModalType,
  getTitle,
} from '../../../modules/super-modal/SuperModalTypes'

// objet pour mapper les types d'action aux icônes
const iconMap: Record<ActionTypes, React.ReactNode> = {
  create: <PlusOutlined />,
  update: <EditOutlined />,
  delete: <DeleteOutlined />,
  view: <></>,
}

interface Props {
  type: ActionTypes
  entity: SuperModalType
}

export const Action = ({ type, entity }: Props) => {
  const dispatch = useAppDispatch()
  const buttonText = getTitle(type, entity)
  // recup de l'icone à partir de l'objet IconMap
  const icon = iconMap[type]

  return (
    <>
      <Button
        type="primary"
        className="ant-btn"
        onClick={() => dispatch(setEntity({ type: type, entity: entity }))}
        icon={icon}
      >
        {/* {type} {entity} */}
        {buttonText}
      </Button>
    </>
  )
}

export default Action
