import { NavLink, Outlet } from "react-router-dom";
import { MdCalendarMonth, MdEmail, MdHome, MdList, MdMenu, MdPeople, MdPlusOne, MdReviews, MdShoppingCart } from "react-icons/md";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  // TODO: get is Admin value from database

  const [isAdmin] = useAdmin();

  return (


    <div className="flex">
      {/* dashboard sidebar */}
      <div className="w-64 min-h-screen bg-[#eba946]">

        <div className="px-6 py-3">
          <NavLink to="/">
            <h2 className="font-bold text-lg ">BISTRO BOSS</h2>
            <p className="tracking-widest uppercase font-medium">Restaurant</p>
          </NavLink>
        </div>

        <ul className="menu p-2 font-semibold space-y-1">
          {
            isAdmin ? <>
              <li className="">
                <NavLink to="/dashboard/adminHome">
                  <MdHome className="text-xl"></MdHome>
                  Admin Home</NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/addItems">
                  <MdPlusOne></MdPlusOne>
                  Add Items</NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/manageItems">
                  <MdList></MdList>
                  Manage Items</NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/manageBookings">
                  <MdCalendarMonth></MdCalendarMonth>
                  Manage Bookings</NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/allUsers">
                  <MdPeople></MdPeople>
                  All Users</NavLink>
              </li>


            </> :
              <>
                <li className="">
                  <NavLink to="/dashboard/userHome">
                    <MdHome className="text-xl"></MdHome>
                    User Home</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/reservation">
                    <MdCalendarMonth></MdCalendarMonth>
                    Reservation</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/cart">
                    <MdShoppingCart></MdShoppingCart>
                    My Cart ({cart.length})</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/review">
                    <MdReviews></MdReviews>
                    Add Review</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/bookings">
                    <MdList></MdList>
                    My Bookings</NavLink>
                </li>


              </>
          }
          {/* shared content */}
          <div className="divider"></div>

          <li className="">
            <NavLink to="/">
              <MdHome className="text-xl"></MdHome>
              Home</NavLink>
          </li>
          <li className="">
            <NavLink to="/ourShop/salads">
              <MdMenu></MdMenu>
              Menu</NavLink>
          </li>
          <li className="">
            <NavLink to="/contact">
              <MdEmail></MdEmail>
              Contact</NavLink>
          </li>

        </ul>
      </div>

      {/* dashboard content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>

    </div>

  );
};

export default Dashboard;