import { Helmet } from "react-helmet-async";
import Banner from "../../Banner/Banner";


import Testimonial from "../Testimonial/Testimonial";
import About from "../About/About";
import Featured from "../Featured/Featured";


const Home = () => {
  return (
    <div>
      <Helmet>
        <title>The Hill | Home</title>
      </Helmet>
      <Banner></Banner>
      <About></About>
      <Featured></Featured>
    </div>
  );
};

export default Home;