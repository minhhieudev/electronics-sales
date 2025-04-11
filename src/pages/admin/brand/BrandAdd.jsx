import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addBrand} from "../../../app/redux/slices/brand.slice";
import ModalAdd from "../../../components/admin/ModalAdd";

const schema = yup.object().shape({
    name: yup.string().trim().required("Tên thương hiệu không được để trống!"),
    description: yup.string().trim(),
});

const BrandAdd = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await dispatch(addBrand(data)).unwrap();
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

    return (
        <ModalAdd isOpen={isOpen} onClose={onClose} title="Thêm mới thương hiệu" onSave={handleSubmit(onSubmit, onError)}>
            <label className="block text-lg font-semibold text-gray-700">
                Tên <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                className="w-full p-3 bg-gray-100 rounded-lg mt-2 focus:ring focus:ring-indigo-400 outline-none text-sm"
                {...register("name")}
            />
            
            <label className="block text-lg font-semibold text-gray-700 mt-3">Mô tả</label>
            <textarea
                className="w-full p-3 bg-gray-100 rounded-lg mt-2 focus:ring focus:ring-indigo-400 outline-none text-sm"
                rows="2"
                {...register("description")}
            ></textarea>
        </ModalAdd>
    );
};

export default BrandAdd;