export const OrderStatus = {
    PENDING: "PENDING",
    SHIPPING: "SHIPPING",
    COMPLETED: "COMPLETED",
    CANCELED: "CANCELED"
};

export const OrderStatusOptions = [
    { id: OrderStatus.PENDING, name: "Đang chờ" },
    { id: OrderStatus.SHIPPING, name: "Đang giao" },
    { id: OrderStatus.COMPLETED, name: "Hoàn thành" },
    { id: OrderStatus.CANCELED, name: "Đã hủy" }
];

export const PaymentMethods = {
    COD: "COD",
    MOMO: "MOMO",
    ZALOPAY: "ZALOPAY"
};

export const PaymentMethodOptions = [
    { id: PaymentMethods.COD, name: "COD" },
    { id: PaymentMethods.MOMO, name: "MoMo E-Wallet" },
    { id: PaymentMethods.ZALOPAY, name: "ZaloPay E-Wallet" }
];

export const DeliveryMethods = {
    STANDARD: "STANDARD",
    VIETTEL_POST: "VIETTEL_POST",
    FAST_DELIVERY: "FAST_DELIVERY",
    JT_EXPRESS: "JT_EXPRESS"
};

export const DeliveryMethodOptions = [
    { id: DeliveryMethods.STANDARD, name: "Standard" },
    { id: DeliveryMethods.VIETTEL_POST, name: "Viettel Post" },
    { id: DeliveryMethods.FAST_DELIVERY, name: "Giao hàng nhanh" },
    { id: DeliveryMethods.JT_EXPRESS, name: "J&T Express" }
];