import SysFetch from "../fetch";

const CategoryService = {
    getCategory: ({ search = "", page = 1, limit}) => 
        SysFetch.get(`api/categories`, {
            params: { search, page: page - 1, limit }
        }),
        postCategory: (data) => 
            SysFetch.post(`api/categories`, data),
        putCategory: (id, data) => 
            SysFetch.put(`api/categories?id=${id}`, data),
        deleteCategory: (id) => SysFetch.delete(`api/categories?id=${id}`),        
};

export default CategoryService;