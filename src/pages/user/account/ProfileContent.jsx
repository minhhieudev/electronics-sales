import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineDown, AiOutlineLoading3Quarters, AiOutlineLock, AiOutlineSave, AiOutlineUpload } from 'react-icons/ai';
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

    // State to track to change
    const [isProfileChanged, setIsProfileChanged] = useState(false);

    // Add state to store temporary avatar image file
    const [tempAvatarUrl, setTempAvatarUrl] = useState(null);

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
            setIsProfileChanged(false); // Reset the state when profile changes
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

        const newUserInfo = { ...userInfo, [field]: value };
        setUserInfo(newUserInfo);

        // Check if there are any changes compared to the original profile
        const isChanged = Object.keys(newUserInfo).some(key => {
            return newUserInfo[key] !== (profile[key] || '');
        });
        setIsProfileChanged(isChanged);
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
                setTempAvatarUrl(null); // Reset tempAvatarUrl
            }
        }));
    };

    // Handle cancel action to reset user info
    const handleCancel = async () => {
        // Delete current cloud image if temp exists and differs
        if (tempAvatarUrl !== userInfo.avatarUrl && userInfo.avatarUrl) {
            try {
                await deleteFileFromCloudinary(userInfo.avatarUrl);
            } catch (error) {
                console.error("Error deleting temporary avatar:", error);
            }
        }

        // Reset userInfo 
        setUserInfo({
            fullName: profile.fullName || '',
            email: profile.email || '',
            numberPhone: profile.numberPhone || null,
            birthDay: profile.birthDay || null,
            gender: profile.gender,
            address: profile.address || '',
            avatarUrl: tempAvatarUrl || ''
        });

        setEditing({
            fullName: false,
            email: false,
            numberPhone: false,
            address: false
        });

        setIsProfileChanged(false);
        setTempAvatarUrl(null); // Reset tempAvatarUrl
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

            // Save old file name to tempAvatarUrl if this is first upload in this edit session
            if (!tempAvatarUrl) {
                setTempAvatarUrl(userInfo.avatarUrl);
            }

            // If have old avatar (not the original one), delete it
            if (userInfo.avatarUrl && userInfo.avatarUrl !== tempAvatarUrl) {
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
            setIsProfileChanged(true);

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
        return (
            <div className="flex items-center gap-3 sm:gap-2">
                <label className="w-[30%] sm:w-32 text-gray-500 text-sm">{label}:</label>
                <div className="flex-1">
                    {editing[field] ? (
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => handleChange(field, e.target.value)}
                            className="w-[80%] border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            onBlur={() => setEditing(prev => ({ ...prev, [field]: false }))}
                            autoFocus
                        />
                    ) : (
                        <div className="flex items-center gap-2 justify-between w-full sm:w-[80%]">
                            <span className={`text-sm break-words ${!value ? 'text-gray-400 italic' : field === 'numberPhone' ? 'font-bold' : 'font-semibold'}`}>
                                {value || 'Chưa cập nhật'}
                            </span>
                            <button
                                className="text-orange-500 text-sm font-medium hover:text-orange-600 whitespace-nowrap"
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
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
                    {/* avatarUrl section */}
                    <div className="w-full lg:w-64">
                        <div className="flex flex-col items-center">
                            <div className="w-64 aspect-square mb-4">
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
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center sm:gap-2">
                                        <label className="w-[30%] sm:w-32 text-gray-500 text-sm">Ngày sinh:</label>
                                        <input
                                            type="date"
                                            value={userInfo.birthDay}
                                            onChange={(e) => handleChange('birthDay', e.target.value)}
                                            className="w-[60%] sm:w-[40%] text-sm border border-[#FF8900] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div className="flex items-center sm:gap-2">
                                        <label className="w-[30%] sm:w-32 text-gray-500 text-sm">Giới tính:</label>
                                        <div className="relative w-[60%] sm:w-[40%]">
                                            <select
                                                value={userInfo.gender}
                                                onChange={(e) => handleChange('gender', e.target.value === 'true')}
                                                className="w-full text-sm border border-[#FF8900] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                                            >
                                                <option value="true">Nam</option>
                                                <option value="false">Nữ</option>
                                            </select>
                                            <AiOutlineDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {renderEditableField('address', 'Địa chỉ', userInfo.address)}
                            </div>

                            {/* Action buttons */}
                            <div className="flex items-center gap-4 pt-6 justify-end">
                                <button
                                    className="w-[30%] sm:w-auto border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleCancel}
                                    disabled={!isProfileChanged}
                                >
                                    <AiOutlineClose className="h-5 w-5" />
                                    <span>Hủy</span>
                                </button>
                                <button
                                    className="w-[30%] sm:w-auto bg-[#FF8900] text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleSave}
                                    disabled={!isProfileChanged}
                                >
                                    <AiOutlineSave className="h-5 w-5" />
                                    <span>Lưu</span>
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