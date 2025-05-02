import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ModalUpdate from "../../../components/admin/ModalUpdate";
import { updateOrderStatus } from "../../../app/redux/slices/admin/order.slice";
import { OrderStatusOptions } from "../../../common/enum";

const OrderUpdateStatus = ({ isOpen, onClose, order }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } =  useForm();

  useEffect(() => {
    if (order) {
      reset({
        status: order.status || "",
      });
    }
  }, [order, reset]);

  const watchedStatus = watch("status");

  const isChanged = watchedStatus && watchedStatus !== order?.status;

  const onSubmit = async (data) => {
    try {
      const requestData = {
        id: order.id,
        status: data.status,
      };
      const res = await dispatch(updateOrderStatus(requestData)).unwrap();
      toast.success(res.message);
      reset();
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  const onError = (errors) => {
    if (errors.status) toast.error(errors.status.message);
  };

  return (
    <ModalUpdate
      isOpen={isOpen}
      onClose={onClose}
      title="Cập nhật trạng thái đơn hàng"
      onSave={handleSubmit(onSubmit, onError)}
      isDisabled={!isChanged}
    >
      <label className="block text-lg font-semibold text-gray-700">
        Trạng thái <span className="text-red-500">*</span>
      </label>
      <select
        className="w-full p-3 bg-gray-100 rounded-lg mt-2 focus:ring focus:ring-indigo-400 outline-none text-sm"
        {...register("status")}
      >
        {OrderStatusOptions.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
      {errors.status && (
        <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
      )}
    </ModalUpdate>
  );
};

export default OrderUpdateStatus;