


//   return (
//     <div className=" min-h-screen p-5 pt-10" style={{ backgroundImage: 'url(https://i.ibb.co/LvXvn0f/announceq.jpg)' }}>
//       <h2 className="text-center text-3xl  font-semibold pt-5 mb-10">Announcement page:</h2>

//   

//           {/* <input type="text" name="" placeholder="Title" id="" className="border-b-2 w-2/3 mb-4 p-1 " />
//           <textarea id="message" name="message" placeholder="Description"
//             className="border-b-2 w-2/3  p-1 h-56 "></textarea> */}
//           <button className=" bg-white block m-auto w-2/3  text-center border hover:bg-blue-500  py-1  text-lg font-bold ">Announce</button>





import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";



const AdminAnnouncement = () => {


  const navigate = useNavigate();
  const location = useLocation();



  const { user } = useAuth();
  console.log(user);



  const handleAccouncement = e => {

    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;



    const tanim = { title, description }
    console.log(tanim)




    fetch("http://localhost:5000/adminAnnouncement", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(tanim)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'announcement created for all users and members',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          navigate(location?.state ? location.state : '/');
        }
      })

  }



  return (
    <div className=" min-h-screen p-5 pt-10" style={{ backgroundImage: 'url(https://i.ibb.co/LvXvn0f/announceq.jpg)' }}>
      <h2 className="text-center text-3xl  font-semibold pt-5 mb-10">Announcement page:</h2>

      <form className="p-4 shadow-lg border rounded-md" onSubmit={handleAccouncement}>

        <div className=" gap-5 mb-5">

          <div className="form-control ">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <label className="">

              <input type="text" placeholder="title" name="title" required className="input input-bordered w-72 lg:w-full" />
            </label>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <label className="">

              <textarea required className="textarea textarea-bordered w-full h-64" name="description" placeholder="descripton "></textarea>
            </label>
          </div>
        </div>




        <input type="submit" value="Announce" className=" bg-white block m-auto w-full rounded-md cursor-pointer text-center border hover:bg-blue-500  py-1  text-lg font-bold " />


      </form>
    </div>
  );
};

export default AdminAnnouncement;