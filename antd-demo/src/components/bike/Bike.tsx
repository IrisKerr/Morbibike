import { FC } from 'react'
import { AddCard, AddCardType } from './cards/AddCard'
import { DetailsCard, DetailsCardType } from './cards/DetailsCard'
import { ListCard, ListCardType } from './cards/ListCard'
import { DeleteButton, DeleteButtonType } from './buttons/DeleteButton'
import { EditButton, EditButtonType } from './buttons/CreateEditButton'
import { ItemCalendar, ItemCalendarType } from './calendar/ItemCalendar'

export const Bike: FC &
  AddCardType &
  DetailsCardType &
  ListCardType &
  ItemCalendarType &
  DeleteButtonType &
  EditButtonType = (): JSX.Element => <></>

Bike.AddCard = AddCard
Bike.DetailsCard = DetailsCard
Bike.ListCard = ListCard
Bike.ItemCalendar = ItemCalendar
Bike.DeleteButton = DeleteButton
Bike.EditButton = EditButton
