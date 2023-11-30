import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useState } from "react";


const PaymentHistory = () => {
  const [dataSearch, setDataSearch] = useState('');

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`)
      return res.data;
    }
  })




  console.log(payments);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    console.log(search);
    setDataSearch(search);

  }

  console.log(dataSearch)


  return (
    <div className="bg-slate-300 min-h-screen p-10">

      <div className="flex justify-end">
        <form onSubmit={handleSearch} className="form-control">
          <div className="input-group">
            <input type="search" name="search" placeholder="month" className="input input-bordered" />
            <button className="btn btn-square">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </form>
      </div>


      <div className=" ">
        <div className="flex justify-between items-center  bg-slate-300  mx-auto mb-5">
          <h2 className="text-xl font-semibold">Total payment: {payments.length} </h2>

        </div>

        <div className="overflow-x-auto mx-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-orange-400">
              <tr className="text-base font-bold">
                <th>
                  s/n
                </th>
                <th>Month</th>
                <th>Date</th>
                <th>Transaction id</th>


              </tr>
            </thead>
            <tbody>
              {
                payments.filter((card) => { return dataSearch.toLowerCase() == '' ? card : card.paymentMonth == dataSearch.toLowerCase() }).map((data, i) => <tr key={data._id}>
                  <th>
                    {i + 1}
                  </th>
                  <td>
                    {data.paymentMonth}
                  </td>
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