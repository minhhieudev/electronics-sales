import SysFetch from "../fetch";

const CartService = {
    getUserCart: () => SysFetch.get(`api/carts`),
    addProductToCart: (productData) => SysFetch.post(`api/carts`, productData),
    updateProductInCart: (updateData) => SysFetch.patch(`api/carts`, updateData),
    removeProductFromCart: (data) => SysFetch.delete(`api/carts`, { data })
};

export default CartService; 
