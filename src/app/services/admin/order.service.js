import SysFetch from "../fetch";

const OrderService = {
    fetchOrders: (params = {}) => {
        if (params.page !== undefined) {
            params.page = params.page - 1;
        }
        
        return SysFetch.get(`api/orders`, { params });
    },
    fetchOrderById:(id) => SysFetch.get(`api/orders/details?id=${id}`),
    patchOrder : (data) => SysFetch.patch(`api/orders`,data)

}

export default OrderService;