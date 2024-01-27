import { useEffect } from 'react'
import BikeDetailContainer from '../../containers/BikeDetailContainer'

export const Bike = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [])

  return (
    <>
      <BikeDetailContainer />
    </>
  )
}

export default Bike
