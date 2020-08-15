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
      width: "40%",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (value) => {
        if (value) {
          const d = Date(value);
          window.test = d;
          console.log(d, d.toDateString);
          return <span>{d.substr(0, 15)}</span>;
        }
      },
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (value) => {
        if (value) {
          const d = Date(value);
          return <span>{d.substr(0, 15)}</span>;
        }
      },
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
