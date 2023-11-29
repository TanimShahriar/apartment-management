import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

//ad publishable key in loadStripe
const stripePromise = loadStripe(import.meta.env.VITE_PK_Key);



const MakePayment = () => {
  return (
    <div>
      <div className="min-h-screen pt-5 bg-slate-300">
        <h2 className="text-center text-3xl  font-bold mb-10">Please pay your rent</h2>
        <Elements stripe={stripePromise}>
          <PaymentForm></PaymentForm>
        </Elements>
      </div>

    </div>
  );
};

export default MakePayment;