import React, { useState , useContext} from 'react';
import { WorkoutHistory, HomeContent, LogoutContent } from './DashboardContents';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { CgGym } from 'react-icons/cg';
import { Button, Layout, Menu, ConfigProvider, Calendar } from 'antd';
import { AuthContext } from '../context/AuthContext';
import {toast} from 'sonner';
const { Header, Sider, Content } = Layout;

const SideMenu = ({ onSelectMenuItem }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleMenuClick = (key) => {
    if (key === '6') {
      toast.success('Logout Successful')
      setTimeout(() => {
        logout();
      }, 1000);
    } else {
      onSelectMenuItem(key);
    }
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: '#000300' }}>
      <div className="demo-logo-vertical" style={{ padding: '16px', color: '#00df98' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ color: '#00df98', background: '#000300', border: 'none' }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onSelect={({ key }) => handleMenuClick(key)}
        style={{ background: '#000300' }}
        items={[
          {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Home',
          },
          {
            key: '2',
            icon: <UserOutlined />,
            label: 'Profile',
          },
          {
            key: '3',
            icon: <LiaUserFriendsSolid />,
            label: 'Friends',
          },
          {
            key: '4',
            icon: <CgGym />,
            label: 'Workout History',
          },
          {
            key: '5',
            icon: <SettingOutlined />,
            label: 'Settings',
          },
          {
            key: '6',
            icon: <LogoutOutlined />,
            label: 'Logout'
            ,
          },
        ]}
      />
    </Sider>
  );
};

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const { logout } = useContext(AuthContext);
  const renderContent = () => {
    switch (selectedMenuItem) {
      case '1':
        return <div className="text-white"><HomeContent /></div>;
      case '2':
        return <div className="text-white">Profile Content</div>;
      case '3':
        return <div className="text-white">Friends Content</div>;
      case '4':
        return <div className="text-white"> <WorkoutHistory /> </div>;
      case '5':
        return <div className="text-white">Settings Content</div>;
      
      default:
        return <div className="text-white"><HomeContent /></div>;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Calendar: {
            fullBg: '#ffffff',
            
          },
        },
        token: {
          colorBorderSecondary: '#00df98',
          borderRadiusLG: '2px',
          colorPrimary: '#00df98',
          colorSecondary: '#00df98',
        }
      }}
    >
      <Layout>
        <SideMenu onSelectMenuItem={setSelectedMenuItem} />
        <Layout className="bg-[#000300]">
          <Header style={{ padding: 0, background: '#000300' }}>
            <div className="flex justify-between items-center h-20 mx-auto px-4 max-w-[1240px] text-white">
              <h1 className="text-3xl font-bold text-[#00df98] m-4">Hello Harsh!</h1>
              <h1 className="text-3xl font-bold text-[#00df98] m-4">POTENTIA.</h1>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: '#000300',
              borderRadius: '2px',
            }}
            className="h-screen w-screen"
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;
