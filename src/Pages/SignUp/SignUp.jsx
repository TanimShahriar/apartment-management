
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { updateProfile } from "firebase/auth";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";



const SignUp = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value

    console.log(email, password, name, photo)


    if (password.length < 6) {
      toast.error("Password Must be 6 characters")
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password Must be have a capital letter")
      return;
    } else if (!/[@#$%^&-+=()]/.test(password)) {
      toast.error("Password Must be have a symbol")
      return;
    }

    createUser(email, password, name)
      .then(res => {
        console.log(res)
        Swal.fire({
          title: "Cool!",
          text: "User sign up successful",
          icon: "success"
        });
        toast.success("Registration successfull")
        updateProfile(res.user, {
          displayName: name,
          photoURL: photo
        })
        navigate(location?.state ? location.state : '/')
      })

      .catch(error => {
        console.log(error)
        toast.error("Email already Used")
      })

  }
  return (
    <div>
      <div>
        <div className="hero py-16 flex justify-center">
          <div className="text-center lg:w-1/2">
            <img className="h-[400px] mt-10" src="https://i.ibb.co/YXCtnwk/Signin-Banner.jpg" alt="" />
          </div>
          <div className="hero-content ">
            <div className="card flex-shrink-0  shadow-2xl bg-base-100">
              <h1 className="text-4xl text-center font-bold mt-6">Register now!</h1>
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" placeholder="Your name" name="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo Url</span>
                  </label>
                  <input type="text" placeholder="photo url" name="photo" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                  <label className="label">

                  </label>
                </div>
                <div className="form-control mt-6">
                  <button type='submit' className="btn btn-primary">Sign Up</button>
                </div>

                <div className='mt-4'>Already have an account ? <span><Link to='/signIn' className='text-blue-500 font-bold'>Sign In</Link></span></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;