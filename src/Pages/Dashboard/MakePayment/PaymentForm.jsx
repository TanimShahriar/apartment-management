import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";




const PaymentForm = () => {
  // const { agreementDate, apartmentId, apartmentImage, apartmentNo, blockName, floorNo, rent, reqEmail, reqName, status, _id } = data;


  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [successCoupon, setSuccessCoupon] = useState('')
  const [couponError, setCouponError] = useState('')
  const [discoutAmount, setdiscountAmount] = useState(0);
  const [paymentMonth, setPaymentMonth] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();



  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();





  const { data: member = [] } = useQuery({
    queryKey: ["member"],
    queryFn: async () => {
      const res = await axiosSecure.get("/members")
      return res.data;
    }
  })



  const agreementData = member.find(item => item.reqEmail == user.email)
  const { reqEmail, apartmentNo, blockName, floorNo, rent, acceptDate, _id } = agreementData;
  console.log(agreementData);





  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons")
      return res.data;
    }
  })


  const couponPercent = coupons.find(item => item.discountPercentage)
  const { discountPercentage } = couponPercent;

  console.log(coupons);

  const finalAmount = rent - discoutAmount;
  console.log(finalAmount);


  const handleCoupon = e => {
    e.preventDefault();
    const form = e.target;
    const month = form.month.value;
    const coupon = form.coupon.value;
    setPaymentMonth(month);


    const matchCoupon = coupons.find(item => item.couponCode == coupon);
    console.log(matchCoupon);



    if (matchCoupon) {
      setCouponError('');
      setSuccessCoupon(`coupon is accepted, you got ${matchCoupon.discountPercentage} % discount`)
      const totalDiscount = (rent * matchCoupon.discountPercentage) / 100;
      console.log(totalDiscount);
      setdiscountAmount(totalDiscount);
    }

    else {
      setCouponError("Coupon invaild")
    }
  }



  // const totalPrice = member.reduce((total, item) => total + item.rent, 0)
  // console.log(totalPrice);

  useEffect(() => {
    if (finalAmount > 0 && finalAmount !== isNaN) {
      axiosSecure.post('/create-payment-intent', { price: finalAmount })
        .then(res => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
    }

  }, [axiosSecure, finalAmount])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    }

    else {
      console.log("payment method", paymentMethod);
      setError("")
    }


    // confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    })

    if (confirmError) {
      console.log("confirm error")
    }
    else {
      console.log("payment intent", paymentIntent)
      if (paymentIntent.status == "succeeded") {
        console.log("transaction id", paymentIntent.id)
        setTransactionId(paymentIntent.id)

        //saving payment details in db
        const payment = {
          reqEmail, apartmentNo, blockName, floorNo, rent, paymentMonth, discountPercentage,
          email: user.email,
          price: finalAmount,

          transactionId: paymentIntent.id,
          date: new Date(),
          agreementIds: member.map(item => item._id),
          apartmentIds: member.map(item => item.apartmentId),
          status: 'pending'
        }

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);

        if (res.data.paymentResult.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "Payment successful!",
            icon: "success"
          });
        }


        axiosSecure.delete(`/members/${_id}`)
          .then(res => {
            console.log(res);
          })


        axiosSecure.delete(`/apartments/${apartmentNo}`)
          .then(res => {
            console.log(res);
          })

      }
      navigate("/dashboard/paymentHistory")
    }

  }
  return (
    <div>

      <div>

        <form className="p-5">

          <div className="md:flex gap-5 mb-5 ">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="">

                <input type="text" readOnly placeholder="Email" name="name" defaultValue={reqEmail} className="input input-bordered w-72 lg:w-full" />
              </label>
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Floor number</span>
              </label>
              <label className="">

                <input type="text" readOnly placeholder="Assignment Description" name="description" defaultValue={floorNo} className="input input-bordered w-72 lg:w-full" />
              </label>
            </div>
          </div>
          {/* supplier and taste row  */}
          <div className="md:flex gap-5 mb-5">
            <div className="form-control w-1/2">
              <label className="label"><span className="label-text">Block name</span></label>

              <label className=""><input type="text" readOnly placeholder="Marks" name="marks" defaultValue={blockName} className="input input-bordered w-72 lg:w-full" />

              </label>

            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Apartment no</span>
              </label>
              <label className="">

                <input type="text" readOnly placeholder="Thumbnail URL" name="url" defaultValue={apartmentNo} className="input input-bordered w-72 lg:w-full" />
              </label>
            </div>
          </div>
          {/* category and details row*/}
          <div className="md:flex gap-5 mb-5">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">rent</span>
              </label>
              <label className="">

                <input type="text" readOnly placeholder="Difficulty Level" name="level" defaultValue={rent} className="input input-bordered w-72 lg:w-full" />
              </label>
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <label className="">

                <input name="date" readOnly defaultValue={acceptDate} className="input input-bordered w-72 lg:w-full" />
              </label>
            </div>
          </div>


        </form>



        <div className="flex justify-between items-center ">



          <div className=" gap-10 p-5 ">


            <form className="form-controll" onSubmit={handleCoupon}>
              <div className="w-[300px]">
                <label className="label">
                  <span className="label-text text-lg font-semibold">rent month</span>
                </label>

                <select className="w-[450px] h-12 rounded-lg" type="text" required placeholder="Difficulty Level" name="month"  >
                  <option>january</option>
                  <option>february</option>
                  <option>march</option>
                  <option>april</option>
                  <option>may</option>
                  <option>june</option>
                  <option>july</option>
                  <option>august</option>
                  <option>september</option>
                  <option>october</option>
                  <option>november</option>
                  <option>december</option>
                </select>
              </div>

              <div className="form-control mt-2 w-[450px]">
                <label className="label">
                  <span className="label-text">coupon</span>
                </label>
                <label className="">

                  <input name="coupon" placeholder="coupon" className="input input-bordered w-72 lg:w-full" />
                </label>
              </div>
              <input className="btn btn-primary mt-8 w-[450px]" type="submit" value="Get discount" />




              <p className="text-red-700 ml-2 mt-3 font-semibold">{couponError}</p>
              <p className="text-green-700 ml-2 mt-3 font-semibold">{successCoupon}</p>
            </form>




            <form onSubmit={handleSubmit} className=" w-[450px] border bg-blue-400 h-48 rounded-md mt-5  p-2  hover:shadow-lg hover:transform hover:scale-100 duration-500 ease-in-out ">
              <CardElement

              />
              <button className=" w-full mt-10 px-3 py-1 bg-green-600 rounded-md font-semibold " type="submit" disabled={!stripe}>
                Pay
              </button>
              <p className="text-red-700 ml-8 mt-3 font-semibold">{error}</p>
              {transactionId && <p className="text-purple-700  font-semibold">your transaction id: {transactionId}</p>}

            </form>
          </div>


          <div className="border border-blue-500 p-4 mr-5 rounded-lg w-1/2">
            <div className="form-control  ">
              <label className="label">
                <span className="label-text">price</span>
              </label>
              <label className="">

                <input type="text" readOnly name="name" defaultValue={rent} className="input input-bordered w-72 lg:w-full" />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">discount percent</span>
              </label>
              <label className="">

                <input type="text" readOnly placeholder="Assignment Description" name="description" defaultValue={14} className="input input-bordered w-72 lg:w-full" />
              </label>
            </div>


          </div>

        </div>


      </div>
    </div>

  );
};

export default PaymentForm;