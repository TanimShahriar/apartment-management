import Swal from "sweetalert2";
import { MdCancel, MdDownloadDone } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAgreement from "../../../Hooks/useAgreement";
import useAuth from "../../../Hooks/useAuth";


import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Link } from "react-router-dom";
import UserAgreeCard from "./UserAgreeCard";



const UserAgreeReq = () => {

  const { user } = useAuth();


  const axiosSecure = useAxiosSecure();
  const { data: agreement = [], refetch } = useQuery({
    queryKey: ["agreement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/agreement")
      return res.data;
    }
  })

  console.log(agreement)




  return (
    <div className="bg-slate-300 p-7 min-h-screen">
      <div className="flex justify-between">
        <Link to="/dashboard/userAgreeReq"><button className="font-medium px-3 py-2 bg-blue-500 rounded-md"><h2>Agreement request<span className="font-bold">({agreement.length})</span></h2></button></Link>
        <Link to="/dashboard/acceptedAgreement"><button className="font-medium px-3 py-2 bg-green-500 rounded-md"><h2>accepted</h2></button></Link>
        <Link to="/dashboard/rejectedAgreement"><button className="font-medium px-3 py-2 bg-red-400 rounded-md"><h2>rejected</h2></button></Link>

      </div>
      <div className="flex justify-end font-semibold mt-10">
        <div className="flex justify-end gap-2 items-center">
          <div className="">
            <img className="h-11 w-11 rounded-full" src={user.photoURL} alt="" />
          </div>
          <div>
            <h2 className="text-sm">{user.email}</h2>
            <h2 className="text-sm">User: {user.displayName}</h2>
          </div>
        </div>

      </div>
      <div className="pt-10 ">
        <div className="flex justify-between items-center  bg-slate-300  mx-auto mb-5">


        </div>



      </div>

      <div className="grid grid-cols-4 gap-4">
        {
          agreement.map(data => <UserAgreeCard key={data._id} data={data} refetch={refetch} > </UserAgreeCard>)
        }
      </div>

    </div>
  );
};

export default UserAgreeReq;