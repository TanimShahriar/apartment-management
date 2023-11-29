import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAgreement from "../../../Hooks/useAgreement";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";



const UserProfile = () => {
  const [cart, refetch] = useAgreement();
  console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.rent, 0);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user.email)

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/agreement/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });

            }
          })
      }
    });
  }

  return (
    <div className="bg-slate-300 p-7 min-h-screen">
      <div className="flex justify-end font-semibold">
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

        <div className="overflow-x-auto mx-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-blue-400">
              <tr className="text-base font-bold">
                <th>
                  S/N
                </th>
                <th>Apartment image</th>
                <th>Apartment no.</th>
                <th>Block Name</th>
                <th>Floor No</th>
                <th>Price</th>
                <th>Agreement date</th>
                <th>Status</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {
                cart.filter(item => item.reqEmail === user.email).map((data, i) => <tr key={data._id}>
                  <th>
                    {i + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className=" w-16 h-16">
                          <img src={data.apartmentImage} alt="Apartment" />
                        </div>
                      </div>

                    </div>
                  </td>
                  <td className="font-semibold">
                    {data.apartmentNo}

                  </td>
                  <td className="font-semibold">{data.blockName}</td>
                  <td className="font-semibold">{data.floorNo}</td>
                  <td className="font-semibold">{data.rent}$</td>
                  <td className="font-semibold">{data.agreementDate}</td>
                  <td ><button className="btn btn-primary">{data.status}</button></td>
                  <td>
                    <button onClick={() => handleDelete(data._id)} className="btn btn-md bg-red-600"><MdOutlineDelete className="text-2xl text-white"></MdOutlineDelete></button>
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

export default UserProfile;