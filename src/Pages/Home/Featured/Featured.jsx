

const Featured = () => {
  return (
    <div className="my-10">
      <h2 className="font-bold text-4xl mb-4">Featured Listings</h2>
      <div className="flex gap-4">
        <div className="">
          <img className="h-64 rounded-lg" src="https://i.ibb.co/g9J20WP/banner5.jpg" alt="" />
          <h2 className="font-bold">Apartment</h2>
          <p className="text-sm opacity-70">20 listings</p>
        </div>
        <div className="">
          <img className="h-64 rounded-lg" src="https://i.ibb.co/7WkLbnh/banner1.jpg" alt="" />
          <h2 className="font-bold">Compound</h2>
          <p className="text-sm opacity-70">8 listings</p>
        </div>
        <div className="">
          <img className="h-64 rounded-lg" src="https://i.ibb.co/yVxr6LL/banner4.jpg" alt="" />
          <h2 className="font-bold">full floor</h2>
          <p className="text-sm opacity-70">10 listings</p>
        </div>
        <div className="">
          <img className="h-64 rounded-lg" src="https://i.ibb.co/Sy1sdr6/banner2.jpg" alt="" />
          <h2 className="font-bold">whole building</h2>
          <p className="text-sm opacity-70">4 listings</p>
        </div>
        <div className="">
          <img className="h-64 rounded-lg" src="https://i.ibb.co/WG1Vts8/banner3.jpg" alt="" />
          <h2 className="font-bold">villa</h2>
          <p className="text-sm opacity-70">6 listings</p>
        </div>
        <div className="">
          <img className="h-64 rounded-lg" src="https://i.ibb.co/WxD0m82/banner7.jpg" alt="" />
          <h2 className="font-bold">penthouse</h2>
          <p className="text-sm opacity-70">1 listing</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;