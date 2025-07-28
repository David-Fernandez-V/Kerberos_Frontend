import {createBrowserRouter} from "react-router-dom"
import Layout from "./Layout"
import ErrorDetail from "./ErrorDetail"
import HomePage from "./HomePage"
import Games from "./Games"
import SignUp from "./SingUp"
import LogIn from "./LogIn"
import Dashboard from "./Dashboard"
import PublicRoutes from "./PublicRoutes"
import PrivateRoutes from "./PrivateRoutes"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Layout><ErrorDetail /></Layout>,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "signUp",
            element: <SignUp />,
          },
          {
            path: "logIn",
            element: <LogIn />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "games",
            element: <Games />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

export default router