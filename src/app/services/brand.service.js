import SysFetch from "./fetch";

const BrandService = {
    getBrand: ({ search = "", page = 1, limit = 6 }) => 
        SysFetch.get(`api/brands`, {
            params: { search, page: page - 1, limit }
        }), 
    postBrand: (data) => SysFetch.post(`api/brands`,data)   
};



export default BrandService;