import { AiFillGoogleCircle } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialSignIn = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email
        }
        // axiosPublic.post("/users", userInfo)
        //   .then(res => {
        //     console.log(res.data)
        //   })
        console.log(result.user);
        Swal.fire({
          title: "Cool!",
          text: "User sign in successful",
          icon: "success",
          timer: 1000
        });
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.error(error)
      })



  }
  return (

    <div>
      <div className="relative">
        <AiFillGoogleCircle className="absolute top-[6px] left-[200px] cursor-pointer  text-3xl text-white rounded-full"></AiFillGoogleCircle>
        <input onClick={handleGoogleSignIn} className="bg-[#4287f5]  cursor-pointer px-1 text-sm lg:text-base lg:px-4 rounded-md py-1 lg:py-2 btn-outline duration-300 border-white text-white w-full " type="submit" value="Sign in with Google" />
      </div>
    </div>


  );
};

export default SocialSignIn;