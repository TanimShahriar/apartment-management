
import useApartments from "../../Hooks/useApartments";
import ApartmentCard from "../ApartmentCard/ApartmentCard";



const Apartment = () => {
  const [apartment] = useApartments();
  console.log(apartment)
  
  return (
    <div className="grid lg:grid-cols-5 gap-4 pt-20 ">
      {
        apartment.map(items => <ApartmentCard key={items._id} card={items}></ApartmentCard>)
      }

    </div>
  );
};

export default Apartment;
