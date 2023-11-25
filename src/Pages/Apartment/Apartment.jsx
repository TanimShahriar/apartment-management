
import { Helmet } from "react-helmet-async";
import useApartments from "../../Hooks/useApartments";
import ApartmentCard from "../ApartmentCard/ApartmentCard";



const Apartment = () => {
  const [apartment] = useApartments();
  console.log(apartment)

  return (
    <>
      <Helmet>
        <title>The Hill | Apartment</title>
      </Helmet>

      <div className="grid lg:grid-cols-5 gap-4 pt-20 ">
        {
          apartment.map(items => <ApartmentCard key={items._id} card={items}></ApartmentCard>)
        }

      </div>

    </>
  );
};

export default Apartment;
