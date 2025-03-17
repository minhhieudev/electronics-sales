import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { changePasswordAction } from '../../../app/redux/slices/account.slice';
import MESSAGES from '../../../common/const';

const ChangePasswordModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const handleChange = (field, value) => {
        setPasswords(prev => ({ ...prev, [field]: value }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = () => {
        // Validation
        if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
            toast.error(MESSAGES.CHANGE_PASSWORD_FIELDS_REQUIRED);
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error(MESSAGES.CHANGE_PASSWORD_MISMATCH);
            return;
        }

        dispatch(changePasswordAction({
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword
        }));

        // Reset form
        setPasswords({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 md:p-0">
            <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                {/* Close button - adjust position for mobile */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 p-2"
                >
                    <AiOutlineClose className="h-5 w-5" />
                </button>

                <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-center pt-2">
                    Đổi mật khẩu
                </h2>

                {/* Form */}
                <div className="space-y-3 md:space-y-4">
                    {/* Current Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu hiện tại
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                value={passwords.currentPassword}
                                onChange={(e) => handleChange('currentPassword', e.target.value)}
                                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8900]"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPasswords.current ?
                                    <AiOutlineEyeInvisible className="h-4 w-4 md:h-5 md:w-5 text-gray-500" /> :
                                    <AiOutlineEye className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mật khẩu mới
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                value={passwords.newPassword}
                                onChange={(e) => handleChange('newPassword', e.target.value)}
                                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8900]"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('new')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPasswords.new ?
                                    <AiOutlineEyeInvisible className="h-4 w-4 md:h-5 md:w-5 text-gray-500" /> :
                                    <AiOutlineEye className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Xác nhận mật khẩu mới
                        </label>
                        <div className="relative">
                            <input
                                type={showPasswords.confirm ? "text" : "password"}
                                value={passwords.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8900]"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('confirm')}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPasswords.confirm ?
                                    <AiOutlineEyeInvisible className="h-4 w-4 md:h-5 md:w-5 text-gray-500" /> :
                                    <AiOutlineEye className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#FF8900] text-white py-2.5 rounded-lg hover:bg-orange-600 transition-colors mt-6 text-sm md:text-base font-medium"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordModal;