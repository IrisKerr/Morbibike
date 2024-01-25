import React, { useState, useEffect } from 'react'
import { Layout, Space } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import SuperModal from '../modules/super-modal/SuperModal'
import Action from '../components/bike/action/Action'
import { SuperModalType } from '../modules/super-modal/SuperModalTypes'
import { useDarkMode } from '../contexts/DarkModeContext' // import du hook pour le darkMode
import { Switch } from 'antd'
import { RiSunFill, RiMoonFill } from 'react-icons/ri'

const { Header, Footer, Content } = Layout

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#ffffff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  fontWeight: 800,
  backgroundColor: '#1a2323',
  fontSize: '1.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 100,
}

const headerContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
}

const switchStyle: React.CSSProperties = {
  margin: '0 0.6rem',
}

const companyTitleStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '1.8rem',
  fontWeight: 'bold',
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '86vh',
  lineHeight: '120px',
  color: 'white',
  backgroundColor: '#1a2323',
}

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '0.8rem',
  backgroundColor: '#030f0e',
  color: 'white',
}

export const MainLayout = () => {
  // état local pour gérer responsive au niveau mobile (test)
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 576)

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
          <Link to={'/'}>
            <span style={companyTitleStyle}>Morbibike</span>
          </Link>
          <div style={headerContainerStyle}>
            {!isSmallScreen && (
              <Action type="create" entity={SuperModalType.velo} />
            )}
          </div>
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>
          © 2023 Morbibike • Tous droits réservés
        </Footer>
        <SuperModal />
      </Layout>
    </Space>
  )
}

export default MainLayout
