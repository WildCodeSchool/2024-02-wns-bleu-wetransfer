import {FC} from "react";
import {HeaderContainer, WildTransferLogo} from "../visitor/VisitorLayout.tsx";
import styled from "@emotion/styled";
import {Avatar, Dropdown, MenuProps} from "antd";
import {DashboardOutlined, FileDoneOutlined, LogoutOutlined, SettingOutlined} from "@ant-design/icons";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {ApolloError, useMutation} from '@apollo/client'
import {LOGOUT} from "../../graphql/mutations.ts";


const UserLayout: FC = () => {
	const navigate = useNavigate()

	const [logout, {loading, error}] = useMutation(LOGOUT, {
		onCompleted: () => {
			navigate('/')
		},
		onError: (err: ApolloError) => {

			console.error(err)
		}
	})

	const handleLogout = (): void => {
		logout()
	}


	const items: MenuProps['items'] = [
		{
			label: <Link to='/dashboard'>Dashboard</Link>,
			key: '0',
			icon: <DashboardOutlined/>
		},
		{
			label: <Link to='/dashboard/pricing'>Pricing</Link>,
			key: '1',
			icon: <FileDoneOutlined/>
		},
		{
			label: <Link to='/dashboard/settings'>Settings</Link>,
			key: '3',
			icon: <SettingOutlined/>
		},
		{
			label: 'Log Out',
			key: '4',
			icon: <LogoutOutlined/>,
			onClick: handleLogout
		},
	];


	return (
		<UserLayoutContainer>
			<HeaderContainer>
				<WildTransferLogo>WildTransfer</WildTransferLogo>
				<Dropdown trigger="click" menu={{items}} placement="bottomRight">
					<Avatar style={{backgroundColor: '#fde3cf', color: '#f56a00', cursor: 'pointer'}}>U</Avatar>
				</Dropdown>
			</HeaderContainer>
			<Outlet/>
		</UserLayoutContainer>
	)
}


const UserLayoutContainer = styled.div`
    height: auto;
    width: 100%;
`

export default UserLayout