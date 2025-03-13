import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAction } from "../../app/redux/slices/auth.slice";
import MESSAGES from "../../common/const";

const LoginForm = () => {
    const [formData, setFormData] = useState({ userName: '', passWord: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

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

        await dispatch(loginAction({
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
        })).unwrap();
    };

    return (
        <form onSubmit={handleLogin} className="w-full">
            <h1 className="text-xl text-center font-bold mb-4">Đăng nhập</h1>
            
            <div className="mb-3">
                <label className="block text-xs font-semibold mb-1" htmlFor="userName">
                    Tài khoản
                </label>
                <input
                    type="text"
                    id="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên đăng nhập ..."
                    className="h-9 w-full px-3 py-2 border rounded-md focus:border-[#FF8900] focus:outline-none text-xs"
                />
            </div>

            <div className="mb-3">
                <label className="block text-xs font-semibold mb-1" htmlFor="passWord">
                    Mật khẩu
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="passWord"
                        value={formData.passWord}
                        onChange={handleInputChange}
                        placeholder="Nhập mật khẩu ..."
                        className="h-9 w-full px-3 py-2 border rounded-md focus:border-[#FF8900] focus:outline-none text-xs"
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 
                            <AiOutlineEyeInvisible className="w-4 h-4 text-gray-400" /> : 
                            <AiOutlineEye className="w-4 h-4 text-gray-400" />
                        }
                    </button>
                </div>
            </div>

            <a href="/forgot-password" className="block text-center text-[#FF8900] text-xs font-semibold mb-3">
                Bạn quên mật khẩu?
            </a>

            <button type="submit" className="w-full h-9 bg-[#FF8900] text-white font-bold rounded-md text-sm hover:bg-[#ff9920] transition-colors">
                Đăng nhập
            </button>
        </form>
    );
};

export default LoginForm;