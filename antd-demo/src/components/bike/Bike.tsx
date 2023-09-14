import { FC } from 'react'
import { AddCard, AddCardType } from './cards/AddCard'
import { DetailsCard, DetailsCardType } from './cards/DetailsCard'
import { ListCard, ListCardType } from './cards/ListCard'
import { DeleteButton, DeleteButtonType } from './buttons/DeleteButton'
import { EditButton, EditButtonType } from './buttons/EditButton'

export const Bike: FC &
  AddCardType &
  DetailsCardType &
  ListCardType &
  DeleteButtonType &
  EditButtonType = (): JSX.Element => <></>

Bike.AddCard = AddCard
Bike.DetailsCard = DetailsCard
Bike.ListCard = ListCard
Bike.DeleteButton = DeleteButton
Bike.EditButton = EditButton
