
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";


const AllCoupons = () => {

  const { user } = useAuth();


  const axiosSecure = useAxiosSecure();
  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons")
      return res.data;
    }
  })

  console.log(coupons);




  return (
    <div>
      <div className="text-3xl font-bold mt-5 mb-3">coupons</div>
      <div className="flex justify-between  ">
        <div className="bg-blue-400 ">




          {/* All coupons*/}
          <h2 className="mt-5 text-center p-4 font-bold mb-2"><span className="text-white"> get  <span className="text-2xl font-bold text-green-700"> upto 50%</span> discount this winter</span></h2>



          <div className="overflow-x-auto mx-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-orange-400">
                <tr className="text-base font-bold">
                  <th>
                    s/n
                  </th>
                  <th>Coupon code</th>
                  <th>discount percentage</th>
                  <th>description</th>



                </tr>
              </thead>
              <tbody className="">
                {
                  coupons.map((user, i) => <tr key={user._id}>
                    <th>
                      {i + 1}
                    </th>
                    <td className="font-bold text-lg">
                      {user.couponCode}
                    </td>
                    <td className="font-semibold text-lg">
                      {user.discountPercentage}

                    </td>
                    <td className="font-medium text-sm">
                      {user.description}
                    </td>

                  </tr>)
                }




              </tbody>



            </table>
          </div>







        </div>
        <div>
          <img src="https://i.ibb.co/sFbBCMj/couponsss.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default AllCoupons;