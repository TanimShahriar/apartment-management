import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialSignIn from '../../Components/SocialSignIn/SocialSignIn';
import useAuth from '../../Hooks/useAuth';





const SignIn = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  const { signIn } = useAuth();


  const location = useLocation();
  console.log("Location in the login page", location);
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])

  const handleSignIn = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "Cool!",
          text: "User sign in successful",
          icon: "success"
        });
        navigate(from, { replace: true });

      })
      .catch(error => {
        console.log(error)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry, you are not registered!",
        });
      })

  }


  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {

      setDisabled(false);
    }
  }


  return (

    <>
      <Helmet>
        <title>The Hill | Sign In</title>
      </Helmet>
      <div className=" rounded-lg py-24 ">
        <div className="flex items-center ">
          <div className="text-center lg:w-1/2">
            <img className="h-[400px] mt-10" src="https://i.ibb.co/YXCtnwk/Signin-Banner.jpg" alt="" />
          </div>
          <div className="w-1/2 p-4  border rounded-lg bg-base-100">
            <form onSubmit={handleSignIn} className="card-body">

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="Your email" name="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Your password" name="password" className="input input-bordered" required />

              </div>

              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input onClick={handleValidateCaptcha} type="text" placeholder="Type the captcha" ref={captchaRef} name="captcha" className="input input-bordered" required />
                <button onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-1">Validate</button>

              </div>

              <div className="form-control mt-6">
                <input disabled={disabled} className='btn btn-secondary w-full' type="submit" value="Sign In" />

              </div>

              <p className="text-center">-------  or  -------</p>

              <div className="divider"></div>

              <SocialSignIn></SocialSignIn>

            </form>


            <Link to="/signUp"> <p className="text-center mt-2">Do not have account? <span className="font-semibold text-[#4287f5]">Sign Up</span></p></Link>
          </div>
        </div>


      </div>
    </>

  );
};

export default SignIn;