import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AccessPage from "./pages/AccessPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Dashboard from "./pages/DashboardPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import UserLayout, { UserContext } from "./components/user/UserLayout.tsx";
import VisitorLayout from "./components/visitor/VisitorLayout.tsx";
import { Container } from "./globalStyles.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import BillingPage from "./pages/BillingPage.tsx";
import VisitorDownloadPage from "./pages/VisitorDownloadPage.tsx";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { createContext } from "react";

// Context setup
export const UserContext = createContext({
  isLoggedIn: false,
  email: "",
  role: "",
  firstname: "",
  lastname: "",
  refetch: () => {}
});

const App = () => {
  const {data, error, loading, refetch} = useQuery(GET_CONNECTED_USER);
  
  interface ProtectedRouteProps {
    isLoggedIn: boolean;
    children: React.ReactNode;
  }
  const { isLoggedIn } = useContext(UserContext);

  const ProtectedRoute = ({ isLoggedIn, children }:ProtectedRouteProps) => {
    console.log("is logged in", isLoggedIn);
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }
  
    return children;
  }

  const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "*", element: <NotFoundPage /> },
    {
      path: "/access",
      element: <VisitorLayout />,
      children: [
        { path: "login", element: <AccessPage /> },
        { path: "register", element: <AccessPage /> },
        { path: "pricing", element: <PricingPage /> },
        { path: "download", element: <VisitorDownloadPage /> },
      ],
    },
    {
      path: "/dashboard",
      element: <UserLayout />,
      children: [
        { index: true, element: <ProtectedRoute isLoggedIn={isLoggedIn}><Dashboard /></ProtectedRoute>},
        { path: "settings", element: <SettingsPage /> },
        { path: "billing", element: <BillingPage /> },
      ],
    },
  ]);

  return (
    <Container>
      <UserContext.Provider
			value={{
				isLoggedIn: data.getConnectedUser.isLoggedIn ?? "",
				email: data.getConnectedUser.email ?? "",
				role: data.getConnectedUser.role ?? "",
				firstname: data.getConnectedUser.firstname ?? "",
				lastname: data.getConnectedUser.lastname ?? "",
				refetch: refetch
			}}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </Container>
  );
};

export default App;
