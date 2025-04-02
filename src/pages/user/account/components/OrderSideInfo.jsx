import { AiOutlineEnvironment } from 'react-icons/ai';

const OrderSideInfo = ({
  shippingInfo: externalShippingInfo = null,
  orderItems: externalOrderItems = null,
  summary: externalSummary = null,
}) => {
  // Dữ liệu mẫu mặc định
  const defaultShippingInfo = {
    name: "Võ Minh Hiếu",
    phone: "0123456789",
    type: "Nhà riêng",
    address: "Đường số 1, Khu vực 2 - Phường Ghềnh Ráng, tp Quy Nhơn, tỉnh Bình Định"
  };

  const defaultOrderItems = [];

  const defaultSummary = {
    shipping: {
      subtotal: 0,
      fee: 0
    },
    total: 0
  };

  // Sử dụng dữ liệu từ props nếu có, ngược lại sử dụng dữ liệu mặc định
  const shippingInfo = externalShippingInfo || defaultShippingInfo;
  const orderItems = externalOrderItems || defaultOrderItems;
  const summary = externalSummary || defaultSummary;

  return (
    <div className="bg-white rounded-lg shadow-md">
        {/* Shipping Info Section */}
        <div className="p-4 border-b">
            <div className="mb-3 flex items-center justify-center gap-1">
                {/* <img
                    src={vitri}
                    alt="location"
                    className="h-5 w-5 object-contain"
                /> */}
                 <AiOutlineEnvironment className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <h2 className="font-semibold text-gray-500 text-lg">Ship đến</h2>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{shippingInfo.name}</span>
                    <span className="font-semibold text-gray-800">{shippingInfo.phone}</span>
                </div>
                <div>
                    <div className="inline-block bg-green-100 text-green-600 text-sm px-3 py-1 rounded-md mb-2">
                        {shippingInfo.type}
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed">
                        {shippingInfo.address}
                    </div>
                </div>
            </div>
        </div>

        {/* Order Summary Section */}
        <div className="p-4">
            <div className="space-y-4">
                <div className="flex justify-between items-center text-base">
                    <span className="text-gray-600">Tạm tính</span>
                    <div className="flex items-center gap-1">
                        <span className="font-medium">{summary.shipping.subtotal.toLocaleString()}</span>
                        <span className="text-gray-500">đ</span>
                    </div>
                </div>

                <div className="flex justify-between items-center text-base">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <div className="flex items-center gap-1">
                        <span className="font-medium">{summary.shipping.fee.toLocaleString()}</span>
                        <span className="text-gray-500">đ</span>
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Tổng tiền</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-orange-500 text-2xl font-bold">
                                {summary.total.toLocaleString()}
                            </span>
                            <span className="text-orange-500">đ</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Button */}
            <div className="mt-6">
                <button
                    onClick={() => {/* Handle checkout */}}
                    className="w-full py-4 bg-orange-500 text-white text-lg font-medium rounded-lg hover:bg-orange-600 transition-colors"
                >
                    {orderItems.length > 0 ? (
                        <>Thanh toán ({orderItems.length})</>
                    ) : (
                        'Thanh toán'
                    )}
                </button>
            </div>
        </div>
    </div>
  );
};

export default OrderSideInfo; 