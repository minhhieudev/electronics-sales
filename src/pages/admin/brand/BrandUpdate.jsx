import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateBrand } from "../../../app/redux/slices/admin/brand.slice";
import { useEffect } from "react";
import ModalUpdate from "../../../components/admin/ModalUpdate";
import MESSAGES from "../../../common/const";

const schema = yup.object().shape({
    name: yup.string().trim().required(MESSAGES.BRAND_NAME_EMPTY),
    description: yup.string().trim(),
});

const BrandUpdate = ({ isOpen, onClose, brand }) => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (brand) {
            reset({
                name: brand.name || "",
                description: brand.description || "",
            });
        }
    }, [brand, reset]);

    const onSubmit = async (data) => {
        try {
            const response = await dispatch(updateBrand({ id: brand.id, data })).unwrap();
            toast.success(response.message);
            
            reset();
            onClose();
        } catch (error) {
            toast.error(error);
        }
    };

    const onError = (errors) => {
        toast.error(errors.name.message);
    };

    const watchedValues = watch(); 

    const isChanged =
        watchedValues.name?.trim() !== (brand?.name || "").trim() ||
        watchedValues.description?.trim() !== (brand?.description || "").trim();

    return (
        <ModalUpdate isOpen={isOpen} onClose={onClose} title="Cập nhật danh mục" onSave={handleSubmit(onSubmit, onError) } isDisabled={!isChanged}>
            <label className="block text-lg font-semibold text-gray-700">
                Tên <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                className="w-full p-3 bg-gray-100 rounded-lg mt-2 focus:ring focus:ring-indigo-400 outline-none text-sm"
                defaultValue={brand ? brand.name : ""}
                {...register("name")}
            />

            <label className="block text-lg font-semibold text-gray-700 mt-3">Mô tả</label>
            <textarea
                className="w-full p-3 bg-gray-100 rounded-lg mt-2 focus:ring focus:ring-indigo-400 outline-none text-sm"
                rows="2"
                defaultValue={brand ? brand.description : ""}
                {...register("description")}
            ></textarea>
        </ModalUpdate>
    );
};

export default BrandUpdate;
