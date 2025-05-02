import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../app/redux/slices/admin/product.slice";
import ModalDelete from "../../../components/admin/ModalDelete";
import { toast } from "react-toastify";

const ProductDelete = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    if (!product.id) return;
    setLoading(true);

    try {
      const response = await dispatch(deleteProduct(product.id)).unwrap();
      toast.success(response.message);
      onClose();
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalDelete isOpen={isOpen} onClose={onClose} onConfirm={handleDelete} loading={loading}>
      <h2 className="text-lg font-bold text-gray-900 mb-4">Xác nhận xóa</h2>
      <p className="text-gray-600 mb-4">Bạn có chắc chắn muốn xóa sản phẩm {product?.name} không?</p>
    </ModalDelete>
  );
};

export default ProductDelete;
