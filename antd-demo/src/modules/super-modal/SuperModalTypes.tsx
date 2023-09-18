export enum SuperModalType {
  velo = 'velo',
  rent = 'rent',
  client = 'client',
}

export type ActionTypes = 'create' | 'update' | 'view' | 'delete'

const titles = {
  [SuperModalType.velo]: {
    ['create' as ActionTypes]: 'Pealos creator',
    ['update' as ActionTypes]: 'Edit velo',
  },
  [SuperModalType.rent]: {
    ['create' as ActionTypes]: 'Create new rent',
    ['update' as ActionTypes]: 'Edit rent',
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
