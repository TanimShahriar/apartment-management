import { useEffect, useState } from "react";


const useApartments = () => {
  const [apartment, setApartment] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("http://localhost:5000/apartments")
      .then(res => res.json())
      .then(data => {
        setApartment(data)
        setLoading(false)
      });
  }, [])
  return [apartment, loading]
}

export default useApartments;