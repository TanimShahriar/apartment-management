import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";




const ApartmentCard = ({ card }) => {
  const { _id, apartmentImage, apartmentNo, blockName, floorNo, rent, agreementButton } = card;

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();



  const { user } = useAuth();
  console.log(user)

  const handleAgree = () => {


    if (user && user.email) {

      const userName = user.displayName;
      const userEmail = user.email;


      const status = "Pending";
      const tanim = { userName, status, userEmail, apartmentNo, blockName, floorNo, rent }
      console.log(tanim)


      axiosSecure.post("/agree", tanim)

        .then(res => {
          console.log(res.data)
          if (res.data.insertedId) {
            Swal.fire({
              title: 'Success!',
              text: 'Agreement requested',
              icon: 'success',
              confirmButtonText: 'Cool',
              timer: 1500
            })
          }

        })


    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to agree terms and condition",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signIn', { state: { from: location } })
        }
      });
    }

  }



  return (
    <div className=" space-y-1 rounded-lg  p-2  shadow-lg drop-shadow-md shadow-current  h-auto  hover:shadow-lg hover:transform hover:scale-100 duration-500 ease-in-out">
      <img className="h-[220px] w-full" src={apartmentImage} alt="" />
      <p className=" mx-4   font-medium text-xl">Apartment no: {apartmentNo}</p>
      <div className="flex justify-between items-center">

        <p className=" mx-4  font-medium text-xl">Block: {blockName}</p>
        <p className=" mx-4  font-medium text-xl">Floor: {floorNo}</p>
      </div>
      <p className=" mx-4  font-semibold text-lg">Rent: {rent}$</p>
      <button onClick={handleAgree} className="px-3 py-1 bg-slate-300  font-semibold rounded-sm ml-4 ">{agreementButton}</button>
    </div>
  );
};

export default ApartmentCard;