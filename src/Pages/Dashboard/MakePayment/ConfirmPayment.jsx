import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";


const ConfirmPayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();



  const { data: member = [] } = useQuery({
    queryKey: ["member"],
    queryFn: async () => {
      const res = await axiosSecure.get("/members")
      return res.data;
    }
  })

  const confirmMail = member.filter(mail => mail.reqEmail == user.email);
  console.log(confirmMail);




  return (
    <div>

      {confirmMail.length > 0 ? <Link to="/dashboard/makePayment" ><button className="btn btn-primary">Confirm payment</button></Link> :

        <>
          <h2 className="text-center font-semibold">You don't have any apartment to make payment</h2>
          <hr />
          <img className="mx-auto" src="https://i.ibb.co/Y22Z4jP/dataNO.png" alt="" />
        </>

      }

      <hr />
    </div>
  );
};

export default ConfirmPayment;