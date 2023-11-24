import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <div className="">
      <img className="max-w-screen-2xl mx-auto " src="https://i.ibb.co/mTpvKDG/error-Page.png" alt="" />
      <Link className="ml-52" to="/"> <button className=" w-20  btn-primary">Back</button></Link>

    </div>
  );
};

export default ErrorPage;