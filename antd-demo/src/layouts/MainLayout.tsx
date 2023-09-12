// MainLayout.tsx
import React, { ReactNode} from 'react';
import { Layout } from 'antd';
import Header from "../components/Header"
import Footer from '../components/Header'; 

const { Content } = Layout;

interface MainLayoutProps {
    children: ReactNode; 
  }

const MainLayout: React.FC<MainLayoutProps>  = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
