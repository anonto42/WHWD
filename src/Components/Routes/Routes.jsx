import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Main from "../Layout/Main";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import SignIn from "../../Pages/Auth/SignIn";
import UpdatePassword from "../../Pages/Auth/UpdatePassword";
import OtpPage from "../../Pages/Auth/OtpPage";
import Users from "../Dashboard/Users";
import Language from "../Dashboard/Language";
import Notifications from "../Dashboard/Notifications";
import ProtectedRoute from "../../utils/ProtectedRoute";
import SherpasManagement from "../Dashboard/SherpasManagement";
import CategoryManagement from "../Dashboard/CategoryManagement";
import WhisperManagement from "../Dashboard/WhisperManagement";
import Settings from "../Dashboard/Settings";
import Subscription from "../Dashboard/Subscription";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <OtpPage />,
      },
      {
        path: "/reset-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashboardLayout />,
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "overview",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "language",
            element: <Language />,
          },
          {
            path: "sherpas-management",
            element: <SherpasManagement />,
          },
          {
            path: "category-management",
            element: <CategoryManagement />,
          },
          {
            path: "whisper-management",
            element: <WhisperManagement />,
          },
          {
            path: "subscription",
            element: <Subscription />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
