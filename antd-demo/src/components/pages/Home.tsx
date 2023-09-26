// src/routes/Home.tsx
import React from 'react'
import { RootState } from '../../store/store'
import { useAppSelector } from '../../store/hooks'
import BikeAddContainer from '../../containers/BikeAddContainer'
import { Rent } from '../rent/Rent'
import BikeListContainer from '../../containers/BikeListContainer'
import LandingSection from '../../containers/LandingSection'

export const Home = () => {
  const bikes = useAppSelector((state: RootState) => state.bikes.bikes)
  console.log('vélos du store', bikes)

  const containerStyle: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '1.5',
    display: 'flex',
    flexDirection: 'column',
    margin: '4rem auto',
    padding: '1rem',
  }

  return (
    <div style={containerStyle}>
      <LandingSection />

      <section id="velos-disponibles">
        <BikeListContainer bikes={bikes} />
      </section>

      <BikeAddContainer />
      <section id="calendrier-locations">
        <Rent.OverviewCalendar />
      </section>
    </div>
  )
}

export default Home
