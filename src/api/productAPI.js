import axios from "axios";

const productAPI = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProducts = async () => {
  const { data } = await productAPI.get("/products?limit=194");
  return data.products;
};
