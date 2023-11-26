

const AdminAnnouncement = () => {
  return (
    <div className=" min-h-screen p-5 pt-10" style={{ backgroundImage: 'url(https://i.ibb.co/LvXvn0f/announceq.jpg)' }}>
      <h2 className="text-center text-3xl  font-semibold pt-5 mb-10">Announcement page:</h2>

      <div className="">
        <div className=" leading-7 text-center"> <input type="text" name="" placeholder="Title" id="" className="border-b-2 w-2/3 mb-4 p-1 " />
          <textarea id="message" name="message" placeholder="Description"
            className="border-b-2 w-2/3  p-1 h-56 "></textarea>
          <button className=" bg-white block m-auto w-2/3  text-center border hover:bg-blue-500  py-1  text-lg font-bold ">Announce</button>


        </div>
      </div>
    </div>

  );
};

export default AdminAnnouncement;