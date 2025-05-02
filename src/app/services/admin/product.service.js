import SysFetch from "../fetch";

const ProductService = {
    fetchProduct: (params = {}) => {
        if (params.page !== undefined) {
            params.page = params.page - 1;
        }
        
        return SysFetch.get(`api/products`, { params });
    },
    postProduct: (data) => SysFetch.post(`api/products`, data),
    fetchProductById:(id) => SysFetch.get(`api/products/details?id=${id}`),
    putProduct: (id,data) => SysFetch.put(`api/products?id=${id}`,data),
    deleteProduct: (id) => SysFetch.delete(`api/products?id=${id}`)
};

export default ProductService;