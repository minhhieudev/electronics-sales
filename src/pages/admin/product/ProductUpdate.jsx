import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";

import { uploadFileToCloudinary } from "../../../app/utils/uploadUtils";
import { fetchProductById, updateProduct } from "../../../app/redux/slices/admin/product.slice";
import { fetchCategories } from "../../../app/redux/slices/admin/category.slice";
import { fetchBrands } from "../../../app/redux/slices/admin/brand.slice";
import MESSAGES from "../../../common/const";

const schema = yup.object().shape({
    productCode: yup.string().required(MESSAGES.VALIDATION.productCode),
    productName: yup.string().required(MESSAGES.VALIDATION.productName),
    quantity: yup
        .number()
        .typeError(MESSAGES.VALIDATION.quantity.type)
        .required(MESSAGES.VALIDATION.quantity.required)
        .min(0, MESSAGES.VALIDATION.quantity.min),
    categoryId: yup.string().required(MESSAGES.VALIDATION.categoryId),
    brandId: yup.string().required(MESSAGES.VALIDATION.brandId),
    color: yup.string().required(MESSAGES.VALIDATION.color),
    warranty: yup.string().required(MESSAGES.VALIDATION.warranty),
    price: yup
        .number()
        .typeError(MESSAGES.VALIDATION.price.type)
        .required(MESSAGES.VALIDATION.price.required)
        .min(0, MESSAGES.VALIDATION.price.min),
    discount: yup
        .number()
        .nullable()
        .notRequired()
        .typeError(MESSAGES.VALIDATION.discount.type)
        .min(0, MESSAGES.VALIDATION.discount.min)
        .max(100, MESSAGES.VALIDATION.discount.max),
    description: yup.string().required(MESSAGES.VALIDATION.description),
    mainImageFile: yup
        .mixed()
        .test("required", MESSAGES.VALIDATION.mainImageFile.required, (value) => {
            return value && value.length > 0;
        })
        .test("fileSize", MESSAGES.VALIDATION.mainImageFile.size, (value) => {
            if (typeof value === 'string') return true;

            if (value instanceof File) return value.size <= 1024 * 1024;

            return value && value[0] && value[0].size <= 1024 * 1024;
        }),
    images: yup
        .array()
        .default([])
        .min(1, MESSAGES.VALIDATION.images.min)
        .test("fileSize", MESSAGES.VALIDATION.images.size, (value) => {
            if (value.some(item => typeof item === 'string')) return true;

            return value.every(file => file.size <= 1024 * 1024);
        }),
});

