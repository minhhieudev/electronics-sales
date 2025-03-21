import SysFetch from "../fetch";

const CategoryService = {
    getCategories: () => SysFetch.get(`api/categories`),
};

export default CategoryService;