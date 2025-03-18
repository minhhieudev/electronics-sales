import React from "react";

const DataTable = ({ columns = [], data = [] }) => {
    return (
       <div className="overflow-x-auto mt-5">
       <table className="w-full border-collapse shadow-lg bg-white">
           <thead>
               <tr className="bg-gray-50 text-gray-700 font-bold">
                   {columns.map((col, index) => (
                       <th key={index} className="p-4 text-left">{col.header}</th>
                   ))}
               </tr>
           </thead>
           <tbody>
               {data.length > 0 ? (
                   data.map((item, rowIndex) => (
                       <tr key={rowIndex} className="border-b hover:bg-gray-200">
                           {columns.map((col, colIndex) => (
                               <td key={colIndex} className="p-4">
                                   {col.render ? col.render(item) : item[col.accessor]}
                               </td>
                           ))}
                       </tr>
                   ))
               ) : (
                   <tr>
                       <td colSpan={columns.length} className="p-4 text-center text-gray-500 italic">
                           Không có dữ liệu.
                       </td>
                   </tr>
               )}
           </tbody>
       </table>
   </div>
    );
};

export default DataTable;
