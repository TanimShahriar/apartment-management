import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";

import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import Apartment from "../Pages/Apartment/Apartment";
import Agree from "../Pages/Agree/Agree";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Announcement from "../Pages/Announcement/Announcement";
import MakePayment from "../Pages/Dashboard/MakePayment/MakePayment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import AdminAnnouncement from "../Pages/Dashboard/AdminAnnouncement/AdminAnnouncement";
import AgreementRequest from "../Pages/Dashboard/AgreementRequest/AgreementRequest";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/signIn",
        element: <SignIn></SignIn>
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
      },
      {
        path: "/apartment",
        element: <Apartment></Apartment>
      },
      {
        path: "/agree",
        element: <Agree></Agree>,
        loader: ({ params }) => fetch(`http://localhost:5000/apartments/${params._id}`)
      },

    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>
      },
      {
        path: "announcement",
        element: <Announcement></Announcement>
      },


      //member panel
      {
        path: "makePayment",
        element: <MakePayment></MakePayment>
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>
      },



      //admin panel
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>
      },
      {
        path: "adminProfile",
        element: <AdminProfile></AdminProfile>
      },
      {
        path: "adminAnnouncement",
        element: <AdminAnnouncement></AdminAnnouncement>
      },
      {
        path: "agreementRequest",
        element: <AgreementRequest></AgreementRequest>
      },
    ]
  }

]);
