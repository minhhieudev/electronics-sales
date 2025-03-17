const MESSAGES = {
    // Auth messages
    REGISTER_SUCCESS: "Đăng ký thành công",
    REGISTER_ERROR: "Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.",
    LOGIN_SUCCESS: "Đăng nhập thành công",
    LOGIN_ERROR: "Có lỗi xảy ra. Vui lòng thử lại.",
    PASSWORD_MISMATCH: "Mật khẩu không khớp!",
    FIELDS_REQUIRED: "Vui lòng điền đủ thông tin!",
    
    // Session messages
    SESSION_EXPIRED: "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.",
    SESSION_EXPIRED_MESSAGE: "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.",
    INVALID_TOKEN: "Invalid access token",
    
    // Network messages
    NETWORK_ERROR: "Lỗi mạng hoặc máy chủ không phản hồi.",
    
    // Profile messages
    GET_PROFILE_ERROR: 'Lỗi khi lấy thông tin tài khoản',
    UPDATE_PROFILE_SUCCESS: 'Cập nhật thông tin thành công',
    UPDATE_PROFILE_ERROR: 'Lỗi khi cập nhật thông tin',
    INVALID_EMAIL_FORMAT: 'Email không đúng định dạng',
    INVALID_PHONE_FORMAT: 'Số điện thoại phải có 10 chữ số',

    // Change password messages
    CHANGE_PASSWORD_FIELDS_REQUIRED: 'Vui lòng điền đầy đủ thông tin',
    CHANGE_PASSWORD_MISMATCH: 'Mật khẩu mới không khớp',
    CHANGE_PASSWORD_SUCCESS: 'Đổi mật khẩu thành công',
    CHANGE_PASSWORD_ERROR: 'Đổi mật khẩu thất bại',
    OLD_PASSWORD_INCORRECT: 'Mật khẩu cũ không chính xác',

    // Upload messages
    UPLOAD_FILE_SIZE_ERROR: 'Kích thước file không được vượt quá 1MB',
    UPLOAD_FILE_TYPE_ERROR: 'Chỉ chấp nhận file JPEG hoặc PNG',
    UPLOAD_SUCCESS: 'Tải ảnh lên thành công',
    UPLOAD_ERROR: 'Lỗi khi tải file lên: ',

    // File deletion messages
    DELETE_FILE_ERROR: 'Lỗi khi xóa file',
    DELETE_FILE_NOT_FOUND: 'Không tìm thấy file cần xóa',
    DELETE_FILE_CLOUDINARY_ERROR: 'Lỗi khi xóa file từ Cloudinary',
};

export default MESSAGES;

const CONST = {
    ITEMS_PER_PAGE: 12,
    UPLOAD: {
        MAX_SIZE: 1024 * 1024, // 1MB
        ALLOWED_TYPES: ['image/jpeg', 'image/png']
    }
};

export { CONST };
