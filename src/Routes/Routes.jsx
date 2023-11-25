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
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import Apartment from "../Pages/Apartment/Apartment";
import Agree from "../Pages/Agree/Agree";





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
        element: <PrivateRoute><Apartment></Apartment></PrivateRoute>
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
        path: "cart",
        element: <Cart></Cart>
      },

      //admin panel
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>
      },
    ]
  }

]);
