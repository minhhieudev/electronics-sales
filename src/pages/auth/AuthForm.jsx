import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CONST from "../../app/redux/const.js";
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm';

import bgimage from "../../Images/bg-form.png";
import googleIcon from "../../Images/google-icon.png";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem(CONST.STORAGE.ACCESS_TOKEN);

        if (accessToken && accessToken !== 'undefined') {
            navigate("/");
        }
    }, [dispatch]);

    const toggleForm = (e) => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex flex-col items-center justify-start p-4 min-h-[100vh]">
            <h1 className="absolute text-2xl text-center font-bold mb-2 text-[#FF8900]">shoplogo</h1>
            <div className="absolute inset-0 bg-cover bg-center m-auto"
                style={{
                    backgroundImage: `url(${bgimage})`,
                    height: '416px',
                    width: '665px',
                }}
            >
            </div>
            <div className={`relative bg-white p-6 rounded shadow-lg text-[12px] font-semibold z-10 w-[376px] ${isLogin ? 'h-[510px]' : 'h-[613px] top-4'} m-auto`}>
                {isLogin ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}
                <div className="flex items-center my-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-2 px-3 text-gray-400">Hoặc</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <div className="flex items-center text-[16px] justify-center">
                    <button className="flex h-12 font-bold justify-center items-center bg-[#F2F4F5] w-full border border-gray-300 rounded">
                        <img src={googleIcon} alt="Google" className="mr-1 h-6 w-6" />
                        Tiếp tục với Google
                    </button>
                </div>
                <p className="text-center font-semibold mt-3">
                    {isLogin ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
                    <button onClick={toggleForm} className="text-[#FF8900] ml-1">
                        {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                    </button>
                </p>
                <div className="text-[12px] text-gray-400 mt-4 text-center">
                    <span className=" mt-6 text-justify">
                        Bằng việc tiếp tục, bạn đã đồng ý với <span className='font-bold'>Điều khoản dịch vụ</span> của HPQ và xác nhận đã đọc và hiểu <span className='font-bold'>Chính sách về quyền riêng tư</span> của chúng tôi,
                    </span>
                    <span>
                        cũng như bạn đã đủ 13 tuổi.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;