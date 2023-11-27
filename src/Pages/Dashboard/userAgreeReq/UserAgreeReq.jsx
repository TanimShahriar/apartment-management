import Swal from "sweetalert2";
import { MdCancel, MdDownloadDone } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAgreement from "../../../Hooks/useAgreement";
import useAuth from "../../../Hooks/useAuth";


import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Link } from "react-router-dom";



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


  const handleAccept = id => {



    const memberName = user.displayName;


    //   apartmentImage, apartmentNo, blockName, floorNo, rent

    const role = "member"
    const status = "Checked";
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    const tanim = { memberName, status, email: user.email, date, role }
    console.log(tanim)


    axiosSecure.post("/members", tanim)

      .then(res => {
        console.log(res.data)
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Agreement request accepted',
            icon: 'success',
            confirmButtonText: 'Cool',
            timer: 1500
          });
          refetch();
        }

      })



  }

  const handleReject = id => {
    const userName = user.displayName;
    const role = "user"

    const status = "Checked";
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    const tanim = { userName, status, email: user.email, date, role }
    console.log(tanim)


    axiosSecure.post("/rejectedUsers", tanim)

      .then(res => {
        console.log(res.data)
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Oh, no!!!!',
            text: 'Agreement request cancelled',
            icon: 'error',
            confirmButtonText: 'sorry',
            timer: 1500
          });
          refetch();
        }

      })
  }

  return (
    <div className="bg-slate-300 p-7 min-h-screen">
      <div className="flex justify-between">
        <Link to="/dashboard/userAgreeReq"><button className="btn btn-primary"><h2>Agreement request</h2></button></Link>
        <Link to="/dashboard/acceptedAgreement"><button className="btn btn-success"><h2>accepted</h2></button></Link>
        <Link to="/dashboard/rejectedAgreement"><button className="btn btn-warning"><h2>rejected</h2></button></Link>

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
          <h2 className="text-xl font-semibold">Total items: {agreement.length}</h2>
          {/* <h2 className="text-xl font-semibold">Total price: {totalPrice}$</h2> */}
          <button className="btn btn-secondary">PAY</button>
        </div>

        <div className="overflow-x-auto mx-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-blue-400">
              <tr className="text-base font-bold">

                <th>
                  S/N
                </th>
                <th>User Name</th>
                <th>User email</th>
                <th>Block</th>

                <th>Rent</th>
                <th>Request date</th>
                <th>Accept</th>
                <th>Reject</th>

              </tr>
            </thead>
            <tbody>
              {
                agreement.map((data, i) => <tr key={data._id}>


                  <th>
                    {i + 1}
                  </th>
                  <td>
                    {data.reqName}
                  </td>
                  <td className="font-semibold">
                    {data.reqEmail}

                  </td>
                  <td className="font-semibold">{data.blockName}</td>
                  <td className="font-semibold">{data.rent}$</td>
                  <td className="font-semibold">{data.date}</td>


                  <td>
                    <button onClick={() => handleAccept(data.id)} className="btn btn-md bg-green-400"><MdDownloadDone className="text-2xl text-white"></MdDownloadDone></button>
                  </td>
                  <td>
                    <button onClick={() => handleReject(data.id)} className="btn btn-md bg-red-600"><MdCancel className="text-2xl text-white"></MdCancel></button>
                  </td>
                </tr>)
              }




            </tbody>



          </table>
        </div>

      </div>
    </div>
  );
};

export default UserAgreeReq;