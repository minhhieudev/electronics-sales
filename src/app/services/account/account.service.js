import SysFetch from "../fetch";

const AccountService = {
    getProfile: () => SysFetch.get(`api/accounts/detail`),
    updateProfile: (body) => SysFetch.put(`api/accounts/personal`, body),
    changePassword: (body) => SysFetch.put('api/accounts/update-password', body),
};

export default AccountService; 