import { createSlice } from "@reduxjs/toolkit";

const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const initialState = {
  Orders: savedOrders,
};

const saveOrders = (orders) => {
  localStorage.setItem("orders", JSON.stringify(orders));
};

const getOrderStatus = (date) => {
  const created = new Date(date).getTime();
  const now = Date.now();

  const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));

  if (diffDays >= 2) {
    return "Delivered";
  }

  if (diffDays >= 1) {
    return "Shipped";
  }

  return "Processing";
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    addOrder: (state, action) => {
      state.Orders.push(action.payload);
      saveOrders(state.Orders);
    },

    updateOrderStatuses: (state) => {
      state.Orders.forEach((order) => {
        if (order.orderStatus !== "Cancelled") {
          order.orderStatus = getOrderStatus(order.orderDate);
        }
        if (
          order.orderStatus === "Delivered" &&
          order.paymentMethod === "cod"
        ) {
          order.paymentStatus = "Paid";
        }
      });
      saveOrders(state.Orders);
    },

    cancelOrder: (state, action) => {
      const { orderId } = action.payload;
      const order = state.Orders.find((order) => order.id === orderId);

      if (order && order.orderStatus === "Processing") {
        order.orderStatus = "Cancelled";
        order.cancelDate = new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        });

        if (order.paymentMethod === "cod") {
          order.paymentStatus = "Not Paid";
        } else {
          order.paymentStatus = "Refunded";
        }
      }
      saveOrders(state.Orders);
    },
  },
});

export const { updateOrderStatuses, addOrder, cancelOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
