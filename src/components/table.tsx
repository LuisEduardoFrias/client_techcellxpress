//
"use client"
import React, { useState } from 'react';
import 'st/table.css'

type TableProps = {
  data: Array<object>;
  headers?: Array<string>;
  handlerDelete?: (id: string | number) => void;
  handlerUpdate?: (id: string | number) => void;
}

export default function Table({ data, headers = [], handlerDelete, handlerUpdate }: TableProps) {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePageSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const totalPages = data ? Math.ceil(data?.length / pageSize) : [];
  const paginatedData = data ? data?.slice((currentPage - 1) * pageSize,currentPage * pageSize) : [];

  const renderHeaders = () => {
    if ((handlerDelete || handlerUpdate) && data.length > 0) {
      return [
        ...Object.keys(data[0]).map((key) => <th key={key}>{key}</th>),
        handlerUpdate && <th key="updateHeader">Update</th>,
        handlerDelete && <th key="deleteHeader">Delete</th>
      ];
    } else {
      return headers.map((header) => <th key={header}>{header}</th>);
    }
  };

  const renderRows = () => {
    return paginatedData.map((item: any, index) => (
      <tr key={index}>
        {Object.keys(item).map((key) => (
          <td key={key}>{item[key]}</td>
        ))}
        {handlerDelete && handlerUpdate && (
          <>
            <td><button className="btn btn-update" onClick={() => handlerUpdate(item.id || index)}>Update</button></td>
            <td><button className="btn btn-delete" onClick={() => handlerDelete(item.id || index)}>Delete</button></td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <>
      <table id='tridente-table'>
        <thead>
          <tr>
            {renderHeaders()}
          </tr>
        </thead>
        <tbody>
          {data ? renderRows() : <span>There is no data available to display.</span>}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={Object.keys(data.length > 0 ? data[0] : {}).length + (handlerDelete && handlerUpdate ? 2 : 0)}>
              <input type="number" value={pageSize} onChange={handleChangePageSize} />
              <span> Page {currentPage} of {totalPages} </span>
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};