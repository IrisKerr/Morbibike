import React, { useState, useEffect } from 'react'
import { Layout, Space } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import SuperModal from '../modules/super-modal/SuperModal'
import Action from '../components/bike/action/Action'
import { SuperModalType } from '../modules/super-modal/SuperModalTypes'
import { useNavigate } from 'react-router-dom'

const { Header, Footer, Content } = Layout

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  fontWeight: 800,
  backgroundColor: '#314947',
  fontSize: '1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  boxShadow: '2px 4px 8px #969695b7',
}

const headerContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
}

const companyTitleStyle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  fontFamily: 'Poppins',
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '86vh',
  lineHeight: '120px',
  color: 'white',
  backgroundColor: '#f2f0e5dc',
}

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '0.8rem',
  backgroundColor: '#f2f0e5',
  color: '#212424b5',
}

export const MainLayout = () => {
  const navigate = useNavigate()
  // état local pour gérer responsive au niveau mobile (test)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 576)

  const toHomePage = () => {
    navigate('/')
  }

  const toBikesList = () => {
    navigate('/#velos-disponibles')
  }

  const toRentCalendar = () => {
    navigate('/#calendrier-locations')
  }
  // gérer redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  console.log(isSmallScreen)

  return (
    <Space
      direction="vertical"
      style={{ width: '100%', padding: '0' }}
      size={[0, 48]}
    >
      <Layout>
        <Header style={headerStyle}>
          <a href="/" onClick={toHomePage} style={companyTitleStyle}>
            Morbibike
          </a>
          <div style={headerContainerStyle}>
            {!isSmallScreen && (
              <>
                <a
                  href="#velos-disponibles"
                  onClick={toBikesList}
                  className="nav-link"
                >
                  Vélos
                </a>
                <a
                  href="#calendrier-locations"
                  onClick={toRentCalendar}
                  className="nav-link"
                >
                  Locations
                </a>
                <Action type="create" entity={SuperModalType.velo} />
              </>
            )}
          </div>
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>
          © 2024 IrisKerr • Tous droits réservés
        </Footer>
        <SuperModal />
      </Layout>
    </Space>
  )
}

export default MainLayout
