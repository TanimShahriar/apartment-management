

const ApartmentCard = (items) => {
  const { apartmentImage } = items;
  return (
    <div className="flex gap-10 p-4 ">
      <h2>{items.length}</h2>
      <img src={apartmentImage} alt="" />
    </div>
  );
};

export default ApartmentCard;