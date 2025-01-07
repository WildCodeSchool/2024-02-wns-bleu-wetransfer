import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AccessPage from "./pages/AccessPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Dashboard from "./pages/DashboardPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import UserLayout from "./components/user/UserLayout.tsx";
import VisitorLayout from "./components/visitor/VisitorLayout.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import BillingPage from "./pages/BillingPage.tsx";
import VisitorDownloadPage from "./pages/VisitorDownloadPage.tsx";
import {FC} from "react";
import {UserProvider} from "./context/UserContext.tsx";

interface ProtectedRouteProps {
	isLoggedIn: boolean;
	children: React.ReactNode;
}

const ProtectedRoute = ({isLoggedIn, children}: ProtectedRouteProps) => {
	if (!isLoggedIn) {
		return <Navigate to="/"/>;
	}

	return children;
}

const App: FC = () => {
	return (
		// <UserProvider>
		<MainLayout/>
		// </UserProvider>
	);
};

const MainLayout: FC = () => {

	const router = createBrowserRouter([
		{path: "/", element: <LandingPage/>},
		{path: "*", element: <NotFoundPage/>},
		{
			path: "/access",
			element: <VisitorLayout/>,
			children: [
				{path: "login", element: <AccessPage/>},
				{path: "register", element: <AccessPage/>},
				{path: "pricing", element: <PricingPage/>},
				{path: "download", element: <VisitorDownloadPage/>},
			],
		},
		{
			path: "/dashboard",
			element: <UserLayout/>,
			children: [
				{
					index: true,
					element: <ProtectedRoute isLoggedIn={true}><Dashboard/></ProtectedRoute>
				},
				{path: "settings", element: <SettingsPage/>},
				{path: "billing", element: <BillingPage/>},
			],
		},
	]);

	return (
		<UserProvider>
			<RouterProvider router={router}/>
		</UserProvider>
	)
}

export default App;
