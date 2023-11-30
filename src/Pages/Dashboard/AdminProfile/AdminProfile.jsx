import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AdminProfile = () => {

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user.email)



  const { data: apartments = [] } = useQuery({
    queryKey: ["apartments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartments")
      return res.data;
    }
  })

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
      return res.data;
    }
  })

  console.log(apartments);

  const roleMember = users.filter(card => card.role == "member")
  const roleUser = users.filter(card => card.role == "user")
  console.log(roleMember.length)


  return (
    <div className="min-h-screen pt-5 bg-gray-100 opacity-80">

      <div className="flex  gap-2 items-center ml-5 p-2">
        <div className="">
          <img className="h-11 w-11 rounded-full" src={user.photoURL} alt="" />
        </div>
        <div>
          <h2 className="text-sm">{user.email}</h2>
          <h2 className="text-sm"><span className="font-bold">admin</span>: {user.displayName}</h2>
        </div>
      </div>
      <div className="flex items-center p-4 mt-10">
        <div className="flex flex-col max-w-7xl w-full md:w-[70%]">
          <div className="flex flex-col lg:flex-row ">
            <div className="bg-white shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2">
              <div className="flex items-center justify-start w-full">
                <div className="flex-col w-[85%]">
                  <div className="text-sm font-medium text-violet-600 my-2">Total Rooms</div>
                  <div className="className flex items-center">
                    <div className="text-3xl font-bold text-gray-700">{apartments.length}</div>
                    <div className="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium ">
                    </div>
                  </div>
                  <div className="w-full h-1 rounded bg-gray-300 my-1">
                    <div className="w-[78%] h-1 rounded bg-green-500"></div>
                  </div>
                  <div className="text-xs font-medium text-gray-400 ">Weekly Goal</div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2">
              <div className="flex items-center justify-start w-full">
                <div className="flex-col w-[85%]">
                  <div className="text-sm font-medium text-violet-600 my-2">Available rooms</div>
                  <div className="className flex items-center">
                    <div className="text-3xl font-bold text-gray-700">{apartments.length * 100 / 20}%</div>
                    <div className="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-red-500 font-medium ">
                      <div className="text-xs bg-red-200 px-2 rounded-lg">- 7%</div>
                    </div>
                  </div>
                  <div className="w-full h-1 rounded bg-gray-300 my-1">
                    <div className="w-[33%] h-1 rounded bg-red-500"></div>
                  </div>
                  <div className="text-xs font-medium text-gray-400 ">Daily Goal</div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex gap-2">

            <div className="bg-white shadow-lg rounded-xl flex items-start h-32  lg:w-full justify-center py-4 px-8 mx-4 my-2">
              <div className="flex items-center justify-start w-full">
                <div className="flex-col w-[85%]">
                  <div className="text-sm font-medium text-violet-600 my-2">booked room</div>
                  <div className="className flex items-center">
                    <div className="text-3xl font-bold text-gray-700">{apartments.length - 20}</div>
                    <div className="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium ">
                    </div>
                  </div>
                  <div className="w-full h-1 rounded bg-gray-300 my-1">
                    <div className="w-[78%] h-1 rounded bg-green-500"></div>
                  </div>
                  <div className="text-xs font-medium text-gray-400 ">Weekly Goal</div>
                </div>
              </div>
            </div>






          </div>

          <div className="flex flex-col lg:flex-row ">
            <div className="bg-white shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2">
              <div className="flex items-center justify-start w-full">
                <div className="flex-col w-[85%]">
                  <div className="text-sm font-medium text-violet-600 my-2">Total members</div>
                  <div className="className flex items-center">
                    <div className="text-3xl font-bold text-gray-700">{roleMember.length}</div>
                    <div className="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-green-500 font-medium ">
                    </div>
                  </div>
                  <div className="w-full h-1 rounded bg-gray-300 my-1">
                    <div className="w-[78%] h-1 rounded bg-green-500"></div>
                  </div>
                  <div className="text-xs font-medium text-gray-400 ">Weekly Goal</div>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-xl flex items-start h-32 w-[90%] lg:w-1/2 justify-center py-4 px-8 mx-4 my-2">
              <div className="flex items-center justify-start w-full">
                <div className="flex-col w-[85%]">
                  <div className="text-sm font-medium text-violet-600 my-2">Total user</div>
                  <div className="className flex items-center">
                    <div className="text-3xl font-bold text-gray-700">{roleUser.length}</div>
                    <div className="flex items-center justify-between mx-2 px-0.5 py-0.5 rounded-xl text-red-500 font-medium ">

                    </div>
                  </div>
                  <div className="w-full h-1 rounded bg-gray-300 my-1">
                    <div className="w-[33%] h-1 rounded bg-red-500"></div>
                  </div>
                  <div className="text-xs font-medium text-gray-400 ">Daily Goal</div>
                </div>
              </div>
            </div>

          </div>





        </div>


      </div>


    </div>
  );
};

export default AdminProfile;