import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAgreement = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreement?email=${user.email}`);
      return res.data;
    }
  })
  return [cart, refetch];
};

export default useAgreement;