import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdCancel, MdDownloadDone } from "react-icons/md";


const AcceptedAgreement = () => {

  const axiosSecure = useAxiosSecure();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments")
      return res.data;
    }
  })

  console.log(payments);

  return (
    <div className="p-7 bg-green-300 min-h-screen">
      <div className="flex justify-between">
        <Link to="/dashboard/userAgreeReq"><button className="font-medium px-3 py-2 bg-blue-500 rounded-md"><h2>Agreement request</h2></button></Link>
        <Link to="/dashboard/acceptedAgreement"><button className="font-medium px-3 py-2 bg-green-500 rounded-md"><h2>accepted</h2></button></Link>
        <Link to="/dashboard/rejectedAgreement"><button className="font-medium px-3 py-2 bg-red-400 rounded-md"><h2>rejected</h2></button></Link>

      </div>

      <div className="mt-10">
        <table className="table">
          <thead className="bg-blue-400">
            <tr className="text-base font-bold">

              <th>
                S/N
              </th>

              <th>User email</th>
              <th>Block</th>

              <th>Rent</th>
              <th> date</th>


            </tr>
          </thead>

          <tbody>
            {
              payments.map((data, i) => <tr key={data._id}>


                <th>
                  {i + 1}
                </th>

                <td className="font-semibold">
                  {data.reqEmail}

                </td>
                <td className="font-semibold">{data.blockName}</td>
                <td className="font-semibold">{data.rent}$</td>
                <td className="font-semibold">{data.date}</td>



              </tr>)
            }



          </tbody>
        </table>


      </div>
    </div>
  );
};

export default AcceptedAgreement;