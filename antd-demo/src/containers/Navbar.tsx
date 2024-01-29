import { useNavigate } from 'react-router-dom'
import Action from '../components/bike/action/Action'
import { Layout } from 'antd'
import { useEffect, useState } from 'react'
import { SuperModalType } from '../modules/super-modal/SuperModalTypes'
import { Button, Drawer, Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Header } = Layout

export const Navbar = () => {
  const navigate = useNavigate()
  const [shouldCloseDrawer, setShouldCloseDrawer] = useState(false)

  useEffect(() => {
    if (shouldCloseDrawer) {
      onClose()
      setShouldCloseDrawer(false)
    }
  }, [shouldCloseDrawer])

  const toHomePage = () => {
    navigate('/')
  }

  const toBikesList = () => {
    setShouldCloseDrawer(true)
    navigate('/#velos-disponibles')
    console.log('cc')
  }

  const toRentCalendar = () => {
    setShouldCloseDrawer(true)
    navigate({ pathname: '/', hash: 'calendrier-locations' })
  }

  const toAddBike = () => {
    navigate('/#ajouter-velo')
    onClose()
  }

  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <Header className="navbar navbar-desktop">
        <a href="/" onClick={toHomePage} className="navbar-desktop-logo">
          Morbibike
        </a>
        <div className="navbar-desktop-list">
          <a
            href="#velos-disponibles"
            onClick={toBikesList}
            className="navbar-desktop-list-item"
          >
            Vélos
          </a>
          <a
            href="#calendrier-locations"
            onClick={toRentCalendar}
            className="navbar-desktop-list-item"
          >
            Locations
          </a>
          <Action type="create" entity={SuperModalType.velo} />
        </div>
      </Header>

      <Header className="navbar navbar-mobile">
        <a href="/" onClick={toHomePage} className="navbar-desktop-logo">
          Morbibike
        </a>
        <Button
          type="primary"
          onClick={showDrawer}
          className="navbar-mobile-burger"
        >
          <MenuOutlined className="navbar-mobile-burger-icon" />
        </Button>
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <a
                href="#velos-disponibles"
                onClick={toBikesList}
                className="navbar-desktop-list-item"
              >
                Vélos
              </a>
            </Menu.Item>
            <Menu.Item key="2">
              <a
                href="#calendrier-locations"
                onClick={toRentCalendar}
                className="navbar-desktop-list-item"
              >
                Locations
              </a>
            </Menu.Item>
            <Menu.Item key="3" onClick={toAddBike}>
              <a
                href="#ajouter-velo"
                onClick={toAddBike}
                className="navbar-desktop-list-item"
              >
                Ajouter un vélo
              </a>
            </Menu.Item>
          </Menu>
        </Drawer>
      </Header>
    </>
  )
}

export default Navbar
