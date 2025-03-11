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
        <form onSubmit={handleLogin} className="w-full text-[16px]">
            <h1 className="text-2xl text-center font-bold mb-4">Đăng nhập</h1>
            <div className="mb-2">
                <label className="block" htmlFor="userName">Tài khoản</label>
                <input
                    type="text"
                    id="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên đăng nhập ..."
                    className="mt-1 h-10 block w-full p-2 border focus:border-[#FF8900] focus:outline-none rounded"
                />
            </div>
            <div className="mb-2">
                <label className="block" htmlFor="password">Mật khẩu</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="passWord"
                        value={formData.passWord}
                        onChange={handleInputChange}
                        placeholder="Nhập mật khẩu ..."
                        className="mt-1 h-10 block w-full p-2 border border-gray-300 rounded transition duration-200 ease-in-out focus:border-[#FF8900] focus:outline-none"
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 
                            <AiOutlineEyeInvisible className="w-5 h-5 opacity-50" /> : 
                            <AiOutlineEye className="w-5 h-5 opacity-50" />
                        }
                    </button>
                </div>
            </div>
            <a
                href="/forgot-password"
                className="text-[#FF8900] mt-2 flex items-center justify-center mb-1"
            >
                Bạn quên mật khẩu?
            </a>
            <button type="submit" className="h-12 w-full font-bold bg-[#FF8900] text-white py-2 rounded">
                Đăng nhập
            </button>
        </form>
    );
};

export default LoginForm;