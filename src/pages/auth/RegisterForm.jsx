import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { registerAction } from "../../app/redux/slices/auth.slice";
import MESSAGES from "../../common/const";

const RegisterForm = ({ onRegisterSuccess }) => {
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

        dispatch(registerAction({
            body: {
                userName: formData.userName,
                password: formData.passWord,
                fullName: formData.fullName
            },
            onSuccess: () => {
                onRegisterSuccess(formData.userName);
            }
        }));
    };

    return (
        <form onSubmit={handleRegister} className="w-full">
            <h1 className="text-base text-center font-bold mb-3">Đăng ký</h1>

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
                <label className="block text-[11px] font-semibold mb-1" htmlFor="fullName">
                    Họ và tên
                </label>
                <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên ..."
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
                        className="h-8 w-full px-3 py-1 border rounded-md focus:border-[#FF8900] focus:outline-none text-[11px]"
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

            <div className="mb-2">
                <label className="block text-[11px] font-semibold mb-1" htmlFor="confirmPassword">
                    Xác nhận mật khẩu
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Nhập lại mật khẩu ..."
                        className={`h-8 w-full px-3 py-1 border rounded-md focus:border-[#FF8900] focus:outline-none text-[11px] ${passwordError ? 'border-red-500' : ''
                            }`}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ?
                            <AiOutlineEyeInvisible className="w-3.5 h-3.5 text-gray-400" /> :
                            <AiOutlineEye className="w-3.5 h-3.5 text-gray-400" />
                        }
                    </button>
                </div>
                {passwordError && (
                    <p className="text-red-500 text-[10px] mt-0.5">{passwordError}</p>
                )}
            </div>

            <button type="submit" className="w-full h-8 bg-[#FF8900] text-white font-bold rounded-md text-xs hover:bg-[#ff9920] transition-colors">
                Đăng ký
            </button>
        </form>
    );
};

export default RegisterForm;