import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts } from "../../../app/redux/slices/admin/product.slice";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import SearchBar from "../../../components/admin/Searchbar";
import Pagination from "../../../components/admin/Pagination";
import DataTable from "../../../components/admin/DataTable";
import { fetchCategories } from "../../../app/redux/slices/admin/category.slice";
import { fetchBrands } from "../../../app/redux/slices/admin/brand.slice";
import FilterBar from "../../../components/admin/FilterBar";
import ProductDelete from "./ProductDelete";
import { toast } from "react-toastify";
const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({ total: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({ category: "", brand: "" });
    const [sortState, setSortState] = useState({
        sortBy: searchParams.get("sortBy") || "",
        sortOrder: searchParams.get("sortOrder") || "asc",
    });
    const searchTerm = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [refresh, setRefresh] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);

          const params = Object.fromEntries(searchParams);
          const categoryId = params.category || "";
          const brandId = params.brand || "";
          
          const sortBy = params.sortBy || "";
          const sortOrder = params.sortOrder || "asc";

          let orderBy = "";
          if (sortBy === "price") {
            orderBy = sortOrder === "asc" ? "priceAsc" : "priceDesc";
          } else if (sortBy === "discountPrice") {
            orderBy = sortOrder === "asc" ? "priceDiscountAsc" : "priceDiscountDesc";
          }
          
          setFilters({
            category: categoryId,
            brand: brandId
          });
          
          try {
            const filtersForAPI = {
              categoryId: categoryId,
              brandId: brandId,
              orderBy
            };
            
            const response = await dispatch(
              fetchProducts({ search: searchTerm, page, ...filtersForAPI })
            ).unwrap();
            
            setProducts(response.items || []);
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
        
      }, [dispatch, searchParams, refresh]);

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [categoriesData, brandsData] = await Promise.all([
                    dispatch(fetchCategories({ limit: -1 })).unwrap(),
                    dispatch(fetchBrands({ limit: -1 })).unwrap(),
                ]);

                setCategories(categoriesData.items);
                setBrands(brandsData.items);
            } catch (error) {
            }
        };

        fetchFilterData();
    }, [dispatch]);

    
    const handleSearch = (value) => {
        setSearchParams((prev) => ({ ...Object.fromEntries(prev), search: value, page: 1 }));
    };


    const handlePageChange = (newPage) => {
        setSearchParams((prev) => {
            return { ...Object.fromEntries(prev), page: newPage };
        });
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);

        setSearchParams((prev) => {
            const newParams = { ...Object.fromEntries(prev), page: 1 };

            if (newFilters.category && newFilters.category !== "") {
                newParams.category = newFilters.category;
            } else {
                delete newParams.category;
            }

            if (newFilters.brand && newFilters.brand !== "") {
                newParams.brand = newFilters.brand;
            } else {
                delete newParams.brand;
            }

            return newParams;
        });
    };

    const handleSortChange = (columnKey) => {
        setSortState((prevState) => {

            const newSortOrder =
                prevState.sortBy === columnKey && prevState.sortOrder === "asc"
                    ? "desc"
                    : "asc";

            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set("sortBy", columnKey);
                newParams.set("sortOrder", newSortOrder);
                newParams.set("page", 1);
                return newParams;
            });

            return {
                sortBy: columnKey,
                sortOrder: newSortOrder
            };
        });
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
        setSelectedProduct(null);
        setRefresh(!refresh);
    };

    const handleOpenModal = (product) => {
        setIsOpenModal(true);
        setSelectedProduct(product);
    }
    const filterOptions = [
        { label: "Thể loại", key: "category", options: categories },
        { label: "Thương hiệu", key: "brand", options: brands },
    ];

    const columns = [
        {
            header: "Mã sản phẩm",
            accessor: "sku",
        },
        {
            header: "Tên sản phẩm",
            accessor: "name",
            render: (product) => <strong className="font-bold">{product.name}</strong>,
        },
        {
            header: "Tồn kho",
            accessor: "stock",
        },
        {
            header: "Danh mục",
            accessor: "category",
        },
        {
            header: "Thương hiệu",
            accessor: "brand",
        },
        {
            header: "Giá gốc",
            accessor: "price",
            render: (product) => (
                <span className="text-gray-700">
                    {new Intl.NumberFormat("vi-VN").format(product.price)}
                </span>
            ),
            renderHeader: () => {
                const isActive = sortState.sortBy === "price";
                return (
                    <div
                        className="flex items-center cursor-pointer text-blue-500"
                        onClick={() => handleSortChange("price")}
                    >
                        Giá gốc
                        {isActive && (
                            <span className="ml-1">
                                {sortState.sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                        )}
                    </div>
                );
            },
        },
        {
            header: "Giá giảm",
            accessor: "discountPrice",
            render: (product) => (
                <span className="text-gray-700">
                    {new Intl.NumberFormat("vi-VN").format(product.discountPrice)}
                </span>
            ),
            onClick: () => handleSortChange("discountPrice"),
            sortable: true,
            renderHeader: () => (
                <div className="flex items-center cursor-pointer text-blue-500" onClick={() => handleSortChange("discountPrice")}>
                    Giá giảm
                    {sortState.sortBy === "discountPrice" && (
                        <span>
                            {sortState.sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                    )}
                </div>
            ),
        },
        {
            header: "Hành động",
            render: (product) => (
                <div className="flex gap-2">
                    <button className="text-indigo-600 text-lg hover:scale-110 transition mr-3"
                        onClick={() => navigate(`/admin/productDetail/${product.id}`)}
                    >
                        <FaEye />
                    </button>
                    <button className="text-yellow-500 text-lg hover:scale-110 transition mr-3"
                        onClick={() => navigate(`/admin/productUpdate/${product.id}`)}
                    >
                        <MdOutlineModeEdit />
                    </button>
                    <button className="text-red-600 text-lg hover:scale-110 transition"
                        onClick={() => handleOpenModal(product)}
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl text-indigo-600 font-bold mb-9">Sản phẩm</h2>

            <div className="mb-4">
                <div className="flex flex-col md:flex-row gap-6 mb-4">
                    <div className="w-full md:w-[300px] flex-shrink-0">
                        <SearchBar
                            searchTerm={searchParams.get("search") || ""}
                            onSearch={handleSearch}
                            placeholder="Nhập tên mã hoặc sản phẩm..."
                            className="w-full"
                        />
                    </div>
                    <div className="flex-grow">
                        <FilterBar
                            filters={{ ...filters, options: filterOptions }}
                            onFilterChange={handleFilterChange}
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <button className="bg-[#40A800] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-900 transition"
                        onClick={() => { navigate("/admin/productAdd") }}
                    >
                        <IoIosAddCircleOutline className="text-xl" /> Thêm
                    </button>
                </div>
            </div>

            {loading && <p className="text-center text-gray-600 mt-1">Đang tải dữ liệu...</p>}

            <DataTable columns={columns} data={products} />

            <Pagination
                total={pageInfo.total}
                totalPages={pageInfo.totalPages}
                page={page}
                onPageChange={handlePageChange}
            />
            <ProductDelete isOpen={isOpenModal} onClose={handleCloseModal} product={selectedProduct} />
        </div>
    );
};

export default ProductList;
