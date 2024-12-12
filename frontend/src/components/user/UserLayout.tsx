import { FC } from "react";
import { Avatar, Dropdown, MenuProps } from "antd";
import { DashboardOutlined, DollarOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ApolloError, useMutation } from '@apollo/client';
import { LOGOUT } from "../../graphql/mutations.ts";
import { WildTransferLogo } from "../visitor/VisitorLayout.tsx";
import styled from "@emotion/styled";

const UserLayout: FC = () => {
  const navigate = useNavigate();

  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      navigate('/');
    },
    onError: (err: ApolloError) => {
      console.error(err);
    }
  });

  const handleLogout = (): void => {
    logout();
  };

  const items: MenuProps['items'] = [
    {
      label: <Link to='/dashboard'>Dashboard</Link>,
      key: '0',
      icon: <DashboardOutlined />
    },
    {
      label: <Link to='/dashboard/billing'>Billing</Link>,
      key: '1',
      icon: <DollarOutlined />
    },
    {
      label: <Link to='/dashboard/settings'>Settings</Link>,
      key: '3',
      icon: <SettingOutlined />
    },
    {
      label: 'Log Out',
      key: '4',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    },
  ];

  return (
    <UserLayoutContainer>
      <UserHeaderContainer>
        <WildTransferLogo onClick={() => navigate('/dashboard')}>WildTransfer</WildTransferLogo>
        <Dropdown trigger="click" menu={{ items }} placement="bottomRight">
          <Avatar style={{
            backgroundColor: '#fde3cf',
            color: '#f56a00',
            cursor: 'pointer'
          }}>U</Avatar>
        </Dropdown>
      </UserHeaderContainer>
      <Outlet />
    </UserLayoutContainer>
  );
};

const UserHeaderContainer = styled.div`
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  margin: 30px 0;
`;

const UserLayoutContainer = styled.div`
  height: auto;
  width: 100%;
`;

export default UserLayout;
