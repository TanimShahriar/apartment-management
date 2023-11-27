import { NavLink, Outlet } from "react-router-dom";
import { MdAnnouncement, MdCalendarMonth, MdEmail, MdHome, MdList, MdMenu, MdPeople, MdPeopleOutline, MdPerson, MdPlusOne } from "react-icons/md";
import useAdmin from "../Hooks/useAdmin";



const Dashboard = () => {

  // TODO: get is Admin value from database

  const [isAdmin] = useAdmin();
  const isMember = true;



  return (


    <div className="flex">
      {/* dashboard sidebar */}
      <div className="w-64 min-h-screen bg-blue-400">

        <div className="p-3">
          <NavLink to="/">
            <img src="https://i.ibb.co/XbCZ2G9/thehill-logo-teal.webp" alt="" />
          </NavLink>
        </div>

        <ul className="menu p-2 font-semibold space-y-1">
          {
            isAdmin && <>
              <li className="">
                <NavLink to="/dashboard/adminProfile">
                  <MdPerson></MdPerson>
                  Admin Profile</NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/allUsers">
                  <MdPlusOne></MdPlusOne>
                  Manage Members</NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/adminAnnouncement">
                  <MdList></MdList>
                  Make Announcement</NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/userAgreeReq">
                  <MdCalendarMonth></MdCalendarMonth>
                  Agreement </NavLink>
              </li>
              <li className="">
                <NavLink to="/dashboard/manageCoupons">
                  <MdPeople></MdPeople>
                  Manage Coupons</NavLink>
              </li>


            </>

          }

          {
            isMember ?

              //if member
              <>
                <li className="">
                  <NavLink to="/dashboard/myProfile">
                    <MdPeopleOutline className="text-xl"></MdPeopleOutline>
                    My Profile</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/makePayment">
                    <MdAnnouncement></MdAnnouncement>
                    Make Payment</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/paymentHistory">
                    <MdPeopleOutline className="text-xl"></MdPeopleOutline>
                    Payment History</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/announcement">
                    <MdAnnouncement></MdAnnouncement>
                    Announcement</NavLink>
                </li>



              </> :


              <>

                <li className="">
                  <NavLink to="/dashboard/myProfile">
                    <MdPeopleOutline className="text-xl"></MdPeopleOutline>
                    My Profile</NavLink>
                </li>
                <li className="">
                  <NavLink to="/dashboard/announcement">
                    <MdAnnouncement></MdAnnouncement>
                    Announcement</NavLink>
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