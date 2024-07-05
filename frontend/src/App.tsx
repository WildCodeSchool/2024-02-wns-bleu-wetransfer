import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AccessPage from "./pages/AccessPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Dashboard from "./pages/DashboardPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import UserLayout from "./components/user/UserLayout.tsx";
import VisitorLayout from "./components/visitor/VisitorLayout.tsx";
import {Container} from "./globalStyles.tsx";
import PricingPage from "./pages/PricingPage.tsx";


const App = () => {

	const router = createBrowserRouter([
		{path: '/', element: <LandingPage/>},
		{path: '*', element: <NotFoundPage/>},
		{
			path: '/access', element: <VisitorLayout/>, children: [
				{path: 'login', element: <AccessPage/>},
				{path: 'register', element: <AccessPage/>}
			]	
		},
		{
			path: '/dashboard', element: <UserLayout/>, children: [
				{index: true, element: <Dashboard/>},
				{path: 'settings', element: <SettingsPage/>},
				{path: 'pricing', element: <PricingPage/>}
			]
		}
	])

	return (
		<Container>
			<RouterProvider router={router}/>
		</Container>
	);
}

export default App;