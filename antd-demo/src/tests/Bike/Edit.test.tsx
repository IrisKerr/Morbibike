import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Edit from '../../forms/bike/Edit'

// ... Autres importations et configurations de mock ...

describe('Edit Component', () => {
  it('submits the form with the correct values', async () => {
    const handleCancel = jest.fn()
    const dispatch = jest.fn()

    // Mock the useDispatch hook
    jest
      .spyOn(require('../../store/hooks'), 'useAppDispatch')
      .mockReturnValue(dispatch)

    render(<Edit handleCancel={handleCancel} />)

    // Fill in form fields
    fireEvent.change(screen.getByLabelText('Nom'), {
      target: { value: 'NewName' },
    })
    fireEvent.change(screen.getByLabelText('Modèle'), {
      target: { value: 'NewModel' },
    })
    fireEvent.change(screen.getByLabelText('Année'), {
      target: { value: '2023' },
    })
    fireEvent.change(screen.getByLabelText('Type de vélo'), {
      target: { value: 'Vélo de route' },
    })
    fireEvent.change(screen.getByLabelText('Couleur'), {
      target: { value: 'Blue' },
    })
    fireEvent.change(screen.getByLabelText('Image'), {
      target: { value: 'new_image_url' },
    })

    // Submit the form
    fireEvent.click(screen.getByTestId('submit-button'))

    // Wait for the asynchronous update to complete
    await screen.findByText('Modifier le vélo')

    // Assert that dispatch is called with the correct action
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function))
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        id: 1,
        name: 'NewName',
        model: 'NewModel',
        year: 2023,
        bikeType: 'Vélo de route',
        color: 'Blue',
        image: 'new_image_url',
        rents: [],
      },
    })
  })
})
