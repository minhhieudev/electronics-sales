import React, { useEffect, useRef, useState } from 'react';
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
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isMultiDelete, setIsMultiDelete] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    const [copyMessage, setCopyMessage] = useState({ show: false, id: null });
    const [originalQuantities, setOriginalQuantities] = useState({});
    const [pendingChanges, setPendingChanges] = useState([]);
    const pendingChangesRef = useRef({});

    // Update ref whenever pendingChanges changes
    useEffect(() => {
        pendingChangesRef.current = pendingChanges;
    }, [pendingChanges]);

    // Fetch data
    useEffect(() => {
        dispatch(fetchUserCart({
            onSuccess: (data) => {
                setItems(data);
                // Saving the initial count of the products
                const initialQuantities = {};
                data.forEach(item => {
                    initialQuantities[item.id] = item.quantity;
                });
                setOriginalQuantities(initialQuantities);
            }
        }));
    }, [dispatch]);

    // Handling when user leave page or close the browser
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const currentChanges = pendingChangesRef.current;
            if (currentChanges.length > 0) {
                // Display default dialog of the browser
                event.preventDefault();
                saveChanges();

            }
        };

        const saveChanges = () => {
            const currentChanges = pendingChangesRef.current;
            if (currentChanges.length > 0) {
                currentChanges.forEach(({ id, quantity, color }) => {
                    dispatch(updateProductInCart({
                        updateData: { id, quantity, color },
                        onSuccess: (data) => {
                            
                        }
                    }));
                });
            }
            // if (currentChanges.length > 0) {
            //     dispatch(updateProductInCart({
            //         updateData: currentChanges,
            //     }));
            // }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            saveChanges(); // Call API ONLY when component unmounts (leaves the page within the application)
        };
    }, [dispatch]);

    // Calculate summary
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

        const itemIds = selectedItems.map(itemId =>
            items.find(item => item.id === itemId).id
        );

        navigate('/checkout', {
            state: {
                orderItems: listItems,
                fromCart: true,
                itemIds
            }
        });
    };

    const handleQuantityChange = (item, newQuantity) => {

        // Store the initial value if it doesn't exist
        if (!originalQuantities[item.id]) {
            setOriginalQuantities(prev => ({
                ...prev,
                [item.id]: item.quantity
            }));
        }

        const numericQuantity = parseInt(newQuantity, 10);

        // Allow empty value when typing
        if (newQuantity === '') {
            setItems(prev => prev.map(i =>
                i.id === item.id ? { ...i, quantity: '' } : i
            ));
            return;
        }

        // If not a valid number, do nothing
        if (isNaN(numericQuantity)) {
            return;
        }

        // Update UI
        setItems(prev => prev.map(i =>
            i.id === item.id ? { ...i, quantity: numericQuantity } : i
        ));

        // Check and update pendingChanges
        if (numericQuantity !== originalQuantities[item.id]) {
            // Check if the product already exists in pendingChanges
            setPendingChanges(prev => {
                const existingChangeIndex = prev.findIndex(change => change.id === item.productId && change.color === item.color);
                if (existingChangeIndex !== -1) {
                    // If it already exists, update the quantity
                    const updatedChanges = [...prev];
                    updatedChanges[existingChangeIndex].quantity = numericQuantity;
                    return updatedChanges;
                } else {
                    // If it doesn't exist, add a new one
                    return [
                        ...prev,
                        {
                            id: item.productId,
                            quantity: numericQuantity,
                            color: item.color
                        }
                    ];
                }
            });
        } else {
            // If the new value is the same as the original value, remove from pendingChanges
            setPendingChanges(prev => prev.filter(change => !(change.id === item.productId && change.color === item.color)));
        }
    };

    const handleDeleteCancel = () => {
        if (!isMultiDelete && itemToRemove) {
            // Restore the initial value when canceling deletion
            const originalQuantity = originalQuantities[itemToRemove];
            if (originalQuantity) {
                setItems(prev => prev.map(i =>
                    i.id === itemToRemove ? { ...i, quantity: originalQuantity } : i
                ));

                // Remove from pendingChanges if returning to the initial value
                setPendingChanges(prev => prev.filter(change => change.id !== itemToRemove));
            }
        }
        setShowDeleteDialog(false);
    };

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

    const handleCopy = (sku, itemId, e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(sku);
        setCopyMessage({ show: true, id: itemId });

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
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

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