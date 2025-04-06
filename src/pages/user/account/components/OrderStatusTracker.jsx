// src/pages/user/account/components/OrderStatusTracker.jsx
import React from 'react';
import {
    AiOutlineAudit,
    AiOutlineCar,
    AiOutlineCheckCircle,
    AiOutlineShoppingCart
} from 'react-icons/ai';

const OrderStatusTracker = ({ status }) => {
    let currentStep = 0;

    if (status === 'PENDING') currentStep = 1;
    else if (status === 'SHIPPING') currentStep = 2;
    else if (status === 'COMPLETED') currentStep = 3;

    const steps = [
        {
            icon: AiOutlineShoppingCart,
            label: "Đơn hàng đã đặt",
            status: 0
        },
        {
            icon: AiOutlineAudit,
            label: "Chờ xác nhận",
            status: 1
        },
        {
            icon: AiOutlineCar,
            label: "Đang giao tới bạn",
            status: 2
        },
        {
            icon: AiOutlineCheckCircle,
            label: "Giao hàng thành công",
            status: 3
        },
    ];

    return (
        <div className="mt-4">
            <div className="grid grid-cols-4 gap-4 text-center">
                {steps.map((step, index) => {
                    // Determine step state
                    const isPassed = step.status < currentStep;
                    const isCurrent = step.status === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center relative">
                            {/* Connecting line to previous step */}
                            {index > 0 && (
                                <div className="absolute" style={{ top: '13px', right: '50%', width: '100%', height: '6px' }}>
                                    <div
                                        className={`w-full h-full rounded-full
                                            ${steps[index - 1].status < currentStep - 1 || status === 'COMPLETED' ? 'bg-green-500' :
                                                step.status === currentStep && steps[index - 1].status === currentStep - 1 ? 'bg-gray-200 overflow-hidden' :
                                                    'bg-gray-300'}`}
                                    >
                                        {step.status === currentStep && steps[index - 1].status === currentStep - 1 && status !== 'COMPLETED' && (
                                            <div className="relative w-full h-full">
                                                <div className="absolute h-full w-3 bg-green-600 rounded-full animate-[loadingDot1_2.5s_ease-in-out_infinite]"></div>
                                                <div className="absolute h-full w-5 bg-green-500 rounded-full animate-[loadingDot2_2.5s_ease-in-out_infinite_0.2s]"></div>
                                                <div className="absolute h-full w-3 bg-green-400 rounded-full animate-[loadingDot3_2.5s_ease-in-out_infinite_0.4s]"></div>
                                                <div className="absolute h-full w-4 bg-green-500 rounded-full animate-[loadingDot4_2.5s_ease-in-out_infinite_0.6s]"></div>
                                                <div className="absolute h-full w-2 bg-green-600 rounded-full animate-[loadingDot5_2.5s_ease-in-out_infinite_0.8s]"></div>
                                                <div className="absolute h-full w-3 bg-green-400 rounded-full animate-[loadingDot1_2.5s_ease-in-out_infinite_1s]"></div>
                                                <div className="absolute h-full w-2 bg-green-500 rounded-full animate-[loadingDot2_2.5s_ease-in-out_infinite_1.2s]"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {/* Step icon */}
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2
                                    ${isPassed ? 'bg-green-500' :
                                        isCurrent ? 'bg-white border-green-500 shadow-lg animate-[bounce_2s_ease-in-out_infinite] ring-2 ring-green-500 ring-opacity-50' :
                                            'bg-gray-300'}`}
                            >
                                <step.icon
                                    className={`text-lg ${isPassed ? 'text-white' :
                                        isCurrent ? 'text-green-500 animate-[spin_3s_linear_infinite]' :
                                            'text-gray-500'}`}
                                />
                            </div>

                            {/* Step label */}
                            <span className={`text-base font-bold ${isPassed || isCurrent ? '' : 'text-gray-500'}`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderStatusTracker;