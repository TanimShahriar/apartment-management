import { Helmet } from "react-helmet-async";
import Banner from "../../Banner/Banner";


import Testimonial from "../Testimonial/Testimonial";
import About from "../About/About";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>The Hill | Home</title>
      </Helmet>
      <Banner></Banner>
      <About></About>

    </div>
  );
};

export default Home;