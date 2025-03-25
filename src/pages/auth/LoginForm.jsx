import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAction } from "../../app/redux/slices/auth.slice";
import MESSAGES from "../../common/const";

const LoginForm = ({ prefilledUsername = '' }) => {
    const DEFAULT_USERNAME = "hieu20";  // tài khoản mặc định
    const DEFAULT_PASSWORD = "123"; // mật khẩu mặc định

    const [formData, setFormData] = useState({
        userName: prefilledUsername || DEFAULT_USERNAME, // Nếu không có prefilledUsername thì dùng DEFAULT_USERNAME
        passWord: DEFAULT_PASSWORD
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (prefilledUsername) {
        setFormData(prev => ({
            ...prev,
                userName: prefilledUsername,
                passWord: '' // Reset password khi có prefilledUsername
        }));
        }
    }, [prefilledUsername]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.passWord) {
            toast.error(MESSAGES.FIELDS_REQUIRED);
            return;
        }

        dispatch(loginAction({
            body: {
                userName: formData.userName,
                password: formData.passWord
            },
            onSuccess: (data) => {
                toast.dismiss();
                // Check role
                if (data.role === true) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        }));
    };

    return (
        <form onSubmit={handleLogin} className="w-full">
            <h1 className="text-base text-center font-bold mb-3">Đăng nhập</h1>

            <div className="mb-2">
                <label className="block text-[11px] font-semibold mb-1" htmlFor="userName">
                    Tài khoản
                </label>
                <input
                    type="text"
                    id="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên đăng nhập ..."
                    className="h-8 w-full px-3 py-1 border rounded-md focus:border-[#FF8900] focus:outline-none text-[11px]"
                />
            </div>

            <div className="mb-2">
                <label className="block text-[11px] font-semibold mb-1" htmlFor="passWord">
                    Mật khẩu
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="passWord"
                        value={formData.passWord}
                        onChange={handleInputChange}
                        placeholder="Nhập mật khẩu ..."
                        className="h-8 w-full px-2 py-1 border rounded-md focus:border-[#FF8900] focus:outline-none text-[11px]"
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ?
                            <AiOutlineEyeInvisible className="w-3.5 h-3.5 text-gray-400" /> :
                            <AiOutlineEye className="w-3.5 h-3.5 text-gray-400" />
                        }
                    </button>
                </div>
            </div>

            <a href="/forgot-password" className="block text-center text-[#FF8900] text-[11px] font-semibold mb-3">
                Bạn quên mật khẩu?
            </a>

            <button type="submit" className="w-full h-8 bg-[#FF8900] text-white font-bold rounded-md text-xs hover:bg-[#ff9920] transition-colors">
                Đăng nhập
            </button>
        </form>
    );
};

export default LoginForm;