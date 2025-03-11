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
        <form onSubmit={handleRegister} className="w-full text-[12px]">
            <h1 className="text-2xl text-center font-bold mb-2">Đăng ký</h1>
            <div className="mb-2">
                <label className="block" htmlFor="userName">Tài khoản</label>
                <input
                    type="text"
                    id="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên đăng nhập ..."
                    className="mt-1 h-9 block w-full p-2 border focus:border-[#FF8900] focus:outline-none rounded"
                />
            </div>
            <div className="mb-2">
                <label className="block" htmlFor="fullName">Họ và tên</label>
                <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên ..."
                    className="mt-1 h-9 block w-full p-2 border focus:border-[#FF8900] focus:outline-none rounded"
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
                        className="mt-1 h-9 block w-full p-2 border border-gray-300 rounded transition duration-200 ease-in-out focus:border-[#FF8900] focus:outline-none"
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
            <div className="mb-2">
                <label className="block" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Nhập lại mật khẩu ..."
                        className={`mt-1 h-9 block w-full p-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded transition duration-200 ease-in-out focus:border-[#FF8900] focus:outline-none`}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ?
                            <AiOutlineEyeInvisible className="w-5 h-5 opacity-50" /> :
                            <AiOutlineEye className="w-5 h-5 opacity-50" />
                        }
                    </button>
                </div>
                {passwordError && (
                    <p className="text-red-500 mt-1">{passwordError}</p>
                )}
            </div>
            <a
                href="/forgot-password"
                className="text-[#FF8900] mt-2 flex items-center justify-center mb-1"
            >
                Bạn quên mật khẩu?
            </a>
            <button type="submit" className="h-10 text-[16px] w-full font-bold bg-[#FF8900] text-white py-2 rounded">
                Đăng ký
            </button>
        </form>
    );
};

export default RegisterForm;