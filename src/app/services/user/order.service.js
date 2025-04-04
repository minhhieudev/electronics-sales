import SysFetch from "../fetch";

const OrderService = {
    getOrders: (params) => SysFetch.get(`api/orders`, { params }),
    getOrderDetail: (id) => SysFetch.get(`api/orders/details?id=${id}`),
    createOrder: (orderData) => SysFetch.post(`api/orders`, orderData),
    updateOrder: (orderData) => SysFetch.patch(`api/orders`, orderData)
};

export default OrderService; 
