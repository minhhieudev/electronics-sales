import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAccounts } from "../../../app/redux/slices/account.slice";
import SearchBar from "../../../components/admin/Searchbar";
import Pagination from "../../../components/admin/Pagination";
import DataTable from "../../../components/admin/DataTable";
import { FaEye, FaTrash } from "react-icons/fa";
import Modal from "../../../components/admin/Modal";
import AccountDetails from "./AccountDetail";
import AccountDelete from "./AccountDelete";

const AccountList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [accounts, setAccounts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTerm = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await dispatch(fetchAccounts({ search: searchTerm, page }));
        setAccounts(response.payload.items || []);
        setPageInfo({
          total: response.payload.pageInfo?.totalElements || 0,
          totalPages: response.payload.pageInfo?.totalPages || 0,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, searchTerm, page, refresh]);

  const handleSearch = (value) => {
    setSearchParams({ search: value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ search: searchTerm, page: newPage });
  };



const openModal = (accountId) => {
  setSelectedAccountId(accountId);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedAccountId(null);
  setIsModalOpen(false);
};

const openDeleteModal = (account) => {
  setSelectedAccount(account);
  setIsDeleteModalOpen(true);
};

const closeDeleteModal = () => {
  setSelectedAccount(null);
  setIsDeleteModalOpen(false);
  setRefresh(!refresh);
};

  const columns = [
    { header: "Họ tên", accessor: "fullName", render: (account) => <strong className="font-bold">{account.fullName}</strong> },
    { header: "Tài khoản", accessor: "userName" },
    { header: "Số điện thoại", accessor: "numberPhone" },
    {
      header: "Giới tính",
      render: (account) => (
        <span
          className={`px-4 py-1.5 rounded-2xl text-sm 
            ${account.gender ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {account.gender ? "Nam" : "Nữ"}
        </span>
      ),
    },
    {
      header: "Vai trò",
      render: (account) => (
        <span
          className={`px-4 py-1.5 rounded-2xl text-sm 
            ${account.role ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-500"}`}
        >
          {account.role ? "Admin" : "User"}
        </span>
      ),
    },
    {
      header: "Hành động",
      render: (account) => (
        <div className="flex gap-2">
          <button
            className="text-indigo-600 text-lg hover:scale-110 transition mr-3"
            onClick={() => openModal(account.id)}
          >
            <FaEye />
          </button>
          {account.role === false && (
            <button
              className="text-red-600 text-lg hover:scale-110 transition"
              onClick={() => openDeleteModal(account)}
            >
              <FaTrash />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl text-indigo-600 font-bold mb-9">Tài khoản</h2>

      <div className="flex gap-4 mb-8">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} placeholder="Nhập tên tài khoản hoặc số điện thoại" />
      </div>

      {loading && <p className="text-center text-gray-600 mt-3">Đang tải dữ liệu...</p>}
      {error && <p className="text-center text-red-600 mt-3">{error}</p>}

      <DataTable columns={columns} data={accounts} />

      <Pagination total={pageInfo.total} totalPages={pageInfo.totalPages} page={page} onPageChange={handlePageChange} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
                <AccountDetails accountId={selectedAccountId} />
      </Modal>

      <AccountDelete
        account={selectedAccount}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        
      />

    </div>
  );
};

export default AccountList;
