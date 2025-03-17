import React from "react";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import ReactPaginate from "react-paginate";

function Pagination({
  totalPage,
  page,
  onChange = (e) => { },
}) {
  return (
    <div className="flex items-center justify-between my-3">
      <div className="flex items-center">
        <ReactPaginate
          previousLabel={
            <div className="flex items-center mr-4 cursor-pointer">
              <AiOutlineLeft />
            </div>
          }
          nextLabel={
            <div className="flex items-center ml-4 cursor-pointer">
              <AiOutlineRight />
            </div>
          }
          onPageChange={({ selected }) => onChange(selected + 1)}
          pageRangeDisplayed={4}
          pageCount={totalPage}
          containerClassName="flex items-center list-none"
          pageLinkClassName="flex w-8 h-7 p-1 justify-center items-center rounded cursor-pointer transition duration-500"
          activeLinkClassName="bg-orange-500 text-white rounded"
          forcePage={page - 1}
        />
      </div>
    </div>
  );
}

export default Pagination;
