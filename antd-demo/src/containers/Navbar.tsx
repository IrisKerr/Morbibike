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
  }

  const toRentCalendar = () => {
    setShouldCloseDrawer(true)
    navigate('/#calendrier-locations')
  }

  const toAddBike = () => {
    setShouldCloseDrawer(true)
    navigate('/#ajouter-velo')
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
          closable={true}
          onClose={onClose}
          visible={visible}
          className="navbar-mobile-drawer"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            className="navbar-mobile-menu"
          >
            <Menu.Item key="1">
              <a
                href="#velos-disponibles"
                onClick={toBikesList}
                className="navbar-mobile-item"
              >
                Vélos
              </a>
            </Menu.Item>
            <Menu.Item key="2">
              <a
                href="#calendrier-locations"
                onClick={toRentCalendar}
                className="navbar-mobile-item"
              >
                Locations
              </a>
            </Menu.Item>
            <Menu.Item key="3">
              <a
                href="#ajouter-velo"
                onClick={toAddBike}
                className="navbar-mobile-item"
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
