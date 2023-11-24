import useApartments from "../../Hooks/useApartments";



const Apartment = () => {
  const [apartment] = useApartments();
  console.log(apartment)
  return (
    <div className="grid lg:grid-cols-3 gap-2 pt-20 ">
      {
        apartment.map(items => <div key={items._id}>
          <div className="rounded-lg bg-[#68f37f] p-2  shadow-lg drop-shadow-md shadow-current  h-auto  hover:shadow-lg hover:transform hover:scale-105 duration-500 ease-in-out">
            <img className="h-[300px] w-full" src={items.apartmentImage} alt="" />
            <p className=" mx-4 mb-2 mt-2 font-medium text-xl">Block: {items.blockName}</p>
            <p className=" mx-4 my-1 font-semibold text-lg">Price: {items.rent}$</p>
          </div>
        </div>)
      }

    </div>
  );
};

export default Apartment;
