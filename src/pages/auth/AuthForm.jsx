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
    const [prefilledUsername, setPrefilledUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem(CONST.STORAGE.ACCESS_TOKEN);

        if (accessToken && accessToken !== 'undefined') {
            navigate("/");
        }
    }, [dispatch, navigate]);

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
        setPrefilledUsername('');
    };

    const handleRegisterSuccess = (userName) => {
        setIsLogin(true);
        setPrefilledUsername(userName);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-[1000px] min-h-[500px] relative flex items-center justify-center">
                <h1 className="absolute -top-3 md:-top-6 text-2xl font-bold text-[#FF8900] z-30">shoplogo</h1>

                <div className="absolute w-[500px] h-[350px] md:w-[665px] md:h-[416px] bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bgimage})`
                    }}
                />

                <div className={`relative bg-white p-5 rounded-lg shadow-lg w-[340px] mt-8
                    ${isLogin ? 'min-h-[420px]' : 'min-h-[480px]'} z-10`}>
                    {isLogin ?
                        <LoginForm prefilledUsername={prefilledUsername} /> :
                        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
                    }

                    <div className="flex items-center my-3">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-2 text-gray-400 text-xs">Hoặc</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button className="flex h-9 text-sm font-bold justify-center items-center bg-[#F2F4F5] w-full border border-gray-300 rounded">
                        <img src={googleIcon} alt="Google" className="mr-2 h-5 w-5" />
                        Tiếp tục với Google
                    </button>

                    <p className="text-center text-xs font-semibold mt-3">
                        {isLogin ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
                        <button onClick={handleToggleForm} className="text-[#FF8900] ml-1">
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