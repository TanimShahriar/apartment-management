
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialSignIn from "../../Components/SocialSignIn/SocialSignIn";
import useAuth from "../../Hooks/useAuth";


const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        updateUserProfile(data.displayName, data.photoURL)
          .then(() => {
            console.log('user profile info updated')
            //create user entry in the database
            const userInfo = {
              name: user.displayName,
              email: user.email
            }

            axiosPublic.post("/users", userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    title: "Good job!",
                    text: "User created successfully!",
                    icon: "success"
                  });
                  navigate('/');
                }
              })

          })

      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email already in use",
        });
        console.log(error, "okay")
      })

  }



  // console.log(watch("example"))

  return (
    <>
      <Helmet>
        <title>The Hill | Sign Up</title>
      </Helmet>
      <div className=" rounded-lg py-24">
        <div className="flex items-center">
          <div className="text-center lg:w-1/2">
            <img className="h-[400px] mt-10" src="https://i.ibb.co/YXCtnwk/Signin-Banner.jpg" alt="" />
          </div>
          <div className="w-1/2 p-4  border rounded-lg bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="Your name" {...register("name", { required: true })} name="name" className="input input-bordered" />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="Your email" {...register("email", { required: true })} name="email" className="input input-bordered" />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password"  {...register("password", {
                  required: true, minLength: 6, maxLength: 15, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z]).{8}$/
                })} placeholder="Your password" className="input input-bordered" />
                {errors.password?.type === "required" && <p className="text-red-500">Password is required</p>}
                {errors.password?.type === "minLength" && <p className="text-red-500">Password must be six character</p>}
                {errors.password?.type === "maxLength" && <p className="text-red-500">Password must be less than fifteen character</p>}
                {errors.password?.type === "pattern" && <p className="text-red-500">Password must be at least one uppercase, one lowecase, one number and one special character </p>}


              </div>



              <div className="form-control mt-6">
                <input className='bg-[#4287f5]  cursor-pointer px-1 text-sm lg:text-base lg:px-4 rounded-md py-1 lg:py-2 btn-outline duration-300 border-white text-white w-full ' type="submit" value="Sign Up" />

              </div>

              <p className="text-center">-------  or  -------</p>
              <div className="divider"></div>

              <SocialSignIn></SocialSignIn>


            </form>


            <Link to="/signIn"> <p className="text-center mt-2">Already have an account? <span className="font-semibold text-[#4287f5]">Sign In</span></p></Link>

          </div>
        </div>


      </div></>
  );
};

export default SignUp;