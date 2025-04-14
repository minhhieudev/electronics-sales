import React, { useState } from 'react';
import { FaSearch, FaHeadset, FaRegQuestionCircle, FaRegLightbulb, FaPhone, FaEnvelope, FaComments, FaMapMarkerAlt, FaShippingFast, FaWallet, FaExchangeAlt, FaClipboardCheck, FaArrowRight, FaShoppingCart, FaBoxOpen } from 'react-icons/fa';

const HelpPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    
    // State cho các FAQ items
    const [openFaqId, setOpenFaqId] = useState(null);

    const toggleFaq = (id) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // FAQ Data
    const faqs = [
        {
            id: 1,
            question: "Làm thế nào để đặt hàng?",
            answer: "Để đặt hàng, bạn có thể thực hiện theo các bước sau:\n1. Chọn sản phẩm bạn muốn mua\n2. Thêm vào giỏ hàng\n3. Kiểm tra giỏ hàng và số lượng\n4. Nhấn 'Thanh toán'\n5. Điền thông tin giao hàng\n6. Chọn phương thức thanh toán\n7. Xác nhận đơn hàng"
        },
        {
            id: 2,
            question: "Các phương thức thanh toán được chấp nhận?",
            answer: "Chúng tôi chấp nhận nhiều phương thức thanh toán khác nhau:\n- Thẻ tín dụng/ghi nợ (Visa, Mastercard)\n- Chuyển khoản ngân hàng\n- Ví điện tử (Momo, ZaloPay, VNPay)\n- Thanh toán khi nhận hàng (COD)\n- Trả góp 0% qua các đối tác ngân hàng"
        },
        {
            id: 3,
            question: "Chính sách đổi trả như thế nào?",
            answer: "Chính sách đổi trả của chúng tôi bao gồm:\n- Thời gian đổi trả: 7 ngày kể từ ngày nhận hàng\n- Điều kiện: Sản phẩm còn nguyên vẹn, đầy đủ tem mác\n- Hoàn tiền: 100% giá trị sản phẩm nếu lỗi từ nhà sản xuất\n- Phí vận chuyển đổi trả: Miễn phí nếu lỗi từ sản phẩm"
        },
        {
            id: 4,
            question: "Thời gian giao hàng dự kiến?",
            answer: "Thời gian giao hàng phụ thuộc vào khu vực:\n- Nội thành: 1-2 ngày\n- Các tỉnh lân cận: 2-3 ngày\n- Tỉnh xa: 3-5 ngày\n* Lưu ý: Thời gian có thể thay đổi tùy theo điều kiện thực tế"
        },
        {
            id: 5,
            question: "Làm sao để theo dõi đơn hàng?",
            answer: "Bạn có thể theo dõi đơn hàng bằng các cách:\n1. Đăng nhập vào tài khoản và vào mục 'Đơn hàng của tôi'\n2. Sử dụng mã đơn hàng được gửi qua email\n3. Liên hệ hotline hỗ trợ để được kiểm tra trực tiếp"
        }
    ];

    // Contact Data
    const contactMethods = [
        {
            icon: <FaPhone className="text-2xl text-red-500" />,
            title: "Hotline",
            content: "1800-xxxx-xxx",
            subContent: "Hoạt động: 8:00 - 22:00 mỗi ngày",
            color: "from-red-50 to-orange-50"
        },
        {
            icon: <FaEnvelope className="text-2xl text-blue-500" />,
            title: "Email hỗ trợ",
            content: "support@example.com",
            subContent: "Phản hồi trong vòng 24h",
            color: "from-blue-50 to-indigo-50"
        },
        {
            icon: <FaComments className="text-2xl text-green-500" />,
            title: "Live Chat",
            content: "Chat trực tuyến",
            subContent: "Hoạt động: 24/7",
            color: "from-green-50 to-teal-50"
        },
        {
            icon: <FaMapMarkerAlt className="text-2xl text-purple-500" />,
            title: "Văn phòng",
            content: "123 Đường ABC, Quận XYZ",
            subContent: "Giờ làm việc: T2-T6 (9:00-17:00)",
            color: "from-purple-50 to-pink-50"
        }
    ];

    // Guide Data
    const guides = [
        {
            icon: <FaShoppingCart className="text-2xl text-blue-600" />,
            title: "Hướng dẫn đặt hàng",
            description: "Quy trình đặt hàng chi tiết từ A-Z",
            bgColor: "bg-blue-50",
            accentColor: "border-blue-600",
            steps: [
                "Chọn sản phẩm yêu thích",
                "Thêm vào giỏ hàng",
                "Kiểm tra giỏ hàng",
                "Điền thông tin giao hàng",
                "Chọn phương thức thanh toán"
            ]
        },
        {
            icon: <FaBoxOpen className="text-2xl text-green-600" />,
            title: "Theo dõi đơn hàng",
            description: "Kiểm tra trạng thái đơn hàng của bạn",
            bgColor: "bg-green-50",
            accentColor: "border-green-600",
            steps: [
                "Đăng nhập vào tài khoản",
                "Truy cập mục Đơn hàng",
                "Nhập mã đơn hàng",
                "Xem chi tiết trạng thái"
            ]
        },
        {
            icon: <FaExchangeAlt className="text-2xl text-orange-600" />,
            title: "Quy trình đổi trả",
            description: "Hướng dẫn đổi trả sản phẩm",
            bgColor: "bg-orange-50",
            accentColor: "border-orange-600",
            steps: [
                "Kiểm tra điều kiện đổi trả",
                "Liên hệ bộ phận CSKH",
                "Đóng gói sản phẩm",
                "Gửi trả và nhận hoàn tiền"
            ]
        }
    ];

    // Quick Links
    const quickLinks = [
        { icon: <FaClipboardCheck />, text: 'Đặt hàng' },
        { icon: <FaWallet />, text: 'Thanh toán' },
        { icon: <FaShippingFast />, text: 'Vận chuyển' },
        { icon: <FaExchangeAlt />, text: 'Đổi trả' }
    ];

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-lg p-6 md:p-8 shadow-lg">
            {/* Header with wave design */}
            <div className="relative mb-10 bg-gradient-to-r from-blue-600 to-orange-500 p-8 rounded-lg text-white overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-16 -mb-1">
                        <path fill="white" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Trung tâm hỗ trợ</h1>
                    <p className="text-lg opacity-90 max-w-2xl">
                        Chào mừng bạn đến với trung tâm trợ giúp. Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn 24/7.
                    </p>
                </div>
            </div>

            {/* Search Bar with animation */}
            <div className="mb-8 relative">
                <div className="relative max-w-3xl mx-auto">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Nhập câu hỏi của bạn..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-5 pl-12 pr-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-md transition-all duration-300 text-lg"
                    />
                    <button
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-8 border-b border-gray-200">
                <div className="flex flex-wrap -mb-px">
                    <button
                        className={`mr-2 py-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        onClick={() => handleTabChange('all')}
                    >
                        Tất cả
                    </button>
                    <button
                        className={`mr-2 py-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'faq' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        onClick={() => handleTabChange('faq')}
                    >
                        Câu hỏi thường gặp
                    </button>
                    <button
                        className={`mr-2 py-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'guide' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        onClick={() => handleTabChange('guide')}
                    >
                        Hướng dẫn
                    </button>
                    <button
                        className={`mr-2 py-3 px-4 font-medium text-lg border-b-2 transition-colors ${activeTab === 'contact' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        onClick={() => handleTabChange('contact')}
                    >
                        Liên hệ
                    </button>
                </div>
            </div>

            {/* Quick Links - Card Style */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {quickLinks.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 text-center rounded-xl bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 shadow-md transition-all cursor-pointer transform hover:scale-105 hover:shadow-lg"
                    >
                        <div className="text-2xl mb-2 text-blue-500 flex justify-center">
                            {item.icon}
                        </div>
                        <p className="font-medium">{item.text}</p>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="space-y-16">
                {/* FAQ Section */}
                {(activeTab === 'all' || activeTab === 'faq') && (
                    <div>
                        <div className="flex items-center mb-6">
                            <FaRegQuestionCircle className="text-2xl text-blue-600 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-800">Câu hỏi thường gặp</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="space-y-2">
                                {faqs.map((faq) => (
                                    <div key={faq.id} className="border-b border-gray-200 py-4">
                                        <button 
                                            className="w-full flex justify-between items-center text-left hover:text-blue-600 transition-colors"
                                            onClick={() => toggleFaq(faq.id)}
                                        >
                                            <h3 className="font-medium text-lg text-gray-800">{faq.question}</h3>
                                            <div
                                                className={`bg-blue-100 text-blue-600 w-8 h-8 flex items-center justify-center rounded-full transform transition-transform duration-300 ${openFaqId === faq.id ? 'rotate-180' : ''}`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                                                </svg>
                                            </div>
                                        </button>
                                        
                                        <div className={`mt-3 text-gray-600 bg-gray-50 p-4 rounded-lg transition-all duration-300 overflow-hidden ${openFaqId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            {faq.answer.split('\n').map((text, i) => (
                                                <p key={i} className="mb-2">{text}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Section */}
                {(activeTab === 'all' || activeTab === 'contact') && (
                    <div>
                        <div className="flex items-center mb-6">
                            <FaHeadset className="text-2xl text-blue-600 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-800">Liên hệ hỗ trợ</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="grid md:grid-cols-2 gap-6">
                                {contactMethods.map((method, index) => (
                                    <div 
                                        key={index} 
                                        className={`bg-gradient-to-br ${method.color} p-6 rounded-lg shadow-md transition-all transform hover:-translate-y-1 hover:shadow-lg`}
                                    >
                                        <div className="flex items-center mb-3">
                                            {method.icon}
                                            <h3 className="font-medium text-lg ml-3">{method.title}</h3>
                                        </div>
                                        <p className="text-gray-800 font-medium text-lg">{method.content}</p>
                                        <p className="text-gray-600 text-sm mt-2">{method.subContent}</p>
                                        <button
                                            className="mt-4 px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
                                        >
                                            Liên hệ ngay
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Guide Section */}
                {(activeTab === 'all' || activeTab === 'guide') && (
                    <div>
                        <div className="flex items-center mb-6">
                            <FaRegLightbulb className="text-2xl text-blue-600 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-800">Hướng dẫn chi tiết</h2>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <div className="grid md:grid-cols-3 gap-6 h-full">
                                {guides.map((guide, index) => (
                                    <div 
                                        key={index} 
                                        className={`${guide.bgColor} border-t-4 ${guide.accentColor} p-6 rounded-lg shadow-md transition-all h-full transform hover:-translate-y-2 hover:shadow-lg`}
                                    >
                                        <div className="flex items-center mb-4">
                                            {guide.icon}
                                            <h3 className="font-medium text-lg ml-3">{guide.title}</h3>
                                        </div>
                                        <p className="text-gray-600 mb-4">{guide.description}</p>
                                        {guide.steps && (
                                            <div className="space-y-2">
                                                {guide.steps.map((step, index) => (
                                                    <div key={index} className="flex items-start bg-white p-3 rounded-lg">
                                                        <span className={`${guide.accentColor.replace('border', 'bg')} text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>{index + 1}</span>
                                                        <p className="text-gray-700">{step}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <button
                                            className={`mt-4 text-${guide.accentColor.split('-')[2]} flex items-center font-medium`}
                                        >
                                            Xem chi tiết
                                            <FaArrowRight className="ml-2" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HelpPage;