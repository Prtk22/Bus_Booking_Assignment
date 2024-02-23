import React, { useEffect, useState, useCallback } from "react";
import BusForm from "../../components/BusForm";
import PageTitle from "../../components/PageTitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { message, Table } from "antd";
import { Helmet } from "react-helmet";

function AdminBuses({ token, showLoading, hideLoading }) {
  const [showBusForm, setShowBusForm] = useState(false);
  const [buses, setBuses] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [selectedBus, setSelectedBus] = useState({});

  const getBuses = useCallback(async () => {
    try {
      showLoading();
      const response = await axiosInstance(token).get("/api/buses/get-all-buses", {});
      hideLoading();
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      hideLoading();
      message.error(error.message);
    }
  }, []);

  const deleteBus = async (_id) => {
    try {
      showLoading();
      const response = await axiosInstance(token).delete(`/api/buses/${_id}`, {});

      hideLoading();
      if (response.data.success) {
        message.success(response.data.message);
        getBuses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      hideLoading();
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Bus Number",
      dataIndex: "busNumber",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        if (status === "Completed") {
          return <span className="text-red-500">{status}</span>;
        } else if (status === "running") {
          return <span className="text-yellow-500">{status}</span>;
        } else {
          return <span className="text-green-500">{status}</span>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (actions, record) => (
        <div className="flex gap-3">
          <i
            className="ri-delete-bin-line cursor-pointer text-red-500 text-xl"
            onClick={() => deleteBus(record._id)}
          ></i>

          <i
            className="ri-pencil-line cursor-pointer text-xl"
            onClick={() => {
              setSelectedBus(record);
              setIsAdd(false);
              setShowBusForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBuses();
  }, [getBuses]);

  return (
    <>
      <Helmet>
        <title>Buses</title>
      </Helmet>
      <div>
        <div className="flex justify-between p-7">
          <PageTitle title="Buses" />
          <button
            type="submit"
            className="relative inline-flex items-center justify-start
                px-10 py-3 overflow-hidden font-bold rounded-full
                group"
            onClick={() => setShowBusForm(true)}
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
              Add Bus
            </span>
            <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
          </button>
        </div>
        <div className="p-7">
          <Table
            columns={columns}
            dataSource={buses}
            pagination={{ pageSize: 7 }}
          />
          {showBusForm && (
            <BusForm
              showLoading={showLoading}
              hideLoading={hideLoading}
              token={token}
              showBusForm={showBusForm}
              setShowBusForm={setShowBusForm}
              isAdd={isAdd}
              selectedBus={selectedBus}
              setSelectedBus={setSelectedBus}
              getData={getBuses}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminBuses;
