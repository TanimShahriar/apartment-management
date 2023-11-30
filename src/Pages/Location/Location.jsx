

const Location = () => {
  return (
    <div className="mb-2">
      <h2 className="text-center text-2xl font-bold mb-5">get in touch</h2>



      <div className="flex  items-center justify-between ">

        <div className="text-gray-800 m-4 items-start border-slate-400 rounded-lg w-1/2 border p-10  space-y-3">
          <div className="text-xl  font-medium">Send us message</div>
          <input placeholder="Enter your Name" className="border border-gray-400 rounded px-2 py-1 block  w-full" />
          <input placeholder="Enter a valid Email address" className="border border-gray-400 rounded py-1 px-2 block w-full " />
          <textarea placeholder="Enter your message" type="text" className="border border-gray-400 rounded py-1 px-2 block w-full h-36"></textarea>
          <button className="text-white px-4 rounded font-medium hover:bg-yellow-600  py-1 bg-yellow-500">Send  Message</button>
        </div>


        <div className="w-1/2">
          <img src="https://i.ibb.co/3719jx3/1ss.png" alt="" />
        </div>
      </div>




    </div>
  );
};

export default Location;