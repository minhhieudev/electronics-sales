const productImage = `${process.env.REACT_APP_CDN_URL}uzgvdswqumfuzs8zw7zf`;

export const orderItems = [
    {
        id: 1,
        sku: 'SKU0123456',
        name: 'Điện thoại Iphone giá siêu rẻ, hàng mới đảm bảo chất lượng',
        price: 15000000,
        quantity: 1,
        color: 'Xanh',
        mainImage: productImage
    },
    {
        id: 2,
        sku: 'SKU0123456',
        name: 'Laptop giá siêu rẻ, hàng mới đảm bảo chất lượng',
        price: 10000000,
        quantity: 1,
        color: 'Vàng',
        mainImage: productImage
    },
    {
        id: 3,
        sku: 'SKU0123456',
        name: 'Tai nghe pro, giá siêu rẻ, hàng mới đảm bảo chất lượng',
        price: 1000000,
        quantity: 1,
        color: 'Đỏ',
        mainImage: productImage
    },
];

export default orderItems;