import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchBrands } from "../../../app/redux/slices/admin/brand.slice";
import { FaEye, FaTrash } from "react-icons/fa";
import SearchBar from "../../../components/admin/Searchbar";
import Pagination from "../../../components/admin/Pagination";
import DataTable from "../../../components/admin/DataTable";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import BrandAdd from "./BrandAdd";
import Modal from "../../../components/admin/Modal";
import BrandDetail from "./BrandDetail";
import BrandUpdate from "./BrandUpdate";
import BrandDelete from "./BrandDelete";
import { toast } from "react-toastify";


const BrandList = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [brands, setBrands] = useState([]);
    const [pageInfo, setPageInfo] = useState({ total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false); 
    const [refresh, setRefresh] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const searchTerm = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await dispatch(fetchBrands({ search: searchTerm, page, limit :6 })).unwrap();
                setBrands(response.items || []);
                setPageInfo({
                    total: response.pageInfo?.totalElements || 0,
                    totalPages: response.pageInfo?.totalPages || 0,
                });
            } catch (error) {
                toast.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, searchTerm, page, refresh]);

    const handleSearch = (value) => {
        setSearchParams((prev) => ({ ...Object.fromEntries(prev), search: value, page: 1 }));
    };

    const handlePageChange = (newPage) => {
        setSearchParams((prev) => ({ ...Object.fromEntries(prev), page: newPage }));
    };


    const handleOpenAddModal = () => {
        setIsAddBrandModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddBrandModalOpen(false);
        setRefresh(!refresh);
    }
    
    const handleOpenDetailModal = (brand ) =>{
        setIsDetailModalOpen(true);
        setSelectedBrand(brand);
    }


    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setRefresh(!refresh);
    };

    const handleOpenUpdateModal = (brand) => {
        setSelectedBrand(brand);
        setIsOpenUpdateModal(true);
    };
    
    const handleCloseUpdateModal = () => {
        setIsOpenUpdateModal(false);
        setSelectedBrand(null);
        setRefresh(!refresh);
    };

    const handleOpenDeleteModal = (brand) =>{
        setIsOpenDeleteModal(true);
        setSelectedBrand(brand);
    }

    const handleCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
        setRefresh(!refresh);
    };

    const columns = [
        {
            header: "Tên thương hiệu",
            accessor: "name",
            render: (brand) => <strong className="font-bold">{brand.name}</strong>,
        },
        { 
            header: "Mô tả", 
            accessor: "description",
            render: (brand) => (
                <div className="w-96 truncate" title={brand.description}>
                    {brand.description}
                </div>
            ),
        },
        {
            header: "Hành động",
            render: (brand) => (
                <div className="flex gap-2">
                    <button className="text-indigo-600 text-lg hover:scale-110 transition mr-3"
                        onClick={() => handleOpenDetailModal(brand)}
                    >
                        <FaEye />
                    </button>
                    <button className="text-yellow-500 text-lg hover:scale-110 transition mr-3"
                        onClick={() => handleOpenUpdateModal(brand)}>
                        <MdOutlineModeEdit />
                    </button>
                    <button className="text-red-600 text-lg hover:scale-110 transition"
                    onClick={() => handleOpenDeleteModal(brand)}>
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl text-indigo-600 font-bold mb-9">Thương hiệu</h2>

            <div className="mb-2">
                <SearchBar searchTerm={searchTerm} onSearch={handleSearch} placeholder="Nhập tên thương hiệu..." />

                <div className="flex justify-end mt-2">
                    <button className="bg-[#40A800] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-900 transition"
                        onClick={handleOpenAddModal}
                    >
                        <IoIosAddCircleOutline className="text-xl" /> Thêm
                    </button>
                </div>
            </div>

            {loading && <p className="text-center text-gray-600 mt-1">Đang tải dữ liệu...</p>}

            <DataTable columns={columns} data={brands} />

            <Pagination total={pageInfo.total} totalPages={pageInfo.totalPages} page={page} onPageChange={handlePageChange} />

            <BrandAdd isOpen={isAddBrandModalOpen} onClose={handleCloseAddModal}/>
            <Modal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal}>
                <BrandDetail brand={selectedBrand} />
            </Modal>

            <BrandUpdate isOpen={isOpenUpdateModal} onClose={handleCloseUpdateModal} brand={selectedBrand} />
            <BrandDelete isOpen={isOpenDeleteModal} onClose={handleCloseDeleteModal} brand={selectedBrand} />
        </div>
    );
};

export default BrandList;
