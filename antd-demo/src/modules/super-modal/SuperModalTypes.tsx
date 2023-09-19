export enum SuperModalType {
  velo = 'velo',
  rent = 'rent',
  client = 'client',
}

export type ActionTypes = 'create' | 'update' | 'view' | 'delete'

const titles = {
  [SuperModalType.velo]: {
    ['create' as ActionTypes]: 'Ajouter un vélo',
    ['update' as ActionTypes]: 'Modifier le vélo',
  },
  [SuperModalType.rent]: {
    ['create' as ActionTypes]: 'Nouvelle location',
    ['update' as ActionTypes]: 'Modifier la location',
  },
  [SuperModalType.client]: {
    ['create' as ActionTypes]: 'Create new client',
    ['update' as ActionTypes]: 'Edit client',
  },
}
export const getTitle = (
  type: ActionTypes,
  entity: SuperModalType | undefined
) => {
  return entity && titles[entity][type]
}
