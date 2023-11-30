import { MdArrowForward, MdHome, MdMoney, MdPhoto, MdRealEstateAgent } from "react-icons/md";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-10 ">
      <h2 className="text-3xl font-bold mb-5">About us</h2>
      <div className=" flex gap-10 items-center">

        <div className=" w-2/3">
          <div className="flex gap-5">
            <div className="h-[500px]"><img className=' rounded-lg' src="https://i.ibb.co/0Vy2NVg/about1.jpg" /></div>
            <div className="h-[500px]">  <img className=' rounded-lg' src="https://i.ibb.co/QCDLFJy/beach-chair-resort.jpg" /></div>
            <div className="h-[500px]"><img className=' rounded-lg' src="https://i.ibb.co/H2s2WxW/about2.jpg" /></div>

          </div>
        </div>
        <div className=" space-y-5 w-1/3">
          <h2 className="text-4xl font-semibold w-66">Find your new home with us</h2>
          <p className="text-lg">With over $2 Billion in sales, Our agency is the industry’s top luxury producer with over 27 years of experience.</p>
          <div className="flex items-center  gap-5 ">
            <div className="flex items-center gap-2">
              <MdRealEstateAgent className="text-blue-500 text-2xl"></MdRealEstateAgent>
              <h2>Rent</h2>
            </div>
            <div className="flex items-center gap-2">
              <MdHome className="text-blue-500 text-2xl"></MdHome>
              <h2>Sell</h2>
            </div>

          </div>
          <div className="flex items-center  gap-5 ">
            <div className="flex items-center gap-2">
              <MdMoney className="text-blue-500 text-2xl"></MdMoney>
              <h2>Buy</h2>
            </div>
            <div className="flex items-center gap-2">
              <MdPhoto className="text-blue-500 text-2xl"></MdPhoto>
              <h2>Photo</h2>
            </div>

          </div>
          <Link to="moreAbout"> <button className="px-2 flex items-center gap-1 mt-4 py-1 font-medium bg-blue-500 text-white rounded-md">More About Us<MdArrowForward></MdArrowForward> </button></Link>
        </div>
      </div>
    </div>
  );
};

export default About;