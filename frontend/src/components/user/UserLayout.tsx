import {FC} from "react";
import {HeaderContainer, WildTransferLogo} from "../visitor/VisitorLayout.tsx";
import styled from "@emotion/styled";
import {Avatar, Dropdown, MenuProps} from "antd";
import {DashboardOutlined, DollarOutlined, LogoutOutlined, SettingOutlined} from "@ant-design/icons";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {ApolloError, useMutation} from '@apollo/client';
import {LOGOUT} from "../../graphql/mutations.ts";
import {useUserContext} from "../../context/UserContext.tsx";

const UserLayout: FC = () => {
	const navigate = useNavigate();
	const {setUser} = useUserContext()

	const [logout] = useMutation(LOGOUT, {
		onCompleted: () => {
			setUser({
				isLoggedIn: false,
				role: '',
				firstname: '',
				lastname: '',
				email: '',
			})
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
			icon: <DashboardOutlined/>
		},
		{
			label: <Link to='/dashboard/billing'>Billing</Link>,
			key: '1',
			icon: <DollarOutlined/>
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

	// if (loading) {
	// 	return <p>Loading...</p>;
	// }
	//
	// if (error || !data || !data.getConnectedUser) {
	// 	console.log(error)
	// 	return <p>Error loading user data.</p>;
	// }
	//
	// console.log(data)

	return (
		<UserLayoutContainer>
			<HeaderContainer>
				<WildTransferLogo onClick={() => navigate('/dashboard')}>WildTransfer</WildTransferLogo>
				<Dropdown trigger="click" menu={{items}} placement="bottomRight">
					<Avatar style={{
						backgroundColor: '#fde3cf',
						color: '#f56a00',
						cursor: 'pointer'
					}}>WWW</Avatar>
				</Dropdown>
			</HeaderContainer>
			<Outlet/>
		</UserLayoutContainer>
	);
};

const UserLayoutContainer = styled.div`
    height: auto;
    width: 100%;
`;

export default UserLayout;
