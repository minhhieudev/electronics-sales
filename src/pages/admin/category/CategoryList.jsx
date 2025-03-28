import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchCategories } from "../../../app/redux/slices/category.slice";
import { FaEye, FaTrash } from "react-icons/fa";
import SearchBar from "../../../components/admin/Searchbar";
import Pagination from "../../../components/admin/Pagination";
import DataTable from "../../../components/admin/DataTable";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import CategoryAdd from "../../../pages/admin/category/CategoryAdd";
import Modal from "../../../components/admin/Modal";
import CategoryDetail from "./CategoryDetail";
import CategoryUpdate from "./CategoryUpdate";


const CategoryList = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState([]);
    const [pageInfo, setPageInfo] = useState({ total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false); 
    const [refresh, setRefresh] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const searchTerm = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await dispatch(fetchCategories({ search: searchTerm, page }));
                setCategories(response.payload.items || []);
                setPageInfo({
                    total: response.payload.pageInfo?.totalElements || 0,
                    totalPages: response.payload.pageInfo?.totalPages || 0,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, searchTerm, page,refresh]);

    const handleSearch = (value) => {
        setSearchParams((prev) => ({ ...Object.fromEntries(prev), search: value, page: 1 }));
    };
    
    const handlePageChange = (newPage) => {
        setSearchParams((prev) => ({ ...Object.fromEntries(prev), search: searchTerm, page: newPage }));
    };
    const handleOpenModal = () => {
        setIsAddCategoryModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddCategoryModalOpen(false);
        setRefresh(!refresh);
    };


    const handleOpenDetailModal = (category ) =>{
        setIsDetailModalOpen(true);
        setSelectedCategory(category);
    }


    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setRefresh(!refresh);
    };
    const handleOpenEditModal = (category) => {
        setSelectedCategory(category);
        setIsEditCategoryModalOpen(true);
    };
    
    const handleCloseEditModal = () => {
        setIsEditCategoryModalOpen(false);
        setSelectedCategory(null);
        setRefresh(!refresh);
    };
    
    const columns = [
        {
            header: "Tên danh mục",
            accessor: "name",
            render: (category) => <strong className="font-bold">{category.name}</strong>,
        },
        { 
            header: "Mô tả", 
            accessor: "description",
            render: (category) => (
                <div className="w-96 truncate" title={category.description}>
                    {category.description}
                </div>
            ),
        },
        {
            header: "Hành động",
            render: (category) => (
                <div className="flex gap-2">
                    <button className="text-indigo-600 text-lg hover:scale-110 transition mr-3"
                        onClick={() => handleOpenDetailModal(category)}
                    >
                        <FaEye />
                    </button>
                    <button className="text-yellow-500 text-lg hover:scale-110 transition mr-3"
                        onClick={() => handleOpenEditModal(category)}
                    >
                    <MdOutlineModeEdit />
                    </button>
                    <button className="text-red-600 text-lg hover:scale-110 transition">
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl text-indigo-600 font-bold mb-9">Thể loại</h2>

            <div className="mb-2">
                <SearchBar searchTerm={searchTerm} onSearch={handleSearch} placeholder="Nhập tên... " />

                <div className="flex justify-end mt-2">
                <button
                        className="bg-[#40A800] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-900 transition"
                        onClick={handleOpenModal}
                        >
                        <IoIosAddCircleOutline className="text-xl" /> Thêm
                    </button>
                </div>
            </div>

            {loading && <p className="text-center text-gray-600 mt-1">Đang tải dữ liệu...</p>}
            {error && <p className="text-center text-red-600 mt-1">{error}</p>}

            <DataTable columns={columns} data={categories} />

            <Pagination total={pageInfo.total} totalPages={pageInfo.totalPages} page={page} onPageChange={handlePageChange} />
            <CategoryAdd isOpen={isAddCategoryModalOpen} onClose={handleCloseModal}/>

            <Modal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal}>
                <CategoryDetail category={selectedCategory} />
            </Modal>
            <CategoryUpdate isOpen={isEditCategoryModalOpen} onClose={handleCloseEditModal} category={selectedCategory} />
        </div>
    );
};

export default CategoryList;
