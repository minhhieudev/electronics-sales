import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerAction } from "../../app/redux/slices/auth.slice";
import MESSAGES from "../../common/const";

const RegisterForm = () => {
    const [formData, setFormData] = useState({ userName: '', passWord: '', confirmPassword: '', fullName: '' });
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!formData.userName || !formData.passWord || !formData.confirmPassword || !formData.fullName) {
            toast.error(MESSAGES.FIELDS_REQUIRED);
            return;
        }
        if (formData.passWord !== formData.confirmPassword) {
            setPasswordError(MESSAGES.PASSWORD_MISMATCH);
            return;
        }
        setPasswordError('');

        await dispatch(registerAction({
            body: {
                userName: formData.userName,
                password: formData.passWord,
                fullName: formData.fullName
            }
        })).unwrap();
    };

    return (
        <form onSubmit={handleRegister} className="w-full">
            <h1 className="text-xl text-center font-bold mb-4">Đăng ký</h1>
            
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
                <label className="block text-xs font-semibold mb-1" htmlFor="fullName">
                    Họ và tên
                </label>
                <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên ..."
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

            <div className="mb-3">
                <label className="block text-xs font-semibold mb-1" htmlFor="confirmPassword">
                    Xác nhận mật khẩu
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Nhập lại mật khẩu ..."
                        className={`h-9 w-full px-3 py-2 border rounded-md focus:border-[#FF8900] focus:outline-none text-xs ${
                            passwordError ? 'border-red-500' : ''
                        }`}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ?
                            <AiOutlineEyeInvisible className="w-4 h-4 text-gray-400" /> :
                            <AiOutlineEye className="w-4 h-4 text-gray-400" />
                        }
                    </button>
                </div>
                {passwordError && (
                    <p className="text-red-500 text-[10px] mt-1">{passwordError}</p>
                )}
            </div>

            <button type="submit" className="w-full h-9 bg-[#FF8900] text-white font-bold rounded-md text-sm hover:bg-[#ff9920] transition-colors">
                Đăng ký
            </button>
        </form>
    );
};

export default RegisterForm;