import { toast } from "react-toastify";
import MESSAGES, { CONST } from '../../common/const';
import axios from 'axios';
import SHA1 from 'crypto-js/sha1';

// Function to validate file
export const validateFile = (file, options = {}) => {
    const {
        maxSize = CONST.UPLOAD.MAX_SIZE,
        allowedTypes = CONST.UPLOAD.ALLOWED_TYPES,
        customMessage = {
            invalidType: MESSAGES.UPLOAD_FILE_TYPE_ERROR,
            invalidSize: MESSAGES.UPLOAD_FILE_SIZE_ERROR
        }
    } = options;

    if (!allowedTypes.includes(file.type)) {
        toast.error(customMessage.invalidType);
        return false;
    }

    if (file.size > maxSize) {
        toast.error(customMessage.invalidSize);
        return false;
    }

    return true;
};

// Function to upload file to Cloudinary
export const uploadFileToCloudinary = async (fileBlob) => {
    const formData = new FormData();
    formData.append('file', fileBlob);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(
            `${process.env.REACT_APP_CLOUDINARY_UPLOAD_URL}?folder=${process.env.REACT_APP_CLOUDINARY_FOLDER}`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to upload file: ${errorData.error.message}`);
        }

        const result = await response.json();
        const fileName = `${result.public_id.split('/').pop()}.${result.format}`;
        return fileName;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

// ============== HANDLE DELETE FILE FROM CLOUDINARY =====================

// Function to generate SHA1 hash
const generateSHA1 = (data) => {
    return SHA1(data).toString();
};

// Function to generate signature
const generateSignature = (publicId, apiSecret) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

// Function to delete file from Cloudinary
export const deleteFileFromCloudinary = async (fileName) => {
    if (!fileName) {
        toast.error(MESSAGES.DELETE_FILE_NOT_FOUND);
        return;
    }

    try {
        // Extract public_id from fileName (remove file extension)
        const publicId = `${process.env.REACT_APP_CLOUDINARY_FOLDER}/${fileName.split('.')[0]}`;
        const timestamp = new Date().getTime();
        const signature = generateSHA1(generateSignature(publicId, process.env.REACT_APP_CLOUDINARY_API_SECRET));

        const response = await axios.post(process.env.REACT_APP_CLOUDINARY_DELETE_URL, {
            public_id: publicId,
            signature: signature,
            api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
            timestamp: timestamp,
        });

        if (response.status === 200) {
            return true;
        }
        throw new Error(MESSAGES.DELETE_FILE_CLOUDINARY_ERROR);
    } catch (error) {
        toast.error(MESSAGES.DELETE_FILE_ERROR);
        throw error;
    }
};