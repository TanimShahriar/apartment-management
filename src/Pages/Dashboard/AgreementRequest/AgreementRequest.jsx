import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAgreement from "../../../Hooks/useAgreement";
import useAuth from "../../../Hooks/useAuth";



const AgreementRequest = () => {
  const [cart, refetch] = useAgreement();
  console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.rent, 0);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

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
          <h2 className="text-xl font-semibold">Total items: {cart.length}</h2>
          <h2 className="text-xl font-semibold">Total price: {totalPrice}$</h2>
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
                cart.map((data, i) => <tr key={data._id}>
                  <th>
                    {i + 1}
                  </th>
                  <td>
                    {data.userName}
                  </td>
                  <td className="font-semibold">
                    {data.email}

                  </td>
                  <td className="font-semibold">{data.blockName}</td>
                  <td className="font-semibold">{data.rent}$</td>
                  <td className="font-semibold">{data.date}$</td>

                  <td className="font-semibold"><button className="btn btn-primary">Accept</button></td>
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

export default AgreementRequest;