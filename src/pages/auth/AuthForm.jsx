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

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-[1000px] h-[700px] relative flex items-center justify-center">
                <h1 className="absolute top-8 text-2xl font-bold text-[#FF8900] z-20">shoplogo</h1>
                
                <div className="absolute w-[665px] h-[416px] bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bgimage})`
                    }}
                />

                <div className={`relative bg-white p-5 rounded-lg shadow-lg w-[350px] 
                    ${isLogin ? 'h-[460px]' : 'h-[560px]'} z-10`}>
                    {isLogin ? <LoginForm /> : <RegisterForm />}

                    <div className="flex items-center my-2">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-2 text-gray-400 text-xs">Hoặc</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button className="flex h-9 text-sm font-bold justify-center items-center bg-[#F2F4F5] w-full border border-gray-300 rounded">
                        <img src={googleIcon} alt="Google" className="mr-2 h-4 w-4" />
                        Tiếp tục với Google
                    </button>

                    <p className="text-center text-xs font-semibold mt-3">
                        {isLogin ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
                        <button onClick={toggleForm} className="text-[#FF8900] ml-1">
                            {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                        </button>
                    </p>

                    <div className="text-[10px] text-gray-400 mt-3 text-center leading-tight">
                        Bằng việc tiếp tục, bạn đã đồng ý với <span className="font-bold">Điều khoản dịch vụ</span> của HPQ 
                        và xác nhận đã đọc và hiểu <span className="font-bold">Chính sách về quyền riêng tư</span> của chúng tôi, 
                        cũng như bạn đã đủ 13 tuổi.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;