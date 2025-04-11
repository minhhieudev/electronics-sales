import SysFetch from "../fetch";

const ProductService = {
    getProducts: (params) => SysFetch.get('api/products', { params }),
    getProductDetail: (id) => SysFetch.get(`api/products/details?id=${id}`)
};

export default ProductService;
