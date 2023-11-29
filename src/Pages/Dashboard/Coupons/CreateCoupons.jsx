import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CreateCoupons = () => {

  const axiosSecure = useAxiosSecure();

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
        console.log(res.data)
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'coupons created successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
            timer: 1500
          });

        }

      })
  }

  return (
    <div>
      {/* create coupons */}
      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Create coupon</button>
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
              <input type="submit" value="create coupon" className=" bg-white block m-auto w-full rounded-md cursor-pointer text-center border hover:bg-blue-500  py-1  text-lg font-bold " />


            </form>
          </div>

        </dialog>

      </div>



      {/* All coupons*/}

      <div>


      </div>



    </div>
  );
};

export default CreateCoupons;