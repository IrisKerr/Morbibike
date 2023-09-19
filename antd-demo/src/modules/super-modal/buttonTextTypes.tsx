// a voir si suppression du fichier, bcp de redites

export enum buttonTextType {
  velo = 'velo',
  rent = 'rent',
}

export type ActionTypes = 'create' | 'update' | 'delete'

const buttonTexts = {
  [buttonTextType.velo]: {
    ['create' as ActionTypes]: 'Ajouter un vélo',
    ['update' as ActionTypes]: 'Modifier le vélo',
    ['delete' as ActionTypes]: 'Supprimer le vélo',
  },
  [buttonTextType.rent]: {
    ['create' as ActionTypes]: 'Nouvelle location',
    ['update' as ActionTypes]: 'Modifier la location',
  },
}

// ajout fonction pour afficher le nom des boutons en français
export const getButtonText = (
  type: ActionTypes,
  entity: buttonTextType | undefined
) => {
  return entity && buttonTexts[entity][type]
}
