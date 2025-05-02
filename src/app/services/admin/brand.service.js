import SysFetch from "../fetch";

const BrandService = {
    getBrand: ({ search = "", page = 1, limit}) => 
        SysFetch.get(`api/brands`, {
            params: { search, page: page - 1, limit }
        }), 
    postBrand: (data) => SysFetch.post(`api/brands`,data),
    putBrand: (id,data) => 
        SysFetch.put(`api/brands?id=${id}`, data),
    deleteBrand: (id) => SysFetch.delete(`api/brands?id=${id}`),
};

export default BrandService;