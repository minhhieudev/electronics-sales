import SysFetch from "./fetch";

const CategoryService = {
    getCategory: ({ search = "", page = 1, limit = 6 }) => 
        SysFetch.get(`api/categories`, {
            params: { search, page: page - 1, limit }
        }),
        postCategory: (data) => 
            SysFetch.post(`api/categories`, data)
};



export default CategoryService;