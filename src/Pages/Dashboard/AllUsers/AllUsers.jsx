import { useQuery } from "@tanstack/react-query";
import { MdOutlineDelete, MdPeople } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";



const AllUsers = () => {


  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
      return res.data;
    }
  })

  const handleMakeAdmin = user => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Good job!",
            text: `${user.name} is admin now`,
            icon: "success"
          });
        }
      })
  }


  const handleDeleteUser = user => {
    console.log(user);
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

        axiosSecure.delete(`/users/${user._id}`)
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


      <div className=" bg-slate-300 min-h-screen p-10">
        <div className="flex justify-between items-center  bg-slate-300  mx-auto mb-5">
          <h2 className="text-xl font-semibold">Total users: {users.length} </h2>

        </div>

        <div className="overflow-x-auto mx-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-orange-400">
              <tr className="text-base font-bold">
                <th>

                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {
                users.map((user, i) => <tr key={user._id}>
                  <th>
                    {i + 1}
                  </th>
                  <td>
                    {user.name}
                  </td>
                  <td className="font-semibold">
                    {user.email}

                  </td>
                  <td className="font-semibold">
                    {user.role === "admin" ? "Admin" : <button onClick={() => handleMakeAdmin(user)} className="btn btn-md bg-orange-500"><MdPeople className="text-xl text-white"></MdPeople></button>}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(user._id)} className="btn btn-md bg-red-600"><MdOutlineDelete className="text-xl text-white"></MdOutlineDelete></button>
                  </td>
                </tr>)
              }




            </tbody>



          </table>
        </div>

      </div>
    </div >
  );
};

export default AllUsers;