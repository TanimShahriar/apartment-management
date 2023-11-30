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
import UserAgreeReq from "../Pages/Dashboard/userAgreeReq/userAgreeReq";
import AcceptedAgreement from "../Pages/Dashboard/AcceptedAgreement/AcceptedAgreement";
import RejectedAgreement from "../Pages/Dashboard/RejectedAgreement/RejectedAgreement";
import ManageCoupons from "../Pages/Dashboard/ManageCoupons/ManageCoupons";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import ConfirmPayment from "../Pages/Dashboard/MakePayment/confirmPayment";
import CreateCoupons from "../Pages/Dashboard/Coupons/CreateCoupons";
import MoreAbout from "../Pages/Home/About/MoreAbout";
import AllCoupons from "../Pages/Dashboard/Coupons/AllCoupons";
import Gallery from "../Pages/Gallery/Gallery";
import Location from "../Pages/Location/Location";

import Contact from "../Pages/Dashboard/Contact/Contact";





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
        path: "/moreAbout",
        element: <MoreAbout></MoreAbout>
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>
      },
      {
        path: "/location",
        element: <Location></Location>
      },
      {
        path: "/agree",
        element: <Agree></Agree>,
        loader: ({ params }) => fetch(`https://the-hill-apartment-server.vercel.app/apartments/${params._id}`)
      },

    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "myProfile",
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: "announcement",
        element: <PrivateRoute><Announcement></Announcement></PrivateRoute>
      },
      {
        path: "userProfile",
        element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
      },
      {
        path: "contact",
        element: <Contact></Contact>
      },


      //member panel
      {
        path: "makePayment",
        element: <PrivateRoute><MakePayment></MakePayment></PrivateRoute>
      },
      {
        path: "paymentHistory",
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      },
      {
        path: "confirmPayment",
        element: <PrivateRoute><ConfirmPayment></ConfirmPayment></PrivateRoute>
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
      {
        path: "userAgreeReq",
        element: <UserAgreeReq></UserAgreeReq>
      },
      {
        path: "acceptedAgreement",
        element: <AcceptedAgreement></AcceptedAgreement>
      },
      {
        path: "rejectedAgreement",
        element: <RejectedAgreement></RejectedAgreement>
      },
      {
        path: "manageCoupons",
        element: <ManageCoupons></ManageCoupons>
      },
      {
        path: "createCoupons",
        element: <CreateCoupons></CreateCoupons>
      },
      {
        path: "allCoupons",
        element: <AllCoupons></AllCoupons>
      },
    ]
  }

]);
