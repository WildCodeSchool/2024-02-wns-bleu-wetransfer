import {createContext, FC} from "react";
import {HeaderContainer, WildTransferLogo} from "../visitor/VisitorLayout.tsx";
import styled from "@emotion/styled";
import {Avatar, Dropdown, MenuProps} from "antd";
import {DashboardOutlined, DollarOutlined, LogoutOutlined, SettingOutlined} from "@ant-design/icons";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {ApolloError, useMutation, useQuery} from '@apollo/client';
import {LOGOUT} from "../../graphql/mutations.ts";
import {GET_CONNECTED_USER} from "../../graphql/queries.ts";

// Context setup
export const UserContext = createContext({
	isLoggedIn: false,
	email: "",
	role: "",
	firstname: "",
	lastname: "",
});

const UserLayout: FC = () => {
	const navigate = useNavigate();

	const {data, error, loading, refetch} = useQuery(GET_CONNECTED_USER);

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

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error || !data || !data.getConnectedUser) {
		return <p>Error loading user data.</p>;
	}

	console.log(data)

	return (
		<UserContext.Provider
			value={{
				isLoggedIn: data.getConnectedUser.isLoggedIn,
				email: data.getConnectedUser.email,
				role: data.getConnectedUser.role,
				firstname: data.getConnectedUser.firstname,
				lastname: data.getConnectedUser.lastname,
			}}
		>
			<UserLayoutContainer>
				<HeaderContainer>
					<WildTransferLogo onClick={() => navigate('/dashboard')}>WildTransfer</WildTransferLogo>
					<Dropdown trigger="click" menu={{items}} placement="bottomRight">
						<Avatar style={{
							backgroundColor: '#fde3cf',
							color: '#f56a00',
							cursor: 'pointer'
						}}>{data.getConnectedUser.firstname.charAt(0).toUpperCase()}</Avatar>
					</Dropdown>
				</HeaderContainer>
				<Outlet/>
			</UserLayoutContainer>
		</UserContext.Provider>
	);
};

const UserLayoutContainer = styled.div`
    height: auto;
    width: 100%;
`;

export default UserLayout;
