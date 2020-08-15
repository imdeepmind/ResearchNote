import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { SelectOutlined } from "@ant-design/icons";

const SearchTable = ({ data, loading }) => {
  const columns = [
    {
      title: "Open",
      dataIndex: "_id",
      key: "_id",
      render: (value) => {
        const id = value["$oid"];

        return (
          <Link to={`/notes/${id}`}>
            <SelectOutlined />
          </Link>
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "40%"
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
      tableLayout="fixed"
      loading={loading}
      style={{ width: "100%" }}
      dataSource={data || []}
      columns={columns}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default SearchTable;
