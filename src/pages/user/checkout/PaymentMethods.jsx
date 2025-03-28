import { AiOutlineCheck } from "react-icons/ai";
import { paymentMethods } from "./data/checkoutData";

const PaymentMethods = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="bg-white rounded-lg h-full p-4 border shadow-md">
      <h2 className="text-lg font-semibold mb-2">Phương thức thanh toán</h2>
      <div className="space-y-1">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 rounded"
          >
            <div className="relative flex items-center">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={() => onSelectMethod(method.id)}
                className="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 
                          checked:border-[#FF8900] checked:bg-[#FF8900] 
                          transition-all duration-200 cursor-pointer"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {selectedMethod === method.id && (
                  <AiOutlineCheck className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
            <img src={`${process.env.REACT_APP_CDN_URL}${method.icon}`} alt={method.name} className="h-6 w-6" />
            <span className="text-base">{method.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods
