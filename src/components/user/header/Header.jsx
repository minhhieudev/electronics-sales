import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDown, AiOutlineEnvironment, AiOutlineLogout, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../../Images/avatar.png';
import logo from '../../../Images/logo.png';
import { logout } from '../../../app/redux/slices/auth.slice';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const searchBarRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userInfo = useSelector((state) => state.auth.userInfo);
    const isLogin = useSelector((state) => state.auth.isLogin);

    const searchSuggestions = ["Điện thoại", "Máy tính", "Đồng hồ"];

    // This effect handles the closing of dropdown and search bar when clicking outside of them.
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is on the logout button or account button
            const isLogoutButton = event.target.closest('[data-logout-button]');
            const isAccountButton = event.target.closest('[data-account-button]');
            if (isLogoutButton || isAccountButton) return;

            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setShowSearchBar(false);
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
            alert('Chưa xử lý :)');
        }
    };

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
    };

    return (
        <header className="relative z-40">

            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-12 items-center px-4 lg:px-16 py-1 h-20">
                <div className="col-span-3 lg:col-span-2">
                    <Link to="/" className="block">
                        <img src={logo} alt="logo" className="h-14 w-[40%] shrink-0" />
                    </Link>
                </div>

                {/* Search and User Info */}
                <div className="flex justify-between items-center col-span-9 lg:col-span-10">
                    <div className="flex flex-col w-[60%]">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex p-[1px] text-sm h-10 gap-1 rounded-md border-2 border-[#FF8900] flex-grow">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm"
                                className="p-2 text-[#FF8900] text-[14px] rounded w-full border-none focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="bg-[#FF8900] text-white p-2 rounded w-14 flex items-center justify-center shrink-0"
                            >
                                <AiOutlineSearch className="h-8 w-6" />
                            </button>
                        </form>
                        <div className="mt-2">
                            <ul className="text-[14px] flex gap-2 text-gray-500">
                                {searchSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="cursor-pointer hover:text-[#FF8900]"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* User Info & Cart */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4">
                            {userInfo ? (
                                <div className="flex gap-1 items-center relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                                    <div className='flex items-center gap-1'>
                                        <img src={avatar} alt="avatar" className="h-7 w-7 rounded-full" />
                                        <span className="text-base font-bold hidden md:inline">{userInfo.fullName}</span>
                                    </div>
                                    <AiOutlineDown
                                        className="h-4"
                                    />
                                    {showDropdown && (
                                        <div ref={dropdownRef} className="absolute top-full right-[-10px] mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                                            <div className="absolute -top-2 right-6 w-4 h-4 rotate-45 bg-white border shadow-lg z-0"></div>
                                            <div className="relative bg-white rounded-lg z-10">
                                                <div className="py-2 font-semibold">
                                                    <Link
                                                        to="/account"
                                                        data-account-button
                                                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setShowDropdown(false)}
                                                    >
                                                        <div className="flex gap-1 items-center">
                                                            <AiOutlineUser className="h-4 text-black" />
                                                            <span className="text-sm">Tài khoản của tôi</span>
                                                        </div>
                                                    </Link>
                                                    <div onClick={handleLogout} data-logout-button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer">
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
                                <Link to="/auth" className="bg-[#FF8900] text-[12px] text-white p-2 rounded whitespace-nowrap">
                                    Đăng nhập
                                </Link>
                            )}
                            <div className="relative" onClick={handleCartClick}>
                                <span className="absolute -top-1 -right-1 bg-[#FF8900] text-white rounded-full text-[10px] px-1.5 py-0.5 font-bold">99+</span>
                                <AiOutlineShoppingCart className="h-8 w-8 cursor-pointer" />
                            </div>
                        </div>
                        {userInfo && (
                            <div className="mt-2 flex items-center text-xs lg:text-sm ml-1.5">
                                <div className='flex items-center gap-1'>
                                    <AiOutlineEnvironment className="h-3 w-3 lg:h-4 lg:w-4 flex-shrink-0" />
                                    <span className="text-gray-400 whitespace-nowrap">Địa chỉ:</span>
                                </div>
                                <span className="text-black ml-1 truncate max-w-[150px] lg:max-w-[250px]">
                                    {userInfo?.address?.length > 20 ? `${userInfo.address.substring(0, 20)}...` : userInfo?.address || 'Chưa cập nhật'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-4 py-2 h-16">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="logo" className="h-10 w-[75%]" />
                </Link>

                <div className="flex items-center gap-3">
                    <button onClick={toggleSearchBar} className="p-1">
                        <AiOutlineSearch className="h-6 w-6 text-gray-700" />
                    </button>

                    <div className="relative" onClick={handleCartClick}>
                        <span className="absolute -top-1 -right-1 bg-[#FF8900] text-white rounded-full text-[9px] px-1.5 py-0.5 font-bold">99+</span>
                        <AiOutlineShoppingCart className="h-7 w-7 text-gray-700" />
                    </div>

                    {userInfo ? (
                        <div className="relative">
                            <img
                                src={avatar}
                                alt="avatar"
                                className="h-8 w-8 rounded-full cursor-pointer"
                                onClick={() => setShowDropdown(!showDropdown)}
                            />
                            {showDropdown && (
                                <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                                    <div className="p-3 border-b">
                                        <div className="flex items-center gap-2">
                                            <img src={avatar} alt="avatar" className="h-8 w-8 rounded-full" />
                                            <div>
                                                <p className="font-bold text-sm">{userInfo.fullName}</p>
                                                <p className="text-xs text-gray-500 truncate max-w-[150px]">{userInfo.email}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex items-center gap-1 text-xs">
                                            <AiOutlineEnvironment className="h-3 w-3 text-gray-500 flex-shrink-0" />
                                            <span className="text-gray-500 flex-shrink-0">Địa chỉ:</span>
                                            <span className="text-gray-700 truncate max-w-[150px]">{userInfo.address || 'Chưa cập nhật'}</span>
                                        </div>
                                    </div>
                                    <div className="py-2 font-semibold">
                                        <Link
                                            to="/account"
                                            data-account-button
                                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            <div className="flex gap-2 items-center">
                                                <AiOutlineUser className="h-5 w-5 text-gray-600" />
                                                <span className="text-sm">Tài khoản của tôi</span>
                                            </div>
                                        </Link>
                                        <div onClick={handleLogout} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:cursor-pointer">
                                            <div className="flex gap-2 items-center">
                                                <AiOutlineLogout className="h-5 w-5 text-gray-600" />
                                                <span className="text-sm">Đăng xuất</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/auth" className="bg-[#FF8900] text-[12px] text-white px-2 py-1 rounded">
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Search Bar (Expandable) */}
            {showSearchBar && (
                <div ref={searchBarRef} className="md:hidden px-4 py-2 bg-white border-t border-gray-200">
                    <form onSubmit={handleSearch}>
                        <div className="flex p-[1px] text-sm h-10 gap-1 rounded-md border-2 border-[#FF8900]">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm"
                                className="p-2 text-[#FF8900] text-[14px] rounded w-full border-none focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="bg-[#FF8900] text-white p-2 rounded w-12 flex items-center justify-center shrink-0"
                            >
                                <AiOutlineSearch className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {searchSuggestions.map((suggestion, index) => (
                            <span
                                key={index}
                                className="text-sm text-gray-500 cursor-pointer hover:text-[#FF8900]"
                                onClick={() => {
                                    handleSuggestionClick(suggestion);
                                    // Automatically submit form after selecting a suggestion on mobile
                                    setTimeout(() => handleSearch({ preventDefault: () => { } }), 100);
                                }}
                            >
                                {suggestion}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;