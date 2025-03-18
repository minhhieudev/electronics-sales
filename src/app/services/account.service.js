import SysFetch from "./fetch";

const AccountService = {
    getAccount: ({ search = "", page = 1, limit = 6 }) => 
        SysFetch.get(`api/accounts`, {
            params: { search, page: page - 1, limit }
        }),
    getAccountById: (id) => SysFetch.get(`api/accounts/detail?id=${id}`),
    deleteAccount: (id) => SysFetch.delete(`api/accounts?id=${id}`),
};

export default AccountService;
