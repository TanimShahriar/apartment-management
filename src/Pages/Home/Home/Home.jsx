import { Helmet } from "react-helmet-async";
import Banner from "../../Banner/Banner";


import Testimonial from "../Testimonial/Testimonial";
import About from "../About/About";
import Featured from "../Featured/Featured";
import AllCoupons from "../../Dashboard/Coupons/AllCoupons";
import Location from "../../Location/Location";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>The Hill | Home</title>
      </Helmet>
      <Banner></Banner>
      <AllCoupons></AllCoupons>
      <About></About>
      <Featured></Featured>
      <Location></Location>
    </div>
  );
};

export default Home;