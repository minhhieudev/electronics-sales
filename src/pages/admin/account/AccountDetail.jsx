import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAccountById } from "../../../app/redux/slices/account.slice";
import { FaRegUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlinePhone } from "react-icons/md";
import { PiAddressBookLight, PiCakeDuotone } from "react-icons/pi";
import { AiOutlineCalendar } from "react-icons/ai";
import MESSAGES from "../../../common/const";

const AccountDetails = ({ accountId }) => {
    const dispatch = useDispatch();
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAccount = async () => {
            if (!accountId) return;

            setLoading(true);
            setError(null);
            try {
                const data = await dispatch(fetchAccountById(accountId));
                setAccount(data.payload);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getAccount();
    }, [accountId, dispatch]);
    const formatDate = (dateString) => {
        if (!dateString) return MESSAGES.NO_DATA;

        const date = new Date(dateString);
        return new Intl.DateTimeFormat("vi-VN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(date);
    };

    if (loading) return <p className="text-center text-gray-600">Đang tải dữ liệu...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!account) return <p className="text-center text-gray-400">Không có dữ liệu</p>;

    const genderText = account.gender ? "Nam" : "Nữ";
    const roleText = account.role ? "Admin" : "User";

    return (
        <div>
            <h2 className="text-[28px] font-bold text-gray-900 mb-5">{account.fullName}</h2>

            <p className="flex items-center gap-2 mb-5">
                <FaRegUserCircle className="text-gray-400" />
                <strong className="text-gray-400 w-32 font-normal">Tên tài khoản:</strong>
                <span>{account.userName}</span>
            </p>

            <p className="flex items-center gap-2 mb-5">
                <MdOutlinePhone className="text-gray-400" />
                <strong className="text-gray-400 w-32 font-normal">Số điện thoại:</strong>
                <span>{account.numberPhone}</span>
            </p>

            <p className="flex items-center gap-2 mb-5">
                <PiAddressBookLight className="text-gray-400" />
                <strong className="text-gray-400 w-32 font-normal" >Role:</strong>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {roleText}
                </span>
            </p>

            <p className="flex items-center gap-2 mb-5">
                <PiCakeDuotone className="text-gray-400" />
                <strong className="text-gray-400 w-32 font-normal">Ngày sinh:</strong>
                <span>{formatDate(account.birthDay)}</span>
            </p>

            <p className="flex items-center gap-2 mb-5">
                <AiOutlineCalendar className="text-gray-400" />
                <strong className="text-gray-400 w-32 font-normal">Giới tính:</strong>
                <span className={`px-3 py-1 rounded-full text-sm ${genderText === "Nam" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {genderText}
                </span>
            </p>

            <p className="flex items-start gap-2 mb-5">
                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                <strong className="text-gray-400 w-32 font-normal flex-shrink-0">Địa chỉ:</strong>
                <span className="flex-grow">{account.address}</span>
            </p>
        </div>
    );
};

export default AccountDetails;
