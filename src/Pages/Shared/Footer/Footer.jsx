import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="mt-5">
      <div className="flex">
        <div className="bg-[#1F2937] text-white w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-center mb-2">Contact Us</h2>
          <p className="text-center">123 ABS Street, Uni 21, Bangladesh </p>
          <p className="text-center">+88 123456789</p>
          <p className="text-center">Mon - Fri: 08:00 - 22:00</p>
          <p className="text-center"> Sat - Sun: 10:00 - 23:00</p>
        </div>
        <div className="bg-[#111827] w-1/2 p-4 text-white">
          <h2 className="text-2xl font-semibold text-center mb-2">Follow Us</h2>
          <p className="text-center">Join us on social media</p>
          <div className="flex justify-center gap-2 mt-4">
            <BiLogoFacebook className="text-3xl" ></BiLogoFacebook>
            <BiLogoTwitter className="text-3xl" ></BiLogoTwitter>
            <BiLogoInstagram className="text-3xl" ></BiLogoInstagram>
          </div>
        </div>
      </div>
      <div className="bg-black p-2">
        <h2 className="text-slate-400 text-center font-medium">Copyright © CulinaryCloud. All rights reserved.</h2>
      </div>
    </div>
  );
};

export default Footer;

//BiLogoFacebook  BiLogoTwitter  BiLogoInstagram