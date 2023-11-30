import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Announcement = () => {


  const { user } = useAuth();


  const axiosSecure = useAxiosSecure();
  const { data: adminAnnouncement = [], refetch } = useQuery({
    queryKey: ["adminAnnouncement"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adminAnnouncement")
      return res.data;
    }
  })




  return (
    <div>
      <Helmet>
        <title>Dashboard | Announcement</title>
      </Helmet>
      <h2 className="ml-5 font-semibold">Annoncement by the owner:</h2>
      <div className="grid grid-cols-3 gap-2 mt-5 p-4">
        {
          adminAnnouncement.map(data => <div key={data._id} className=" border border-blue-700 p-4 rounded-lg ">

            <div className="">
              <h2 className="card-title">{data.title}</h2>
              <p className="text-sm">{data.description}</p>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default Announcement;