import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorDetail from "./ErrorDetail";
import HomePage from "./HomePage";
import SignUp from "./SingUp";
import LogIn from "./LogIn";
import Dashboard from "./Dashboard";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Verification from "./Verification";
import Settings from "./Settings";
import EmailChange from "./EmailChange";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Layout>
        <ErrorDetail />
      </Layout>
    ),
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
            path: "verify",
            element: <Verification />,
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
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "emailChange",
            element: <EmailChange />,
          },
        ],
      },
    ],
  },
]);

export default router;
