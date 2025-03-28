import { AiOutlineCheck } from "react-icons/ai";
import { shippingMethods } from "./data/checkoutData";

const ShippingMethods = ({ selectedMethod, onSelectMethod }) => {
  return (
    <div className="bg-white rounded-lg h-full p-4 border shadow-md">
      <h2 className="text-lg font-semibold mb-2">Vận chuyển</h2>
      <div className="space-y-1">
        {shippingMethods.map((method) => (
          <label
            key={method.id}
            className="flex items-center justify-between p-2 border rounded cursor-pointer hover:border-orange-500"
          >
            <div className="flex items-center gap-3 text-base">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="shipping"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => onSelectMethod(method.id)}
                  className="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 
                            checked:border-[#FF8900]  checked:bg-[#FF8900]  
                            transition-all duration-200 cursor-pointer"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  {selectedMethod === method.id && (
                    <AiOutlineCheck className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              <img src={`${process.env.REACT_APP_CDN_URL}${method.logo}`} alt={method.name} className="h-5" />
              <div className="text-sm font-medium">
                <div>{method.name}</div>
                <div className="text-gray-500 font-medium text-[12px]">{method.time}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{method.price.toLocaleString()}</span>
              <span className="text-gray-500 underline">đ</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingMethods