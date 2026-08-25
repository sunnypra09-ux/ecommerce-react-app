import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productAPI";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
