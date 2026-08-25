import { useSelector } from "react-redux";

export const useOrder = () => {
  const order = useSelector((state) => state.order.Orders);
  return order;
};
