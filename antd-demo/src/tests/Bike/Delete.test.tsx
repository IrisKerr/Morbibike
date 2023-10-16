import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Delete from '../../forms/bike/Delete'

// Mock the required dependencies
jest.mock('react-router-dom', () => ({
  useParams: jest.fn() as jest.Mock,
  useNavigate: jest.fn() as jest.Mock,
}))
jest.mock('../../store/hooks', () => ({
  useAppDispatch: jest.fn() as jest.Mock,
  useAppSelector: jest.fn() as jest.Mock,
}))
jest.mock('../../store/reducers/bikeSlice', () => ({
  deleteBike: jest.fn() as jest.Mock,
}))
jest.mock('antd', () => ({
  Button: jest.fn(({ onClick }) => <button onClick={onClick}></button>),
  message: {
    error: jest.fn() as jest.Mock,
  },
}))

// Example test cases
describe('Delete Component', () => {
  it('renders correctly when bikeId is defined', () => {
    // Mock the useParams hook to return a valid bikeId
    ;(require('react-router-dom').useParams as jest.Mock).mockReturnValue({
      id: '1',
    })

    // Mock the useSelector hook to return an empty rentals array
    ;(require('../../store/hooks').useAppSelector as jest.Mock).mockReturnValue(
      {
        rentals: { rentals: [] },
      }
    )

    const { container } = render(<Delete handleCancel={() => {}} />)

    // Assert that the component renders correctly
    expect(container).toMatchSnapshot()
  })

  it('handles deletion when bike is not rented', () => {
    const handleCancel = jest.fn()
    const dispatch = jest.fn() as jest.Mock
    const navigate = jest.fn() as jest.Mock

    // Mock the useParams hook to return a valid bikeId
    ;(require('react-router-dom').useParams as jest.Mock).mockReturnValue({
      id: '1',
    })

    // Mock the useSelector hook to return an empty rentals array
    ;(require('../../store/hooks').useAppSelector as jest.Mock).mockReturnValue(
      {
        rentals: { rentals: [] },
      }
    )

    // Mock the useDispatch hook to provide a dispatch function
    ;(require('../../store/hooks').useAppDispatch as jest.Mock).mockReturnValue(
      dispatch
    )

    // Render the Delete component
    render(<Delete handleCancel={handleCancel} />)

    // Click the "Supprimer" button
    fireEvent.click(screen.getByText('Supprimer'))

    // Assert that deleteBike action was dispatched
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function))

    // Call the dispatched function to simulate bike deletion
    ;(dispatch as jest.Mock).mock.calls[0][0](navigate)

    // Assert that handleCancel and navigate functions were called
    expect(handleCancel).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('handles deletion when bike is rented', () => {
    const handleCancel = jest.fn()

    // Mock the useParams hook to return a valid bikeId
    ;(require('react-router-dom').useParams as jest.Mock).mockReturnValue({
      id: '1',
    })

    // Mock the useSelector hook to return a rentals array with the rented bike
    ;(require('../../store/hooks').useAppSelector as jest.Mock).mockReturnValue(
      {
        rentals: [{ bikeId: 1 }],
      }
    )

    // Render the Delete component
    render(<Delete handleCancel={handleCancel} />)

    // Click the "Supprimer" button
    fireEvent.click(screen.getByText('Supprimer'))

    // Assert that message.error was called
    expect(require('antd').message.error as jest.Mock).toHaveBeenCalledWith(
      'Le vélo est actuellement loué. Impossible de le supprimer'
    )

    // Assert that handleCancel and navigate functions were not called
    expect(handleCancel).not.toHaveBeenCalled()
  })
})
