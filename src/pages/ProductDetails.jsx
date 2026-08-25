import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/productAPI";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    data: Product,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if(isLoading){
    
  }
  

  return <div>ProductDetails {id}</div>;
};

export default ProductDetails;
