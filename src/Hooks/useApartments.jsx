
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useApartments = () => {



  const axiosSecure = useAxiosSecure();
  const { data: apartment = [], refetch } = useQuery({
    queryKey: ["apartment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartments")
      return res.data;
    }
  })


  return [apartment, refetch]
}

export default useApartments;