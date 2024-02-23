import React, { useCallback, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useEffect } from "react";
import { axiosInstance } from "../../helpers/axiosInstance";
import { message, Table } from "antd";
import { Helmet } from "react-helmet";

function AdminUsers({ token, showLoading, hideLoading }) {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback( async () => {
    try {
      showLoading();
      const response = await axiosInstance(token).get("/api/users/get-all-users", {});
      hideLoading();
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      hideLoading();
      message.error(error.message);
    }
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Account Created At",
      dataIndex: "createdAt",
      render: (text, record) => {
        return new Date(record.createdAt).toLocaleDateString();
      },
    },
  ];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <div>
        <div className="flex justify-between p-7">
          <PageTitle title="Users" />
        </div>
        <div className="p-7">
          <Table
            columns={columns}
            dataSource={users}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </>
  );
}

export default AdminUsers;