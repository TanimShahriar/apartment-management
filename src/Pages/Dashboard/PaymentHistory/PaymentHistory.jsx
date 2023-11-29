import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const PaymentHistory = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`)
      return res.data;
    }
  })

  const spareEmail = payments.filter(card => card.reqEmail == user.email);
  console.log(spareEmail);


  return (
    <div className="">


      <div className=" bg-slate-300 min-h-screen p-10">
        <div className="flex justify-between items-center  bg-slate-300  mx-auto mb-5">
          <h2 className="text-xl font-semibold">Total payment: {spareEmail.length} </h2>

        </div>

        <div className="overflow-x-auto mx-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-orange-400">
              <tr className="text-base font-bold">
                <th>

                </th>
                <th>Date</th>
                <th>Transaction id</th>


              </tr>
            </thead>
            <tbody>
              {
                spareEmail.map((data, i) => <tr key={data._id}>
                  <th>
                    {i + 1}
                  </th>
                  <td>
                    {data.date}
                  </td>
                  <td className="font-semibold">
                    {data.transactionId}

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

export default PaymentHistory;