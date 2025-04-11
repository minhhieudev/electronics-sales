// src/components/notification/AddToCartNotification.jsx
import { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const AddToCartNotification = ({ product, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Appear with a slight delay for better effect
    setTimeout(() => setIsVisible(true), 50);

    // Auto close after 3 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Call onClose after fade out animation
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 bg-white shadow-lg rounded-lg border border-gray-200 px-4 py-3 flex items-center gap-3 max-w-md transform transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
    >
      <div className="bg-green-100 rounded-full p-1 flex-shrink-0">
        <AiOutlineCheck className="text-green-600 h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">Đã thêm vào giỏ hàng!</p>
        <p className="text-gray-500 text-sm mt-0.5">{product?.name} ({product?.color})</p>
      </div>
      <img
        src={product?.imageUrl}
        alt={product?.name}
        className="h-12 w-12 object-cover rounded-md flex-shrink-0"
      />
    </div>
  );
};

export default AddToCartNotification;