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

const switchStyle: React.CSSProperties = {
  margin: '0 0.6rem',
}

const companyTitleStyle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '1.4rem',
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
  backgroundColor: '#f2f0e5dc',
}

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: '0.8rem',
  backgroundColor: '#f2f0e5',
  color: '#212424b5',
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
