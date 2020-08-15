import React from "react";
import { Table } from "antd";

const SearchTable = ({ data }) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "60%",
      render: val => {
        console.log(val);
        return <p>Test</p>
      }
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
  ];

  return (
    <Table
      style={{ width: "100%" }}
      dataSource={data || []}
      columns={columns}
    />
  );
};

export default SearchTable;
