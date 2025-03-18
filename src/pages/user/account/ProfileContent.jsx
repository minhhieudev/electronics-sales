import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters, AiOutlineLock, AiOutlineUpload } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { updateProfileAction } from '../../../app/redux/slices/user/account.slice';
import { deleteFileFromCloudinary, uploadFileToCloudinary, validateFile } from '../../../app/utils/uploadUtils';
import MESSAGES from '../../../common/const';
import avatarUrls from '../../../Images/avatars.png';
import ChangePasswordModal from './ChangePasswordModal';

const ProfileContent = () => {

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.auth.userInfo);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // State for user info
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        numberPhone: null,
        birthDay: '',
        gender: null,
        address: '',
        avatarUrl: ''
    });

    // State for editing fields
    const [editing, setEditing] = useState({
        fullName: false,
        email: false,
        numberPhone: false,
        address: false
    });

    // UseEffect to set data from profile into userInfo
    useEffect(() => {
        if (profile) {
            setUserInfo({
                fullName: profile.fullName || '',
                email: profile.email || '',
                numberPhone: profile.numberPhone || null,
                birthDay: profile.birthDay || null,
                gender: profile.gender,
                address: profile.address || '',
                avatarUrl: profile.avatarUrl || ''
            });
        }
    }, [profile]);

    // Add validation functions
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    const handleEdit = (field) => {
        setEditing(prev => ({ ...prev, [field]: true }));
    };

    const handleChange = (field, value) => {
        if (field === 'numberPhone') {
            if (value && !/^\d*$/.test(value)) {
                return;
            }
            if (value && value.length > 10) {
                return;
            }
        }

        setUserInfo(prev => ({ ...prev, [field]: value }));
    };
    //=================================================================

    // Handle save profile
    const handleSave = () => {
        if (userInfo.email !== "" && !isValidEmail(userInfo.email)) {
            toast.error(MESSAGES.INVALID_EMAIL_FORMAT);
            return;
        }

        if (userInfo.numberPhone !== null && !isValidPhone(userInfo.numberPhone)) {
            toast.error(MESSAGES.INVALID_PHONE_FORMAT);
            return;
        }

        const dataToSend = {
            ...userInfo,
            numberPhone: userInfo.numberPhone || null
        };

        dispatch(updateProfileAction({
            body: dataToSend,
            onSuccess: () => {
                setEditing({
                    fullName: false,
                    email: false,
                    numberPhone: false,
                    address: false
                });
            }
        }));
    };


    //========= Upload Image =====================================
    const fileInputRef = React.useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = async (file) => {
        try {
            setIsUploading(true);

            // Upload new file
            const newFileName = await uploadFileToCloudinary(file);

            // If have old avatar, delete it
            if (userInfo.avatarUrl) {
                try {
                    await deleteFileFromCloudinary(userInfo.avatarUrl);
                } catch (deleteError) {
                    console.error("Error deleting old avatar:", deleteError);
                }
            }

            // Update state with new file
            setUserInfo(prev => ({
                ...prev,
                avatarUrl: newFileName
            }));

        } catch (error) {
            toast.error(MESSAGES.UPLOAD_ERROR + error.message);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!validateFile(file)) {
            event.target.value = '';
            return;
        }

        try {
            await handleFileUpload(file);
            toast.success(MESSAGES.UPLOAD_SUCCESS);
            event.target.value = '';
        } catch (error) {
            console.error(error);
        }
    };
    //=====================================================================

    const renderEditableField = (field, label, value) => {
        // Tạo text mặc định cho từng trường
        const getDefaultText = () => {
            switch (field) {
                case 'fullName':
                    return 'Chưa cập nhật họ tên';
                case 'email':
                    return 'Chưa cập nhật email';
                case 'numberPhone':
                    return 'Chưa cập nhật số điện thoại';
                case 'address':
                    return 'Chưa cập nhật địa chỉ';
                default:
                    return 'Chưa cập nhật';
            }
        };

        return (
            <div className="flex sm:items-center gap-10 sm:gap-2">
                <label className="w-[30%] sm:w-32 text-gray-500 text-sm">{label}:</label>
                <div className="flex-1">
                    {editing[field] ? (
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => handleChange(field, e.target.value)}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onBlur={() => setEditing(prev => ({ ...prev, [field]: false }))}
                            autoFocus
                        />
                    ) : (
                        <div className="flex flex-wrap items-center gap-2 sm:gap-12 justify-between sm:w-[75%] w-full">
                            <span className={`text-sm ${!value ? 'text-gray-400 italic' : field === 'numberPhone' ? 'font-bold' : 'font-semibold'
                                }`}>
                                {value || getDefaultText()}
                            </span>
                            <button
                                className="text-orange-500 text-sm font-medium hover:text-orange-500"
                                onClick={() => handleEdit(field)}
                            >
                                Thay đổi
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="">
            <div className="p-6 bg-white rounded-lg">
                {/* Header section */}
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold mb-1">Tài khoản của tôi</h1>
                    <p className="text-sm sm:text-base text-gray-500">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                </div>

                {/* Main content grid */}
                <div className="flex flex-col lg:flex-row gap-24">
                    {/* avatarUrl section */}
                    <div className="w-full lg:w-64">
                        <div className="text-center">
                            <div className="aspect-square w-48 mx-auto lg:w-full mb-4">
                                <img
                                    src={userInfo.avatarUrl ? `${process.env.REACT_APP_CDN_URL}${userInfo.avatarUrl}` : avatarUrls}
                                    alt="Avatar"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div className="space-y-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/jpeg,image/png"
                                    className="hidden"
                                />

                                <button
                                    onClick={handleUploadClick}
                                    disabled={isUploading}
                                    className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 p-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? (
                                        <AiOutlineLoading3Quarters className="h-5 w-5 text-gray-600 animate-spin" />
                                    ) : (
                                        <AiOutlineUpload className="h-5 w-5 text-gray-600" />
                                    )}
                                    <span className="font-semibold text-sm">
                                        {isUploading ? 'Đang tải lên...' : 'Tải ảnh lên'}
                                    </span>
                                </button>
                                <p className="text-xs text-gray-500 font-medium">
                                    Dung lượng file tối đa 1 MB
                                    <br />
                                    'Định dạng:.JPEG, .PNG
                                </p>
                            </div>

                            <div className='w-full'>
                                <button
                                    className="w-full mt-3 flex items-center justify-center gap-2 border-2 border-gray-300 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsPasswordModalOpen(true)}
                                >
                                    <AiOutlineLock className="h-5 w-5 text-gray-600" />
                                    <span className="font-semibold">Đổi mật khẩu</span>
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Form section */}
                    <div className="flex-1">
                        <div className="space-y-6">
                            {/* Editable fields */}
                            <div className="space-y-4">
                                {renderEditableField('fullName', 'Họ và tên', userInfo.fullName)}
                                {renderEditableField('email', 'Email', userInfo.email)}
                                {renderEditableField('numberPhone', 'Số điện thoại', userInfo.numberPhone)}

                                {/* Date and Gender fields */}
                                <div className="grid grid-cols-1">
                                    <div className="flex items-center gap-2">
                                        <label className="w-32 text-gray-500 text-sm">Ngày sinh:</label>
                                        <input
                                            type="date"
                                            value={userInfo.birthDay}
                                            onChange={(e) => handleChange('birthDay', e.target.value)}
                                            className="w-[40%] text-sm border border-[#FF8900] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 mt-2">
                                        <label className="w-32 text-gray-500 text-sm">Giới tính:</label>
                                        <select
                                            value={userInfo.gender}
                                            onChange={(e) => handleChange('gender', e.target.value === 'true')}
                                            className="w-[40%] text-sm border border-[#FF8900] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="true">Nam</option>
                                            <option value="false">Nữ</option>
                                        </select>
                                    </div>
                                </div>

                                {renderEditableField('address', 'Địa chỉ', userInfo.address)}
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col-reverse sm:flex-row items-center gap-4 pt-6">

                                <button
                                    className="w-full sm:w-auto bg-[#FF8900] text-white px-8 py-2 rounded-lg hover:bg-orange-500 transition-colors ml-auto"
                                    onClick={handleSave}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
            />
        </div>
    );
};

export default ProfileContent;