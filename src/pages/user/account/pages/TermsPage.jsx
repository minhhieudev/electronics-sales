import React, { useState, useEffect, useRef } from 'react';
import { FaBook, FaUserCircle, FaShoppingCart, FaExchangeAlt, FaCopyright, FaLock, FaBalanceScale, FaEdit, FaGavel, FaEnvelope, FaChevronRight, FaCheck, FaArrowUp } from 'react-icons/fa';

const TermsPage = () => {
    const [activeSection, setActiveSection] = useState(0);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const sectionRefs = useRef([]);
    const mainContentRef = useRef(null);

    const sections = [
        {
            title: "1. Giới thiệu",
            icon: <FaBook />,
            content: [
                "Chào mừng bạn đến với nền tảng thương mại điện tử của chúng tôi. Các Điều khoản Dịch vụ này ('Điều khoản') điều chỉnh việc bạn truy cập và sử dụng website, ứng dụng di động và các dịch vụ trực tuyến khác của chúng tôi (gọi chung là 'Dịch vụ').",
                "Bằng việc truy cập hoặc sử dụng Dịch vụ của chúng tôi, bạn đồng ý bị ràng buộc bởi các Điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào của các Điều khoản này, bạn không được phép truy cập hoặc sử dụng Dịch vụ của chúng tôi."
            ]
        },
        {
            title: "2. Tài khoản người dùng",
            icon: <FaUserCircle />,
            content: [
                "Để sử dụng một số tính năng của Dịch vụ, bạn có thể cần phải đăng ký một tài khoản. Bạn đồng ý cung cấp thông tin chính xác, đầy đủ và cập nhật trong quá trình đăng ký và cam kết duy trì tính chính xác của thông tin này.",
                "Bạn chịu trách nhiệm bảo mật mật khẩu tài khoản của mình và cho tất cả các hoạt động diễn ra dưới tài khoản của bạn. Bạn đồng ý thông báo ngay cho chúng tôi về bất kỳ việc sử dụng trái phép tài khoản của bạn hoặc bất kỳ vi phạm bảo mật nào khác.",
                "Chúng tôi có quyền đình chỉ hoặc chấm dứt tài khoản của bạn và quyền truy cập vào Dịch vụ của chúng tôi nếu bạn vi phạm bất kỳ điều khoản nào trong Điều khoản này."
            ]
        },
        {
            title: "3. Mua hàng và thanh toán",
            icon: <FaShoppingCart />,
            content: [
                "Khi bạn thực hiện mua hàng thông qua Dịch vụ của chúng tôi, bạn đồng ý cung cấp thông tin thanh toán chính xác và đầy đủ. Chúng tôi có quyền từ chối hoặc hủy đơn đặt hàng của bạn vào bất kỳ lúc nào vì bất kỳ lý do gì.",
                "Giá cả sản phẩm có thể thay đổi mà không cần thông báo trước. Chúng tôi có quyền từ chối hoặc hủy bỏ đơn đặt hàng trong trường hợp lỗi định giá hoặc thông tin sản phẩm không chính xác.",
                "Bạn đồng ý thanh toán tất cả các khoản phí phát sinh liên quan đến việc mua hàng của bạn, bao gồm cả phí vận chuyển và thuế áp dụng."
            ]
        },
        {
            title: "4. Chính sách đổi trả và hoàn tiền",
            icon: <FaExchangeAlt />,
            content: [
                "Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng, với điều kiện sản phẩm còn nguyên vẹn, chưa qua sử dụng và còn đầy đủ bao bì, nhãn mác.",
                "Đối với sản phẩm bị lỗi do nhà sản xuất, chúng tôi sẽ chịu toàn bộ chi phí đổi trả và vận chuyển. Đối với trường hợp khách hàng thay đổi ý định mua hàng, khách hàng sẽ chịu chi phí vận chuyển cho việc đổi trả.",
                "Thời gian hoàn tiền sẽ phụ thuộc vào phương thức thanh toán của bạn, thông thường từ 5-15 ngày làm việc kể từ khi chúng tôi nhận được sản phẩm trả lại."
            ]
        },
        {
            title: "5. Quyền sở hữu trí tuệ",
            icon: <FaCopyright />,
            content: [
                "Dịch vụ và tất cả nội dung liên quan, bao gồm nhưng không giới hạn ở văn bản, hình ảnh, đồ họa, logo, biểu tượng, âm thanh, phần mềm và thiết kế giao diện người dùng, đều thuộc sở hữu của chúng tôi hoặc các bên cấp phép cho chúng tôi.",
                "Bạn không được sao chép, sửa đổi, phân phối, bán, cho thuê, cấp phép lại, tạo tác phẩm phái sinh, hiển thị công khai, trình diễn công khai, xuất bản, điều chỉnh, khai thác hoặc sử dụng bất kỳ phần nào của Dịch vụ mà không có sự cho phép rõ ràng bằng văn bản từ chúng tôi."
            ]
        },
        {
            title: "6. Bảo mật thông tin",
            icon: <FaLock />,
            content: [
                "Chúng tôi coi trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân của bạn. Việc sử dụng Dịch vụ của chúng tôi cũng tuân theo Chính sách Bảo mật của chúng tôi.",
                "Chúng tôi thu thập và xử lý thông tin cá nhân của bạn theo Chính sách Bảo mật của chúng tôi, bạn có thể xem đầy đủ tại website của chúng tôi.",
                "Bạn đồng ý rằng chúng tôi có thể sử dụng dữ liệu cá nhân được cung cấp cho chúng tôi để liên hệ với bạn về Dịch vụ của chúng tôi và để gửi cho bạn thông tin về các sản phẩm hoặc dịch vụ mà chúng tôi tin rằng có thể quan tâm đến bạn."
            ]
        },
        {
            title: "7. Giới hạn trách nhiệm",
            icon: <FaBalanceScale />,
            content: [
                "Trong phạm vi tối đa được pháp luật cho phép, chúng tôi sẽ không chịu trách nhiệm đối với bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc mang tính trừng phạt nào, bao gồm nhưng không giới hạn ở mất lợi nhuận, dữ liệu, việc sử dụng hoặc bất kỳ tổn thất vô hình nào khác.",
                "Trách nhiệm tổng cộng của chúng tôi đối với bất kỳ khiếu nại nào phát sinh từ hoặc liên quan đến Dịch vụ sẽ không vượt quá số tiền bạn đã thanh toán cho Dịch vụ trong sáu tháng trước khi khiếu nại phát sinh."
            ]
        },
        {
            title: "8. Thay đổi điều khoản",
            icon: <FaEdit />,
            content: [
                "Chúng tôi có quyền sửa đổi hoặc thay thế các Điều khoản này vào bất kỳ lúc nào. Chúng tôi sẽ cố gắng thông báo cho bạn về bất kỳ thay đổi quan trọng nào bằng cách đăng thông báo trên Dịch vụ của chúng tôi hoặc gửi email đến địa chỉ email được liên kết với tài khoản của bạn.",
                "Việc bạn tiếp tục sử dụng Dịch vụ sau khi chúng tôi đăng các thay đổi sẽ cấu thành việc bạn chấp nhận và đồng ý với các thay đổi đó. Nếu bạn không đồng ý với các điều khoản mới, bạn không được phép tiếp tục sử dụng Dịch vụ."
            ]
        },
        {
            title: "9. Luật áp dụng",
            icon: <FaGavel />,
            content: [
                "Các Điều khoản này sẽ được điều chỉnh và giải thích theo luật pháp Việt Nam, mà không liên quan đến các nguyên tắc xung đột pháp luật.",
                "Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến các Điều khoản này hoặc Dịch vụ của chúng tôi sẽ được giải quyết thông qua thương lượng thiện chí. Nếu không thể giải quyết được tranh chấp thông qua thương lượng, tranh chấp sẽ được đưa ra giải quyết tại tòa án có thẩm quyền tại Việt Nam."
            ]
        },
        {
            title: "10. Liên hệ",
            icon: <FaEnvelope />,
            content: [
                "Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng liên hệ với chúng tôi qua email: legal@example.com hoặc qua địa chỉ: 123 Đường ABC, Quận XYZ, Thành phố HCM, Việt Nam.",
                "Chúng tôi sẽ cố gắng phản hồi mọi thắc mắc của bạn trong thời gian sớm nhất."
            ]
        }
    ];

    // Scroll to active section when it changes - với offset
    useEffect(() => {
        if (sectionRefs.current[activeSection]) {
            const yOffset = -20; // Điều chỉnh offset này để phù hợp
            const element = sectionRefs.current[activeSection];
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            // Nếu sử dụng container có overflow-y: auto
            if (mainContentRef.current) {
                mainContentRef.current.scrollTo({
                    top: element.offsetTop - 20, // Điều chỉnh offset này
                    behavior: 'smooth'
                });
            }
        }
    }, [activeSection]);

    // Initialize refs array
    useEffect(() => {
        sectionRefs.current = sectionRefs.current.slice(0, sections.length);
    }, [sections.length]);

    // Handle scroll event to show/hide scroll-to-top button
    useEffect(() => {
        const handleScroll = () => {
            if (mainContentRef.current) {
                const scrollTop = mainContentRef.current.scrollTop;
                setShowScrollToTop(scrollTop > 300);
            }
        };

        const contentElement = mainContentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
            return () => contentElement.removeEventListener('scroll', handleScroll);
        }
    }, []);

    // Scroll to the top of the content
    const scrollToTop = () => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    // Table of Contents Component
    const TableOfContents = () => (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 sticky top-4 shadow-md transition-all duration-300 hover:shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-blue-800 flex items-center">
                <FaBook className="mr-2" /> Mục lục
            </h3>
            <ul className="space-y-1">
                {sections.map((section, index) => (
                    <li key={index}>
                        <button
                            className={`text-left w-full py-2 px-3 rounded-lg transition-all duration-200 flex items-center ${
                                activeSection === index 
                                    ? 'bg-blue-600 text-white font-medium shadow-md' 
                                    : 'hover:bg-blue-100 text-gray-700'
                            }`}
                            onClick={() => setActiveSection(index)}
                        >
                            <span className="mr-2">{section.icon}</span>
                            <span className="flex-1">{section.title}</span>
                            {activeSection === index && <FaChevronRight className="ml-2" />}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    // Terms Section Component - thêm scrollMarginTop
    const TermsSection = ({ title, icon, content }) => (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg" style={{ scrollMarginTop: '20px' }}>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-blue-200 flex items-center text-blue-800">
                <span className="mr-3 text-blue-600">{icon}</span> {title}
            </h2>
            <div className="space-y-4">
                {content.map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed">
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-lg shadow-lg">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-t-lg relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-12 -mb-1">
                        <path fill="white" fillOpacity="0.2" d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,229.3C672,235,768,181,864,154.7C960,128,1056,128,1152,117.3C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-4">Điều khoản dịch vụ</h1>
                    <p className="text-blue-100 max-w-3xl">
                        Cập nhật lần cuối: 15/08/2023 - Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng dịch vụ của chúng tôi.
                    </p>
                    <div className="mt-6 p-4 bg-white bg-opacity-20 backdrop-blur-sm border-l-4 border-white rounded-lg">
                        <p className="text-white">
                            Bằng việc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào của điều khoản, vui lòng không sử dụng dịch vụ.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar with table of contents */}
                    <div className="md:w-1/4">
                        <TableOfContents />
                    </div>
                    {/* Main content - thêm style max-height và overflow-y */}
                    <div 
                        className="md:w-3/4 relative pr-4 custom-scrollbar" 
                        ref={mainContentRef}
                        style={{ 
                            maxHeight: '70vh', 
                            overflowY: 'auto'
                        }}
                    >
                        {sections.map((section, index) => (
                            <div 
                                key={index} 
                                ref={el => sectionRefs.current[index] = el}
                                id={`section-${index}`}
                                style={{ scrollMarginTop: '20px' }} // Thêm thuộc tính này
                            >
                                <TermsSection title={section.title} icon={section.icon} content={section.content} />
                            </div>
                        ))}
                        
                        {/* Agreement section */}
                        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-100">
                            <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                                <FaCheck className="mr-2 text-green-600" /> Xác nhận đồng ý
                            </h3>
                            <p className="mb-6 text-gray-700">
                                Bằng cách sử dụng dịch vụ của chúng tôi, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý với tất cả các điều khoản và điều kiện được nêu trong tài liệu này.
                            </p>
                            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                                <input 
                                    type="checkbox" 
                                    id="agree" 
                                    className="mr-3 h-5 w-5 accent-blue-600 cursor-pointer" 
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                />
                                <label htmlFor="agree" className="text-gray-800 cursor-pointer select-none">
                                    Tôi đã đọc và đồng ý với Điều khoản dịch vụ
                                </label>
                            </div>
                            <button 
                                className={`mt-6 px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center ${isChecked ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg' : 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={!isChecked}
                            >
                                <FaCheck className="mr-2" /> Xác nhận
                            </button>
                        </div>
                        
                        {/* Last updated */}
                        <div className="mt-8 text-center text-gray-500 text-sm p-4 bg-white rounded-lg shadow-sm">
                            <p>Điều khoản dịch vụ này có hiệu lực từ ngày: 15/08/2023</p>
                            <p>Phiên bản: 2.1</p>
                        </div>

                        {/* Scroll to top button */}
                        {showScrollToTop && (
                            <button 
                                onClick={scrollToTop}
                                className="fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
                                aria-label="Cuộn lên đầu trang"
                            >
                                <FaArrowUp />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Custom scrollbar styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
};

export default TermsPage;