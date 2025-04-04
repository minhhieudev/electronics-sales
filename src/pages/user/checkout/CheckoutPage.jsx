import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { shippingMethods } from './data/checkoutData';
import OrderSideInfo from './OrderSideInfo';
import PaymentMethods from './PaymentMethods';
import ProductList from './ProductList';
import ShippingMethods from './ShippingMethods';

const CheckoutPage = () => {
  const location = useLocation();

  const orderItems = useMemo(() => location.state?.orderItems || [], [location.state?.orderItems]);

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [shippingMethod, setShippingMethod] = useState('FAST_DELIVERY');

  const [summary, setSummary] = useState({
    subtotal: 0,
    shippingFee: shippingMethods[0].price,
    total: shippingMethods[0].price
  });

  useEffect(() => {
    const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const selectedMethod = shippingMethods.find(method => method.id === shippingMethod);

    if (selectedMethod) {
      setSummary({
        subtotal,
        shippingFee: selectedMethod.price,
        total: subtotal + selectedMethod.price
      });
    } else {
      setSummary(prevSummary => ({
        ...prevSummary,
        shippingFee: 0,
        total: subtotal
      }));
    }
  }, [shippingMethod, orderItems]);

  return (
    <div className="mt-6">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-2">
        {/* Header */}
        <div className="mb-3">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Thanh toán</h1>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-full">
                <PaymentMethods
                  selectedMethod={paymentMethod}
                  onSelectMethod={setPaymentMethod}
                />
              </div>
              <div className="h-full">
                <ShippingMethods
                  selectedMethod={shippingMethod}
                  onSelectMethod={setShippingMethod}
                />
              </div>
            </div>

            {/* Product List - Desktop */}
            <div className="hidden lg:block">
              <ProductList items={orderItems} />
            </div>
          </div>

          <div className="lg:w-[310px]">
            {/* Product List - Mobile */}
            <div className="lg:hidden">
              <ProductList items={orderItems} />
            </div>

            {/* Sticky Order Summary */}
            <div className="lg:sticky lg:top-6 mt-4 lg:mt-0">
              <OrderSideInfo
                orderItems={orderItems}
                summary={summary}
                paymentMethod={paymentMethod}
                shippingMethod={shippingMethod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
