import React, { PropsWithChildren } from 'react'
import { Typography, Button } from 'antd'
import { Bike } from '../components/bike/Bike'
import { useAppSelector } from '../store/hooks'
import BikeAddContainer from './BikeAddContainer'
import { Rent } from '../components/rent/Rent'
import Image from '../../src/assets/morbibike.png'
import { Anchor } from 'antd'
import { Velo } from '../models/types'

const { Title, Paragraph } = Typography

const titleStyle: React.CSSProperties = {
  margin: '5rem auto 0.1rem',
  padding: '1rem',
  color: '#ffffff',
}

const paragraphStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  lineHeight: '2',
  maxWidth: '700px',
  margin: '1rem auto',
  padding: '1rem',
  color: '#ffffff',
}

interface Props {
  bikes: Velo[]
}

export const BikeListContainer = ({ bikes }: Props) => {
  return (
    <>
      <Title level={2} style={titleStyle} id="velos-disponibles">
        Nos vélos disponibles à la location
      </Title>
      <Paragraph style={paragraphStyle}>
        Le fondateur de Morbibike, Jacques Pedalo, est un homme passionné.{' '}
        <br /> Il n&apos;y a qu&apos;une chose qui puisse rivaliser avec son
        amour pour la Bretagne : ses vélos. Il les chérit tellement qu&apos;il
        les a baptisés en l&apos;honneur de sa chère région natale, la Bretagne.
        Découvrez-les !
      </Paragraph>
      <Bike.ListCard bikes={bikes} />
    </>
  )
}

export default BikeListContainer
