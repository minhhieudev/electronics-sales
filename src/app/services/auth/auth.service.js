import axios from "axios";
import CONST from "../../redux/const";

const AuthService = {
  login: ({ body }) => axios.post(`${CONST.URL.API}api/auth/login`, body), 
  register: (body) => axios.post(`${CONST.URL.API}api/auth/register`, body), 
};

export default AuthService;