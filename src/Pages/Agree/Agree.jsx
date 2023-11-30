
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";


const Agree = () => {
  const agree = useLoaderData();

  const navigate = useNavigate();
  const location = useLocation();
  // const { _id } = useParams();
  // const details = takeAssignment.find(details => details._id == _id);
  const { name, description, marks, imgUrl, dueDate, difficultyLevel } = agree;


  const { user } = useAuth();
  console.log(user)



  const handleAgree = e => {



    e.preventDefault();
    const form = e.target;
    const examineeName = user.displayName;
    const takeAssignEmail = user.email;

    const pdf = form.pdf.value;
    const note = form.note.value;
    const status = "Pending";
    const tanim = { examineeName, pdf, note, status, takeAssignEmail, name, description, marks, imgUrl, dueDate, difficultyLevel }
    console.log(tanim)




    fetch("https://the-hill-apartment-server.vercel.app/agree", {
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
            text: 'Assignment submitted complete',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          navigate(location?.state ? location.state : '/agree');
        }
      })

  }


  return (
    <div>
      <h2 className='text-center font-semibold text-xl mb-4'>Take <span className="text-blue-600 font-bold "> {agree.name} </span>assignment</h2>
      <form className="p-4 shadow-lg border rounded-t-md" onSubmit={handleAgree}>

        <div className="md:flex gap-5 mb-5">
          {/* <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Examinee Name</span>
            </label>
            <label className="">

              <input type="text" defaultValue={takeAssignment.examineeName} name="examineeName" className="input input-bordered w-72 lg:w-full" />
            </label>
          </div> */}
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">PDF</span>
            </label>
            <label className="">

              <input type="text" placeholder="PDF" name="pdf" required className="input input-bordered w-72 lg:w-full" />
            </label>
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Note</span>
            </label>
            <label className="">

              <textarea className="textarea textarea-bordered" required name="note" placeholder="Note"></textarea>
            </label>
          </div>
        </div>




        <input type="submit" value="Submit" className="px-4 py-3 bg-[#4287f5] my-5 w-full rounded-md font-medium cursor-pointer" />


      </form>
    </div>
  );
};

export default Agree;