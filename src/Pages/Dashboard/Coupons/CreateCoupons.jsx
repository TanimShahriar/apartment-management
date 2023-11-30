import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { MdArrowRightAlt, MdDeleteForever } from "react-icons/md"
import { useLocation } from "react-router-dom";

const CreateCoupons = () => {

  const { user } = useAuth();

  const location = useLocation();

  const axiosSecure = useAxiosSecure();
  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons")
      return res.data;
    }
  })

  console.log(coupons);

  const handleCreateCoupons = e => {

    e.preventDefault();
    const form = e.target;
    const couponCode = form.couponCode.value;
    const discountPercentage = form.discountPercentage.value;
    const description = form.description.value;



    const tanim = { couponCode, description, discountPercentage }
    console.log(tanim)


    axiosSecure.post("/coupons", tanim)

      .then(res => {
        console.log(res.data.insertedId)
        if (res.data.insertedId) {
          refetch();
        }

      })
  }


  const handleDeleteCoupon = (id) => {
    console.log(user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
      .then((result) => {
        if (result.isConfirmed) {

          axiosSecure.delete(`/coupons/${id}`)
            .then(res => {
              console.log(res)
              refetch();
            })

        }
      });
  }

  return (
    <div className="bg-emerald-700 min-h-screen">
      {/* create coupons */}
      <div className="">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className=" px-4 py-2 bg-slate-400 font-semibold flex items-center  gap-1" onClick={() => document.getElementById('my_modal_1').showModal()}>Create coupon < MdArrowRightAlt className="text-lg font-bold"></ MdArrowRightAlt> </button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">


            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn mb-5">Close</button>
              </form>
            </div>
            <form onSubmit={handleCreateCoupons} className="p-4 shadow-lg border rounded-md">

              <div className=" gap-5 mb-5 space-y-3">

                <div className="form-control ">

                  <label className="">

                    <input type="text" placeholder="coupon code" name="couponCode" required className="input input-bordered w-72 lg:w-full" />
                  </label>
                </div>
                <div className="form-control ">

                  <label className="">

                    <input type="text" placeholder="discount percentage" name="discountPercentage" required className="input input-bordered w-72 lg:w-full" />
                  </label>
                </div>
                <div className="form-control ">

                  <label className="">

                    <textarea required className="textarea textarea-bordered w-full h-64" name="description" placeholder="descripton "></textarea>
                  </label>
                </div>

              </div>
              <div>

                <input type="submit" value="create coupon" className=" bg-white block m-auto w-full rounded-md cursor-pointer text-center border hover:bg-blue-500  py-1  text-lg font-bold " /></div>


            </form>
          </div>

        </dialog>

      </div>



      {/* All coupons*/}
      <h2 className="mt-10 ml-5 font-bold mb-2">coupon cards:</h2>



      <div className="overflow-x-auto mx-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-orange-400">
            <tr className="text-base font-bold">
              <th>
                s/n
              </th>
              <th>Coupon code</th>
              <th>discount percentage</th>
              <th>description</th>
              <th>action</th>


            </tr>
          </thead>
          <tbody>
            {
              coupons.map((user, i) => <tr key={user._id}>
                <th>
                  {i + 1}
                </th>
                <td className="font-bold">
                  {user.couponCode}
                </td>
                <td className="font-semibold">
                  {user.discountPercentage}

                </td>
                <td className="font-semibold">
                  {user.description}
                </td>
                <td>
                  <button onClick={() => handleDeleteCoupon(user._id)} className="bg-slate-50 px-4 py-1 rounded-lg flex items-center text-red-600 gap-1"> <MdDeleteForever></MdDeleteForever>delete</button>
                </td>
              </tr>)
            }




          </tbody>



        </table>
      </div>







    </div>
  );
};

export default CreateCoupons;