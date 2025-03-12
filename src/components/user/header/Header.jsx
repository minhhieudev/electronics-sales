import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDown, AiOutlineEnvironment, AiOutlineLogout, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import avatar from '../../../Images/avatar.png';
import logo from '../../../Images/logo.png';
import { logout } from '../../../app/redux/slices/auth.slice';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.auth.userInfo);
    const isLogin = useSelector((state) => state.auth.isLogin);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    };

    const handleCartClick = () => {
        if (!isLogin) {
            navigate('/auth');
        } else {
            alert('Chưa xử lý :)')
        }
    };

    return (
        <header className="flex items-center justify-between px-16 py-1 bg-white shadow-md h-[90px]">
            <div className="flex items-center gap-2 flex-grow">
                <img src={logo} alt="logo" className="h-14 w-16" />
                <div className="flex-grow mt-1">
                    <div className="flex p-[1px] text-sm w-[742px] h-[48px] gap-1 rounded-md border-2 border-[#FF8900]">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm"
                            className=" p-2 text-[#FF8900] text-[14px] rounded w-full border-none focus:outline-none"
                        />
                        <button className="bg-[#FF8900] text-white p-2 rounded w-14 flex items-center justify-center">
                            <AiOutlineSearch className="h-8 w-6" />
                        </button>
                    </div>
                    <div className="mt-2">
                        <ul className="text-[14px] flex gap-2 text-gray-500">
                            <li>Điện thoại</li>
                            <li>Máy tính</li>
                            <li>Đồng hồ</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-between h-full pt-3 pb-2'>
                <div className="flex justify-end items-center gap-4">
                    {userInfo ? (
                        <div className="flex gap-1 items-center relative">
                            <div className='flex items-center gap-1'>
                                <img src={avatar} alt="avatar" className="h-7" />
                                <span className="text-base font-bold mr-4">{userInfo.fullName}</span>
                            </div>
                            <AiOutlineDown
                                className="h-4 cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            />
                            {showDropdown && (
                                <div ref={dropdownRef} className="absolute top-full right-[-10px] mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                                    <div className="absolute -top-2 right-6 w-4 h-4 rotate-45 bg-white border shadow-lg z-0"></div>
                                    <div className="relative bg-white rounded-lg z-10">
                                        <div className="py-2 font-semibold">
                                            <a href="/account" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                <div className="flex gap-1 items-center">
                                                    <AiOutlineUser className="h-4 text-black" />
                                                    <span className="text-sm">Tài khoản của tôi</span>
                                                </div>
                                            </a>
                                            <div onClick={handleLogout} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer">
                                                <div className="flex gap-1 items-center">
                                                    <AiOutlineLogout className="h-4 text-black" />
                                                    <span className="text-sm">Đăng xuất</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <a href="/auth" className="bg-[#FF8900] text-[12px] text-white p-2 rounded">
                            Đăng nhập
                        </a>
                    )}
                    <div className="relative" onClick={handleCartClick}>
                        <span className="absolute bottom-4 right-0 text-[#FF8900] rounded-full text-[12px] px-1 font-bold">99+</span>
                        <AiOutlineShoppingCart className="h-6 w-10 cursor-pointer" />
                    </div>
                </div>
                {userInfo ? (
                    <div className="flex text-sm gap-1">
                        <div className='flex gap-1 items-center'>
                            <AiOutlineEnvironment className="h-4 w-4" />
                            <span className="text-gray-400">Địa chỉ của bạn:</span>
                        </div>
                        <span className="text-black">{userInfo.address || 'Chưa cập nhật địa chỉ !'}</span>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </header>
    );
};

export default Header;