
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

import Swal from 'sweetalert2';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';




const UserAgreeCard = ({ data, refetch }) => {

  const { _id, apartmentImage, apartmentNo, blockName, floorNo, rent, agreementButton, reqName, reqEmail, apartmentId } = data;

  const acceptDate = moment().format('MMMM Do YYYY, h:mm:ss a');
  const axiosSecure = useAxiosSecure();



  const { data: newUser = [] } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      return res.data
    }
  })
  const reqId = newUser.find(item => item.email == reqEmail)
  console.log(reqId);


  const handleAccept = id => {
    const role = "member"
    const status = "checked"
    const newStatus = { status }
    const newRole = { role }
    const agreementPost = { apartmentImage, apartmentNo, blockName, floorNo, rent, agreementButton, reqName, reqEmail, apartmentId, acceptDate }

    axiosSecure.put(`/users/${reqId._id}`, newRole, newStatus)

      .then(res => {
        console.log(res.data)
        if (res.data.matchedCount) {
          Swal.fire({
            title: "Success!",
            text: "Request Accepted",
            icon: "success"
          });
        }

      })

    console.log(id, apartmentNo)


    axiosSecure.post("/members", agreementPost)
      .then(res => {
        console.log(res)
        refetch();
      })


    axiosSecure.delete(`/agreement/${id}`)
      .then(res => {
        console.log(res)
        refetch();

      })

  }



  const handleReject = id => {
    const role = "user"
    const tanim = { apartmentImage, apartmentNo, blockName, floorNo, rent, agreementButton, reqName, reqEmail, acceptDate, apartmentId, role }

    axiosSecure.post('/users', tanim)

      .then(res => {
        console.log(res.data)
        if (res.data.insertedId) {
          Swal.fire({
            title: "sorry!",
            text: "Agreement request rejected",
            icon: "warning"
          });
        }

      })

    axiosSecure.delete(`/agreement/${id}`)
      .then(res => {
        console.log(res)
        refetch();

      })


  }




  return (

    <div>
      <div className="rounded-lg bg-slate-100 p-2  shadow-lg drop-shadow-md shadow-current  h-auto  hover:shadow-lg hover:transform hover:scale-100 duration-500 ease-in-out ">
        <img className="w-full h-44 lg:h-[220px] rounded-t-lg " src={apartmentImage} alt="Assignment" />
        <p className=" mx-3 mt-2 font-medium text-lg">Apartment no: {apartmentNo}</p>
        <p className=" mx-3 mt-2 font-medium text-lg">Client: {reqName}</p>
        <p className=" mx-3 my-1 font-medium text-lg">Level: {blockName}</p>
        <div className='flex justify-between px-2'>
          <button onClick={() => handleAccept(_id)} className='font-medium px-3 py-1 bg-green-500 rounded-md'>Accept</button>
          <button onClick={() => handleReject(_id)} className='font-medium px-3 py-1 bg-red-400 rounded-md'>reject</button>


        </div>
      </div >


    </div>



  );
};

export default UserAgreeCard;