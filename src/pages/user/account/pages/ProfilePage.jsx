import React, { useEffect, useState } from 'react';
import { AiOutlineCalendar, AiOutlineClose, AiOutlineDown, AiOutlineEdit, AiOutlineEnvironment, AiOutlineLoading3Quarters, AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlineSave, AiOutlineUpload, AiOutlineUser } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { updateProfileAction } from '../../../../app/redux/slices/user/account.slice';
import { deleteFileFromCloudinary, uploadFileToCloudinary, validateFile } from '../../../../app/utils/uploadUtils';
import MESSAGES from '../../../../common/const';
import avatarUrls from '../../../../Images/avatars.png';
import ChangePasswordModal from '../components/ChangePasswordModal';

const ProfileContent = () => {

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.auth.userInfo);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // State to store temporary avatar image file
    const [tempAvatarUrl, setTempAvatarUrl] = useState(null);
    const [tempUploadedUrl, setTempUploadedUrl] = useState(null);

    // State to control edit mode
    const [isEditMode, setIsEditMode] = useState(false);

    // State to track if data has changed
    const [isChanged, setIsChanged] = useState(false);

    // State for user info
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: null,
        phoneNumber: '',
        dateOfBirth: '',
        gender: null,
        address: '',
        avatarUrl: ''
    });

    // UseEffect to set data from profile into userInfo
    useEffect(() => {
        if (profile) {
            setUserInfo({
                fullName: profile.fullName || '',
                email: profile.email || null,
                phoneNumber: profile.phoneNumber || '',
                dateOfBirth: profile.dateOfBirth || '',
                gender: profile.gender,
                address: profile.address || '',
                avatarUrl: profile.avatarUrl || ''
            });
            setIsChanged(false);
        }
    }, [profile]);

    // ========== Add validation functions =======================

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    };

    const isValidFullName = (name) => {
        return name.trim().length > 0;
    };

    const handleChange = (field, value) => {
        if (field === 'phoneNumber') {
            if (!/^\d*$/.test(value)) {
                return;
            }
            if (value.length > 10) {
                return;
            }
        }

        if (field === 'fullName') {
            value = value.replace(/[^a-zA-ZÀ-ỹ\s]/g, '')
                .replace(/\s+/g, ' ')
                .trimStart();
        }

        // Update userInfo
        const newUserInfo = { ...userInfo, [field]: value };
        setUserInfo(newUserInfo);

        // Check for changes compared to the original data
        const hasChanges = Object.keys(newUserInfo).some(key => {
            if (key === 'gender') {
                return newUserInfo[key] !== profile[key];
            }
            return String(newUserInfo[key] || '').trim() !== String(profile[key] || '').trim();
        });

        setIsChanged(hasChanges || tempUploadedUrl !== null);
    };
    // ===================================================================================

    // Handle save profile
    const handleSave = () => {
        if (!isValidFullName(userInfo.fullName)) {
            toast.error(MESSAGES.FULL_NAME_REQUIRED);
            return;
        }

        const emailToSend = userInfo.email?.trim() || null;
        if (emailToSend && !isValidEmail(emailToSend)) {
            toast.error(MESSAGES.INVALID_EMAIL_FORMAT);
            return;
        }

        const phoneNumberToSend = userInfo.phoneNumber?.trim() || null;
        if (phoneNumberToSend && !isValidPhone(phoneNumberToSend)) {
            toast.error(MESSAGES.INVALID_PHONE_FORMAT);
            return;
        }

        dispatch(updateProfileAction({
            body: {
                ...userInfo,
                email: emailToSend,
                phoneNumber: phoneNumberToSend
            },
            onSuccess: () => {
                if (tempAvatarUrl && tempAvatarUrl !== userInfo.avatarUrl) {
                    deleteFileFromCloudinary(tempAvatarUrl)
                        .catch(error => console.error("Error deleting old avatar:", error));
                }
                setIsEditMode(false);
                setTempAvatarUrl(null);
                setTempUploadedUrl(null);
            }
        }));
    };

    // Handle cancel action to reset user info
    const handleCancel = async () => {
        // If there is a new uploaded image, delete it
        if (tempUploadedUrl) {
            try {
                //await deleteFileFromCloudinary(tempUploadedUrl);
            } catch (error) {
                console.error("Error deleting temporary uploaded avatar:", error);
            }
        }

        // Reset userInfo
        setUserInfo({
            ...profile,
            avatarUrl: tempAvatarUrl || profile.avatarUrl || ''
        });

        setTempUploadedUrl(null);
        setTempAvatarUrl(null);
        setIsEditMode(false);
        setIsChanged(false);
    };

    // ========= Upload Image =====================================
    const fileInputRef = React.useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = async (file) => {
        try {
            setIsUploading(true);

            if (tempUploadedUrl) {
                await deleteFileFromCloudinary(tempUploadedUrl)
            }

            const newFileName = await uploadFileToCloudinary(file);

            if (!tempAvatarUrl) {
                setTempAvatarUrl(userInfo.avatarUrl);
            }

            setTempUploadedUrl(newFileName);

            setUserInfo(prev => ({
                ...prev,
                avatarUrl: newFileName
            }));

            setIsEditMode(true);
            setIsChanged(true); // Set isChanged to true when avatar is uploaded

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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const renderEditableField = (field, label, value, icon) => {
        return (
            <div className="flex items-center gap-3 sm:gap-12">
                <label className="w-[35%] sm:w-32 text-gray-500 text-sm flex items-center gap-3">
                    {icon}
                    {label}:
                </label>
                <div className="flex-1">
                    {isEditMode ? (
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => handleChange(field, e.target.value)}
                            placeholder={field === 'fullName' ? "Ví dụ: Nguyễn Văn A" : ""}
                            className={`w-[80%] text-sm border ${field === 'fullName'
                                ? (!value?.trim() || !isValidFullName(value || '')) ? 'border-red-500' : 'border-[#FF8900]'
                                : 'border-[#FF8900]'
                                } rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        />
                    ) : (
                        <span className={`text-sm break-words ${!value ? 'text-gray-400 italic' : field === 'phoneNumber' ? 'font-bold' : 'font-semibold'}`}>
                            {value || 'Chưa cập nhật'}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    const renderDateAndGender = () => {
        return (
            <div className="grid grid-cols-1 gap-4">
                {/* Date Field */}
                <div className="flex items-center sm:gap-12 gap-3">
                    <label className="w-[35%] sm:w-32 text-gray-500 text-sm flex items-center gap-2">
                        <AiOutlineCalendar className="w-4 h-4" />
                        Ngày sinh:
                    </label>
                    <div className="flex-1">
                        {isEditMode ? (
                            <input
                                type="date"
                                value={userInfo.dateOfBirth}
                                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                max={new Date().toISOString().split('T')[0]}
                                className="w-[80%] sm:w-[50%] text-sm border border-[#FF8900] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
                            />
                        ) : (
                            <span className={`text-sm break-words ${!userInfo.dateOfBirth ? 'text-gray-400 italic' : 'font-semibold'}`}>
                                {userInfo.dateOfBirth ? formatDate(userInfo.dateOfBirth) : 'Chưa cập nhật'}
                            </span>
                        )}
                    </div>
                </div>

                {/* Gender Field */}
                <div className="flex items-center sm:gap-12 gap-3">
                    <label className="w-[35%] sm:w-32 text-gray-500 text-sm flex items-center gap-2">
                        <AiOutlineUser className="w-4 h-4" />
                        Giới tính:
                    </label>
                    <div className="flex-1">
                        {isEditMode ? (
                            <div className="relative w-[80%] sm:w-[50%]">
                                <select
                                    value={userInfo.gender}
                                    onChange={(e) => handleChange('gender', e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}
                                    className="w-full text-sm border border-[#FF8900] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </select>
                                <AiOutlineDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-4 h-4" />
                            </div>
                        ) : (
                            <span className="text-sm font-semibold">
                                {userInfo.gender === true ? 'Nam' : userInfo.gender === false ? 'Nữ' : 'Chưa cập nhật'}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="px-6 pt-1 pb-4 bg-white rounded-lg sm:h-[75vh]">
                {/* Header section */}
                <div className="mb-4 sm:w-[95%] flex justify-between">
                    <p className="text-sm sm:text-base text-gray-500 mt-3">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    {!isEditMode && (
                        <button
                            onClick={() => setIsEditMode(true)}
                            className="text-orange-500 hover:text-orange-600 p-2 rounded-full hover:bg-orange-50 transition-colors ml-4"
                        >
                            <AiOutlineEdit className="w-8 h-8" />
                        </button>
                    )}
                </div>

                {/* Main content grid */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
                    {/* avatarUrl section */}
                    <div className="w-full lg:w-64 flex justify-center">
                        <div className="flex flex-col items-center">
                            <div className="w-64 h-64 aspect-square mb-4">
                                <img
                                    src={userInfo.avatarUrl ? `${process.env.REACT_APP_CDN_URL}${userInfo.avatarUrl}` : avatarUrls}
                                    alt="Avatar"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>

                            <div className="w-64 space-y-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/jpeg,image/png"
                                    className="hidden"
                                />

                                {/* Upload button */}
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

                                <p className="text-xs text-gray-500 font-medium text-center">
                                    Dung lượng file tối đa 1 MB
                                    <br />
                                    Định dạng:.JPEG, .PNG
                                </p>

                                {/* Change password button */}
                                <button
                                    className="w-full mt-3 flex items-center justify-center gap-2 border-2 border-gray-300 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsPasswordModalOpen(true)}
                                >
                                    <AiOutlineLock className="h-5 w-5 text-gray-600" />
                                    <span className="font-semibold text-sm">Đổi mật khẩu</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form section */}
                    <div className="flex-1 flex justify-center lg:justify-start">
                        <div className="space-y-6 w-full max-w-[600px]">
                            {/* Editable fields với icons */}
                            <div className="space-y-4 sm:space-y-6">
                                {renderEditableField('fullName', 'Họ và tên', userInfo.fullName,
                                    <AiOutlineUser className="w-4 h-4 text-gray-500" />)}
                                {renderEditableField('email', 'Email', userInfo.email,
                                    <AiOutlineMail className="w-4 h-4 text-gray-500" />)}
                                {renderEditableField('phoneNumber', 'Số điện thoại', userInfo.phoneNumber,
                                    <AiOutlinePhone className="w-4 h-4 text-gray-500" />)}

                                {renderDateAndGender()}

                                {renderEditableField('address', 'Địa chỉ', userInfo.address,
                                    <AiOutlineEnvironment className="w-4 h-4 text-gray-500" />)}
                            </div>

                            {/* Action buttons */}
                            {isEditMode && (
                                <div className="flex items-center gap-4 pt-6 justify-end">
                                    <button
                                        className="w-[30%] sm:w-auto border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                                        onClick={handleCancel}
                                    >
                                        <AiOutlineClose className="h-5 w-5" />
                                        <span>Hủy</span>
                                    </button>
                                    <button
                                        className={`w-[30%] sm:w-auto ${isChanged ? 'bg-[#FF8900] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors flex items-center gap-2`}
                                        onClick={isChanged ? handleSave : undefined}
                                    >
                                        <AiOutlineSave className="h-5 w-5" />
                                        <span>Lưu</span>
                                    </button>
                                </div>
                            )}
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