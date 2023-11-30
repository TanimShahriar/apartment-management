
import { Link, NavLink } from "react-router-dom";

import { MdOutlineLogout } from "react-icons/md";
import useAuth from "../../../Hooks/useAuth";




const Navbar = () => {

  const { user, setUser, signOutt } = useAuth();



  const handleSignOut = () => {
    signOutt()
      .then(() => { })
      .catch(error => {
        console.error(error)
      })
  }


  const navLinks = <>

    <NavLink className="focus:bg-[#4287f5] px-3 py-1 text-lg  rounded-md text-white  btn-outline mr-2 duration-300 " to='/'>Home</NavLink>
    <NavLink className="focus:bg-[#4287f5] px-3 py-1 text-lg  rounded-md text-white  btn-outline mr-2 duration-300 " to='/apartment'>Apartments</NavLink>
    <NavLink className="focus:bg-[#4287f5] px-3 py-1 text-lg  rounded-md text-white  btn-outline mr-2 duration-300 " to='/gallery'>Gallery</NavLink>


  </>
  return (
    <div className="navbar  bg-[#15151580]  max-w-screen-2xl fixed z-10 bg-opacity-30 bg-black px-10 ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/"><img className="h-12 lg:h-16" src="https://i.ibb.co/XbCZ2G9/thehill-logo-teal.webp" alt="" /></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      <div className="gap-3">





      </div>
      <div className="navbar-end gap-3">


        <input className="bg-slate-100 p-2 rounded-md w-20 lg:w-48" placeholder="Search" type="search" name="" id="" />

        {
          user && <div className="dropdown  dropdown-end items-center gap-2 px-1  rounded-md">
            <button className="" tabIndex={0}><img className="h-11 w-11 rounded-full  " src={user.photoURL} alt="" /></button>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-blue-100 rounded-box w-52 ">
              <p className="text-center">{user.displayName}</p>

              <Link className="flex justify-center" to="dashboard/myProfile"><button className=" border-t border-white">Dashboard</button></Link>

              <div className="mt-1 flex items-center justify-center gap-1 border-t border-white">
                <button onClick={handleSignOut} > Sign out</button>
                <MdOutlineLogout></MdOutlineLogout>
              </div>



            </ul>
          </div>
          // <h2 className="text-slate-100 text-center text-sm lg:text-lg font-medium lg:font-medium">{user.displayName}</h2>

        }
        {
          user ?
            <div className="flex items-center gap-1"></div>
            :
            <Link to='/signIn'>
              <button className="focus:bg-[#4287f5] px-3 py-1 text-lg  rounded-md text-white  btn-outline mr-2 duration-300 ">Sign in</button>
            </Link>
        }





      </div>
    </div>
  );
};

export default Navbar;

//<img className="h-10 lg:h-24 w-12 lg:w-28" src="https://i.ibb.co/kSyxD6z/final-study-group.jpg" alt="" />