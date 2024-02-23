import React, { useState, useEffect } from "react";
import { Modal, Row, Form, Col, message } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";

function BusForm({
  token,
  showLoading,
  hideLoading,
  showBusForm,
  setShowBusForm,
  isAdd,
  getData,
  selectedBus,
  setSelectedBus,
}) {
  const [cities, setCities] = useState([]);

  const onFinish = async (values) => {
    try {
      showLoading();
      let response = null;
      if (isAdd) {
        response = await axiosInstance(token).post("/api/buses/add-bus", values);
      } else {
        console.log("isAdd is", isAdd)
        response = await axiosInstance(token).put(
          `/api/buses/${selectedBus._id}`,
          values
        );
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowBusForm(false);
      setSelectedBus(null);
      hideLoading();
    } catch (error) {
      message.error(error.message);
      hideLoading();
    }
  };

  useEffect(() => {
    axiosInstance(token).get("/api/cities/get-all-cities").then((response) => {
      setCities(response.data.data);
    });
  }, []);

  return (
    <Modal
      width={800}
      title={isAdd ? "Add Bus" : "Update Bus"}
      visible={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item
              label="Bus Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter bus name",
                },
              ]}
            >
              <input
                type="text"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Bus Number"
              name="busNumber"
              rules={[
                {
                  required: true,
                  message: "Please input bus number!",
                },
              ]}
            >
              <input
                type="text"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Capacity"
              name="capacity"
              rules={[
                {
                  required: true,
                  message: "Please input bus capacity!",
                },
              ]}
            >
              <input
                type="number"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="From"
              name="from"
              rules={[
                {
                  required: true,
                  message: "Please Choose an option",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <select className="block border border-blue-500 w-full p-3 rounded-lg mb-4">
                <option value="">From</option>
                {cities.map((data, index) => {
                  return (
                    <option key={index} value={data.ville}>
                      {data.ville}
                    </option>
                  );
                })}
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="To"
              name="to"
              rules={[
                {
                  required: true,
                  message: "Please Choose an option",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <select className="block border border-blue-500 w-full p-3 rounded-lg mb-4">
                <option value="">To</option>
                {cities.map((data, index) => {
                  return (
                    <option key={index} value={data.ville}>
                      {data.ville}
                    </option>
                  );
                })}
              </select>
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item
              label="Journey Date"
              name="journeyDate"
              rules={[
                {
                  required: true,
                  message: "Please input journey date!",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <input
                min={new Date().toISOString().split("T")[0]}
                type="date"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item
              label="Departure"
              name="departure"
              rules={[
                {
                  required: true,
                  message: "Please input departure time!",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <input
                type="time"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item
              label="Arrival"
              name="arrival"
              rules={[
                {
                  required: true,
                  message: "Please input arrival time!",
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <input
                type="time"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input price!",
                },
              ]}
            >
              <input
                type="number"
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  validateTrigger: "onSubmit",
                },
              ]}
            >
              <select
                className="block border border-blue-500 w-full p-3 rounded-lg mb-4"
                name="status"
                id="status"
                // selected="Yet to start"
              >
                <option value="" selected disabled>Select a Value</option>
                <option value="Yet to start">Yet To Start</option>
                <option value="Running">Running</option>
                <option value="Completed">
                  Completed
                </option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <button
            type="submit"
            className="relative inline-flex items-center justify-start
                px-10 py-3 overflow-hidden font-bold rounded-full
                group"
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-blue-600 opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
              Save
            </span>
            <span className="absolute inset-0 border-2 border-blue-600 rounded-full"></span>
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default BusForm;
