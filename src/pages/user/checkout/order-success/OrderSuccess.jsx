import React, { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { orderData } from '../data/orderData';

const OrderSuccess = ({ orderId }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };
  
  return (
    <div className="max-w-7xl mt-3 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-2 w-full h-[70%] bg-cover bg-center" style={{ backgroundImage: `url(${process.env.REACT_APP_CDN_URL}auzpiagtf0lw7dn5ze9s.png)` }}>
        <div className="relative h-[200px] sm:h-[250px] w-full flex justify-center">
          <img
            src={`${process.env.REACT_APP_CDN_URL}wp6mbiwjivcpv75zs0a1.png`}
            alt="Success Icon"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain max-w-[250px]"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Đặt hàng thành công!
        </h1>

        {/* Button to continue shopping */}
        <div className="flex justify-center text-sm">
          <button
            onClick={handleContinueShopping}
            className="bg-[#FF8900]  mt-4 sm:mt-6 p-3 sm:p-4 hover:bg-orange-600  text-white rounded-md flex items-center gap-2 text-[16px] sm:text-[18px]"
          >
            <FaShoppingBag className="h-5 w-5" />
            Tiếp tục mua sắm
          </button>
        </div>
      </div>

      {/* Order Information */}
      <div className='font-bold text-xl sm:text-2xl mb-3'>
        Đơn hàng
      </div>
      <div className="rounded-lg bg-gray-100 text-base">
        <div className='w-[97%] m-auto'>
          <div className="flex items-center gap-5 py-2 px-1">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Mã đơn hàng</span>
              <span className="font-medium">{orderId || orderData?.id}</span>
            </div>
            <div className="flex text-[#FF8900]  items-center gap-3 font-bold">
              <button className="text-sm" onClick={() => { }}>
                Xem chi tiết
              </button>
              <AiOutlineArrowRight className="text-xl" />
            </div>
          </div>

          <div className="m-auto w-full rounded-sm">
            <div className="p-4 space-y-4 bg-white">
              {(showAllProducts ? orderData?.products : orderData?.products.slice(0, 2)).map((product) => (
                <div key={product.id} className="flex gap-2 items-center">
                  <img src={`${process.env.REACT_APP_CDN_URL}uzgvdswqumfuzs8zw7zf.png`} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold">{product.name}</p>
                    <div className="flex items-center mt-1 gap-4">
                      <span className="text-gray-500 text-sm">{product.color || ''}</span>
                      <span className="text-gray-500 text-sm">x{product.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {orderData?.products.length > 2 && !showAllProducts && (
            <button
              className="w-full text-center py-2"
              onClick={() => setShowAllProducts(true)}
            >
              <span className="text-gray-600 font-bold flex items-center justify-center gap-1">
                Xem thêm {orderData?.products.length - 2} sản phẩm
                <AiOutlineArrowRight className="w-4 h-4" />
              </span>
            </button>
          )}

          {showAllProducts && (
            <button
              className="w-full text-center py-2"
              onClick={() => setShowAllProducts(false)}
            >
              <span className="text-gray-600 font-bold flex items-center text-sm justify-center gap-1">
                Thu gọn
                <AiOutlineArrowRight className="w-4 h-4 transform rotate-180" />
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 border bg-white rounded-b-lg mt-4 mb-3">
        <div className="flex gap-5 items-center justify-center">
          <span className="text-gray-600 font-bold text-[16px] sm:text-[18px]">Tổng tiền</span>
          <div className="flex gap-2 text-[24px] sm:text-[32px] font-bold text-[#FF8900]">
            <span>{orderData?.totalPrice.toLocaleString()}</span>
            <span className="underline">đ</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrderSuccess;