import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAgreement from "../../../Hooks/useAgreement";



const MyProfile = () => {
  const [cart, refetch] = useAgreement();
  console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.rent, 0);
  const axiosSecure = useAxiosSecure();


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

        axiosSecure.delete(`/carts/${id}`)
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
    <div className="">
      <div className='my-5'>
        <h4 className='text-center text-[#D99904] italic mb-5'>---------My cart---------</h4>
        <div className="flex flex-col justify-center items-center ">

          <div className="w-[35%] text-center  border-y-2 py-4 border-slate-300 mb-4 text-4xl"><h2>WANNA ADD MORE?</h2></div>

        </div>
      </div>

      <div className=" bg-slate-300 mx-20 p-10">
        <div className="flex justify-between items-center  bg-slate-300  mx-auto mb-5">
          <h2 className="text-xl font-semibold">Total items: {cart.length}</h2>
          <h2 className="text-xl font-semibold">Total price: {totalPrice}$</h2>
          <button className="btn btn-warning">PAY</button>
        </div>

        <div className="overflow-x-auto mx-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-orange-400">
              <tr className="text-base font-bold">
                <th>

                </th>
                <th>Apartment image</th>
                <th>User name</th>
                <th>Price</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {
                cart.map((data, i) => <tr key={data._id}>
                  <th>
                    {i + 1}
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className=" w-12 h-12">
                          <img src={data.apartmentImage} alt="Apartment" />
                        </div>
                      </div>

                    </div>
                  </td>
                  <td className="font-semibold">
                    {data.userName}

                  </td>
                  <td className="font-semibold">{data.rent}$</td>
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

export default MyProfile;