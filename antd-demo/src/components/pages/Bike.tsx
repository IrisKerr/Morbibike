import { useEffect } from 'react'
import BikeDetailContainer from '../../containers/BikeDetailContainer'
import NavigateButtons from '../bike/buttons/NavigateButtons'

export const Bike = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [])

  return (
    <>
      <BikeDetailContainer />
      <NavigateButtons />
    </>
  )
}

export default Bike
