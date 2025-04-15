import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserCart, removeProductFromCart, updateProductInCart } from '../../../app/redux/slices/user/cart.slice';
import CartFooter from './components/CartFooter';
import CartItem from './components/CartItem';
import DeleteDialog from './components/DeleteDialog';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [summary, setSummary] = useState(0);

    const [itemToRemove, setItemToRemove] = useState(null);
    const [copyMessage, setCopyMessage] = useState({ show: false, id: null });

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isMultiDelete, setIsMultiDelete] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const [originalQuantity, setOriginalQuantity] = useState(null);

    // State to track if the quantity is updated
    const [isQuantityUpdated, setIsQuantityUpdated] = useState(false);

    // State to store the items fetched from the server
    const [serverItems, setServerItems] = useState([]);

    // Fetch data from API
    useEffect(() => {
        dispatch(fetchUserCart({
            onSuccess: (data) => {
                setItems(data);
                setServerItems(data);
            }
        }));
    }, [dispatch]);

    // Update summary when items or selectedItems change
    useEffect(() => {
        const total = items.reduce((sum, item) => {
            if (selectedItems.includes(item.id)) {
                return sum + (item.price * item.quantity);
            }
            return sum;
        }, 0);
        setSummary(total);
    }, [selectedItems, items]);

    // Function to handle the "Buy Now"
    const handleBuyNow = () => {
        // Format the selected items for checkout
        const listItems = items
            .filter(item => selectedItems.includes(item.id))
            .map(item => ({
                id: item.productId,
                sku: item.sku,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                color: item.color,
                mainImage: item.mainImageUrl
            }));

        const itemIds = selectedItems.map(itemId => items.find(item => item.id === itemId).id);

        // Navigate to checkout with additional variable indicating it's from cart
        navigate('/checkout', { state: { orderItems: listItems, fromCart: true, itemIds } });
    };

    // Function to handle quantity change
    const handleQuantityChange = (item, newQuantity, localOnly = false) => {
        // Nếu đây là thao tác nhập liệu (localOnly=true), chỉ cập nhật giao diện
        if (localOnly) {
            setItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: newQuantity } : i));
            return;
        }

        const numericQuantity = parseInt(newQuantity, 10);

        // Check for invalid inputs
        if (!item || isNaN(numericQuantity) || numericQuantity > item.stock || numericQuantity === originalQuantity) {
            return;
        }

        // Xử lý khi số lượng là 0
        if (numericQuantity === 0) {
            // Hiển thị hộp thoại xác nhận xóa
            handleShowDeleteDialog(item.id);
            return;
        }

        // Find the server state for this item
        const serverItem = serverItems.find(i => i.id === item.id);

        // Update local state
        setItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: numericQuantity } : i));

        dispatch(updateProductInCart({
            updateData: {
                id: item.productId,
                quantity: numericQuantity,
                color: item.color
            },
            onSuccess: () => {
                // Update server state on success
                setServerItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: numericQuantity } : i));
            },
            onError: () => {
                // Revert to server state on error
                if (serverItem) {
                    setItems(prev => prev.map(i => i.id === item.id ? { ...i, quantity: serverItem.quantity } : i));
                }
            }
        }));
    };

    // Function to handle delete dialog close without confirming
    const handleDeleteCancel = () => {
        // If not deleting multiple products and there is a product being prepared for deletion
        if (!isMultiDelete && itemToRemove) {
            // Find the corresponding product and serverItem
            const item = items.find(i => i.id === itemToRemove);
            const serverItem = serverItems.find(i => i.id === itemToRemove);

            if (item && serverItem) {
                // Revert to the quantity value from the server
                setItems(prev => prev.map(i =>
                    i.id === itemToRemove ? { ...i, quantity: serverItem.quantity } : i
                ));
            }
        }

        // Close the dialog
        setShowDeleteDialog(false);
    };

    // Function to handle delete dialog
    const handleShowDeleteDialog = (id, multiDelete = false) => {
        setItemToRemove(id);
        setIsMultiDelete(multiDelete);
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        if (isMultiDelete) {
            dispatch(removeProductFromCart({
                cartIds: selectedItems,
                onSuccess: () => {
                    setItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
                    setSelectedItems([]);
                    setShowDeleteDialog(false);
                }
            }));
        } else {
            dispatch(removeProductFromCart({
                cartIds: [itemToRemove],
                onSuccess: () => {
                    setItems(prev => prev.filter(item => item.id !== itemToRemove));
                    setSelectedItems(prev => prev.filter(itemId => itemId !== itemToRemove));
                    setShowDeleteDialog(false);
                }
            }));
        }
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);

        // Select only items that are not deleted
        const newSelectedItems = isChecked ? items.filter(item => !item.isDeleted).map(item => item.id) : [];
        setSelectedItems(newSelectedItems);
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prev => {
            const newSelected = prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id];
            setSelectAll(newSelected.length === items.length);
            return newSelected;
        });
    };

    const handleCopy = (sku, e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(sku);
        setCopyMessage({ show: true, id: sku });

        setTimeout(() => {
            setCopyMessage({ show: false, id: null });
        }, 2000);
    };

    return (
        <div className="px-2 sm:px-4 md:px-8 lg:px-16 mx-auto py-4 md:py-6">
            <div className="col-span-12">
                <div className="bg-white rounded-lg p-2 sm:p-3 md:p-4 mb-4 border-b">
                    <div className="grid grid-cols-8 md:grid-cols-12 gap-2 md:gap-3 text-xs sm:text-sm md:text-base text-gray-500">
                        <div className="col-span-4 md:col-span-5">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="rounded accent-[#FF8900]"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                                <span className='text-[16px] md:text-[18px] font-bold text-black'>Tất cả giỏ hàng</span>
                            </label>
                        </div>
                        <div className="hidden md:block md:col-span-2 text-center">Đơn giá</div>
                        <div className="hidden md:block col-span-2 text-center">Số lượng</div>
                        <div className="hidden md:block col-span-2 text-center">Thành tiền</div>
                        <div className="hidden md:block md:col-span-1 text-center">Thao tác</div>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="bg-white rounded-lg p-8 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <img src={`${process.env.REACT_APP_CDN_URL}shopping-bag-null.png`} alt="Empty Cart" className="h-24 w-24" />
                            <p className="text-gray-500 text-[16px]">Giỏ hàng trống</p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="flex text-[18px] items-center gap-2 bg-[#FF8900] text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                            >
                                <img src={`${process.env.REACT_APP_CDN_URL}union.png`} alt="Shop" className="h-6 w-6" />
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Cart Items List - Unified View with Responsive Classes */}
                        <div className="bg-white rounded-lg border-t max-h-[65vh] overflow-auto">
                            {items.map((item, index) => (
                                <CartItem
                                    key={index}
                                    item={item}
                                    isSelected={selectedItems.includes(item.id)}
                                    onSelectItem={handleSelectItem}
                                    onQuantityChange={handleQuantityChange}
                                    onDelete={handleShowDeleteDialog}
                                    copyMessage={copyMessage}
                                    onCopy={handleCopy}
                                    originalQuantity={originalQuantity}
                                    setOriginalQuantity={setOriginalQuantity}
                                    isQuantityUpdated={isQuantityUpdated}
                                    setIsQuantityUpdated={setIsQuantityUpdated}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Fixed Footer */}
            {items.length > 0 && (
                <CartFooter
                    selectedItems={selectedItems}
                    selectAll={selectAll}
                    handleSelectAll={handleSelectAll}
                    handleShowDeleteDialog={handleShowDeleteDialog}
                    handleBuyNow={handleBuyNow}
                    summary={summary}
                />
            )}

            {/* Unified Delete Dialog */}
            <DeleteDialog
                isOpen={showDeleteDialog}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                itemCount={isMultiDelete ? selectedItems.length : 1}
            />
        </div>
    );
};

export default CartPage;