import Swal from "sweetalert2";
import { MdOutlineDelete } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAgreement from "../../../Hooks/useAgreement";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
// import AgreementRequest from "../AgreementRequest/AgreementRequest";
import { useQuery } from "@tanstack/react-query";



const MyProfile = () => {
  const [cart, refetch] = useAgreement();
  console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.rent, 0);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user.email)



  const { data: agreementProduct = [] } = useQuery({
    queryKey: ["member"],
    queryFn: async () => {
      const res = await axiosSecure.get("/members")
      return res.data;
    }
  })



  const myProduct = agreementProduct.filter(item => item.reqEmail == user.email);
  console.log(myProduct);


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


        <div className="grid grid-cols-3 gap-3">

          {
            myProduct.map(data =>
              <div key={data._id} className="card  bg-base-100 shadow-xl">

                <div className=" space-y-2 rounded-lg  p-2  shadow-lg drop-shadow-md shadow-current  h-auto  hover:shadow-lg hover:transform hover:scale-100 duration-500 ease-in-out">
                  <img className="h-[220px] w-full" src={data.apartmentImage} alt="" />
                  <p className=" mx-4 font-medium ">{data.acceptDate}</p>
                  <div className="flex justify-between items-center">

                    <p className=" mx-4  font-medium ">Block: {data.blockName}</p>
                    <p className=" mx-4  font-medium ">Floor: {data.floorNo}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className=" mx-4  font-medium ">Apartment no : {data.apartmentNo}</p>
                    <p className=" mx-4  font-medium ">Rent: {data.rent}$</p>
                  </div>
                  <div className="flex justify-between">
                    <p className=" mx-4  font-semibold ">Status: Checked</p>
                    <button onClick={() => handleDelete(data._id)} className="btn btn-primary">remove</button>
                  </div>
                </div>
              </div>

            )
          }
        </div>
      </div>
    </div>
  );
};

export default MyProfile;