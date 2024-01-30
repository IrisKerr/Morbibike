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
  style?: object
  text?: string
  rentalId?: number
  color?: string
}

export const Action = ({ type, entity, text, rentalId, color }: Props) => {
  const dispatch = useAppDispatch()
  const buttonText = getTitle(type, entity)
  // recup de l'icone à partir de l'objet IconMap
  const icon = iconMap[type]

  const buttonStyle: React.CSSProperties = color
    ? { backgroundColor: color }
    : {}

  const buttonClassName = color ? 'custom-button' : 'ant-btn'

  return (
    <>
      <Button
        type="primary"
        onClick={() =>
          dispatch(
            setEntity({ type: type, entity: entity, rentalId: rentalId })
          )
        }
        icon={icon}
        // className="ant-btn"
        style={buttonStyle}
        className={buttonClassName}
      >
        {/* {type} {entity} */}
        {text ? text : buttonText}
      </Button>
    </>
  )
}

export default Action