const ProductUpdate = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [image, setImage] = useState(`${process.env.REACT_APP_CDN_URL}e0naixvh5rufct5okr7a.png`);
    const [images, setImages] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState("No file chosen");
    const [fileCount, setFileCount] = useState(0);
    const [isChanged, setIsChanged] = useState(false);
    const [product, setProduct] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const watchPrice = watch("price");
    const watchDiscount = watch("discount");
    const [discountedPrice, setDiscountedPrice] = useState("");

    useEffect(() => {
        const price = parseFloat(watchPrice) || 0;
        const discount = parseFloat(watchDiscount) || 0;
        const discounted = price - (price * discount) / 100;
        setDiscountedPrice(discounted);
    }, [watchPrice, watchDiscount]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("mainImageUrl", file);
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setSelectedFileName(file.name);
        }
    };
    const handleImageChanges = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setValue("images", files);
            setFileCount(files.length);
            const imageUrls = files.map(file => URL.createObjectURL(file));
            setImages(imageUrls);
        } else {
            setValue("images", []);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryRes, brandRes, productRes] = await Promise.all([
                    dispatch(fetchCategories({ limit: -1 })).unwrap(),
                    dispatch(fetchBrands({ limit: -1 })).unwrap(),
                    dispatch(fetchProductById(id)).unwrap(),
                ]);
                setCategories(categoryRes.items);
                setBrands(brandRes.items);

                const product = productRes;

                setProduct(product);
                const category = categoryRes.items.find((item) => item.name === product.category);
                const brand = brandRes.items.find((item) => item.name === product.brand);

                reset({
                    productCode: product.sku,
                    productName: product.name,
                    quantity: product.stock,
                    categoryId: category?.id || "",
                    brandId: brand?.id || "",
                    color: product.colors.join(", "),
                    warranty: product.warranty.toString(),
                    price: parseFloat(product.price),
                    discount: parseFloat(product.discount),
                    description: product.description,
                });
                setImage(product.mainImageUrl ? `${process.env.REACT_APP_CDN_URL}${product.mainImageUrl}` : `${process.env.REACT_APP_CDN_URL}e0naixvh5rufct5okr7a.png`);
                setSelectedFileName(product.mainImageUrl ? product.mainImageUrl.split("/").pop() : "No file chosen");
                setValue("mainImageFile", product.mainImageUrl);

                const imageList = product.images ? product.images.map(img => `${process.env.REACT_APP_CDN_URL}${img}`) : [];
                setImages(imageList);
                setFileCount(imageList.length);
                setValue("images", product.images || []);

            } catch (error) {
                toast.error(error);
            }
        };

        fetchData();
    }, [dispatch, id, reset, setValue]);


    const allWatchedValues = watch();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (!product) return;
        setIsChanged(checkIfFormChanged());
    }, [product, allWatchedValues, categories, brands, selectedFileName, fileCount]);

    const checkIfFormChanged = () => {
        if (!product) return false;

        if (checkBasicDetailsChanged()) return true;

        if (checkCategoryAndBrandChanged()) return true;

        if (checkColorsChanged()) return true;

        if (checkNumericFieldsChanged()) return true;

        if (allWatchedValues.description !== product.description) return true;

        if (checkImagesChanged()) return true;

        return false;
    };

    const checkBasicDetailsChanged = () => {
        const formProductCode = allWatchedValues.productCode;
        const formProductName = allWatchedValues.productName;
        const formQuantity = parseInt(allWatchedValues.quantity);

        if (formProductCode !== product.sku) return true;
        if (formProductName !== product.name) return true;
        if (formQuantity !== product.stock) return true;

        return false;
    };

    const checkCategoryAndBrandChanged = () => {
        const category = categories.find(c => c.id === allWatchedValues.categoryId);
        const brand = brands.find(b => b.id === allWatchedValues.brandId);

        if (category && category.name !== product.category) return true;
        if (brand && brand.name !== product.brand) return true;

        return false;
    };

    const checkColorsChanged = () => {
        const formColors = allWatchedValues.color.split(",").map(c => c.trim()).sort();
        const productColors = [...product.colors].sort();

        if (formColors.length !== productColors.length) return true;
        for (let i = 0; i < formColors.length; i++) {
            if (formColors[i] !== productColors[i]) return true;
        }

        return false;
    };


    const checkNumericFieldsChanged = () => {
        if (parseInt(allWatchedValues.warranty) !== product.warranty) return true;
        if (parseFloat(allWatchedValues.price) !== parseFloat(product.price)) return true;
        if ((parseFloat(allWatchedValues.discount) || 0) !== (parseFloat(product.discount) || 0)) return true;

        return false;
    };

    const checkImagesChanged = () => {

        if (allWatchedValues.mainImageFile instanceof File) return true;
        if (selectedFileName !== "No file chosen" &&
            selectedFileName !== product.mainImageUrl?.split("/").pop()) return true;

        const currentImages = allWatchedValues.images;
        if (Array.isArray(currentImages)) {
            for (let i = 0; i < currentImages.length; i++) {
                if (currentImages[i] instanceof File) return true;
            }
            if (currentImages.length !== (product.images?.length || 0)) return true;
            if (fileCount !== (product.images?.length || 0)) return true;
        }

        return false;
    };
    const onSubmit = async (data) => {
        try {

            let mainImageUrl = data.mainImageUrl;
            if (mainImageUrl instanceof File) {
                mainImageUrl = await uploadFileToCloudinary(mainImageUrl);
            }

            const uploadedImages = await Promise.all(
                data.images.map(async (file) => {
                    if (file instanceof File) {
                        return await uploadFileToCloudinary(file);
                    }
                    return file;
                })
            );

            const payload = {
                sku: data.productCode,
                name: data.productName,
                stock: parseInt(data.quantity),
                category: data.categoryId,
                brand: data.brandId,
                price: data.price.toString(),
                discount: data.discount?.toString() || "0",
                mainImageUrl,
                warranty: parseInt(data.warranty),
                description: data.description,
                colors: data.color.split(",").map(c => c.trim()),
                images: uploadedImages,
            };

            const res = await dispatch(updateProduct({ id, data: payload })).unwrap();
            toast.success(res.message);
            navigate("/admin/product");
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen ml-4">
            <h2 className="text-2xl text-indigo-600 font-bold mb-4">Sản phẩm</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-6xl bg-white p-6 rounded-lg shadow-md flex flex-col gap-6"
                encType="multipart/form-data"
            >
                <div className="flex gap-6">
                    {/* Form bên trái */}
                    <div className="w-3/4">
                        <h3 className="text-lg font-semibold mb-4">Cập nhật sản phẩm</h3>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium">Mã sản phẩm <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    className="bg-gray-100 p-2 rounded-lg w-full"
                                    {...register("productCode")}
                                />
                                {errors.productCode && (
                                    <p className="text-red-500 text-sm">{errors.productCode.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Tên sản phẩm <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-100 p-2 rounded-lg w-full"
                                    {...register("productName")}
                                />
                                {errors.productName && (
                                    <p className="text-red-500 text-sm">{errors.productName.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Số lượng <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="bg-gray-100 p-2 rounded-lg w-full"
                                    {...register("quantity")}
                                />
                                {errors.quantity && (
                                    <p className="text-red-500 text-sm">{errors.quantity.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    Loại sản phẩm <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="bg-gray-100 p-2 rounded-lg w-full"
                                    {...register("categoryId")}
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && (
                                    <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Thương hiệu <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="bg-gray-100 p-2 rounded-lg w-full"
                                    {...register("brandId")}
                                >
                                    <option value="">Chọn thương hiệu</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.brandId && (
                                    <p className="text-red-500 text-sm">{errors.brandId.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Màu sắc <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-100 p-2 rounded-lg w-full"
                                    {...register("color")}
                                />
                                {errors.color && (
                                    <p className="text-red-500 text-sm">{errors.color.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Thời gian bảo hành (tháng) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="bg-gray-100 p-2 rounded-lg w-full"
                                    {...register("warranty")}
                                />
                                {errors.warranty && (
                                    <p className="text-red-500 text-sm">{errors.warranty.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    Giá <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    className="bg-gray-100 p-2 rounded-lg w-full"
                                    {...register("price")}
                                    min="0"
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-sm">{errors.price.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phần trăm giảm giá (%)</label>
                                <input
                                    type="number"
                                    className="bg-gray-100 p-2 rounded-lg w-full"
                                    {...register("discount")}
                                    min="0"
                                    max="100"
                                />
                                {errors.discount && (
                                    <p className="text-red-500 text-sm">{errors.discount.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Giá giảm</label>
                                <input
                                    type="text"
                                    className="bg-gray-300 p-2 rounded-lg w-full"
                                    value={discountedPrice}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium">
                                Mô tả <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className="bg-gray-100 p-2 rounded-lg w-full min-h-[150px]"
                                rows="4"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Upload ảnh */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Ảnh <span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleImageChanges}
                                {...register("images", {
                                    onChange: (e) => handleImageChanges(e),
                                })}
                                accept="image/*"
                                multiple
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex items-center border border-gray-300 p-2 rounded-lg cursor-pointer  hover:bg-gray-200 text-gray-500"
                            >
                                <span className="text-gray-400 ">Choose file</span>
                                <span className="border-l border-gray-400 h-5 mx-2"></span>
                                <span className="text-gray-400">
                                    {fileCount > 0 ? `${fileCount} file` : "No file chosen"}
                                </span>
                            </label>
                            {errors.images && (
                                <p className="text-red-500 text-sm">{errors.images.message}</p>
                            )}
                        </div>

                        {/* Hiển thị danh sách ảnh đã chọn */}
                        <div className="grid grid-cols-5 gap-4 mt-4">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Ảnh ${index + 1}`}
                                    className="h-20 w-40 object-fill bg-gray-100 rounded-lg"
                                />
                            ))}
                        </div>
                    </div>


                    {/* Ảnh đại diện bên phải */}
                    <div className="w-1/4">
                        <label className="block text-sm font-medium mb-2 mt-4">Ảnh đại diện <span className="text-red-500">*</span></label>
                        <div className="relative pt-[100%]">
                        <img
                            src={image}
                            alt="Ảnh đại diện"
                            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                        />
                        </div>
                       
                        <div className="relative mt-2">
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                {...register("mainImageFile", {
                                    onChange: (e) => handleImageChange(e),
                                })}
                            />
                            <label
                                htmlFor="avatar-upload"
                                className="flex items-center border border-gray-300 p-2 rounded-lg cursor-pointer hover:bg-gray-200 text-gray-500 w-full"
                            >
                                <span className="text-gray-400 flex-shrink-0">Choose file</span>
                                <span className="border-l border-gray-400 h-5 mx-2 flex-shrink-0"></span>
                                <span className="text-gray-400 truncate overflow-hidden whitespace-nowrap flex-1 min-w-0">
                                    {selectedFileName}
                                </span>
                            </label>
                            {errors.mainImageFile && (
                                <p className="text-red-500 text-sm">{errors.mainImageFile.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        onClick={() => navigate(`/admin/product`)}
                    >
                        Quay lại
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded-lg text-white ${!isChanged ? "bg-gray-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                        disabled={!isChanged}
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductUpdate;
