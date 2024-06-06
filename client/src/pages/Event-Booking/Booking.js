import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space } from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedBooking, setEditedBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings");
        console.log(response.data); //check
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  const showEditModal = (booking) => {
    setIsEditModalVisible(true);
    setEditedBooking(booking);
    form.setFieldsValue({
      ...booking,
      eventId: booking.eventId ? booking.eventId.title : "",
    });
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setEditedBooking(null);
    form.resetFields();
  };

//   const handleEdit = async (values) => {
//     try {
//       setLoading(true);
      
//       const response = await axios.put(
//         `http://localhost:5000/api/bookings/${editedBooking._id}`,
//         values
//       );
//       setLoading(false);

//       const updatedBooking = response.data;
//       message.success("Booking updated successfully!");
//       const updatedBookings = bookings.map((booking) =>
//         booking._id === updatedBooking._id ? updatedBooking : booking
//       );
//       setBookings(updatedBookings);
//       setIsEditModalVisible(false);
//       form.resetFields();
//     } catch (error) {
//       console.error("Error editing booking:", error);
//       setLoading(false);
//       message.error("Failed to edit booking. Please try again later.");
//     }
//   };

  const deleteBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      message.success("Booking deleted successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
      message.error("Failed to delete booking. Please try again later.");
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Count",
      dataIndex: "persons",
      key: "persons",
    },
    {
      title: "Event Name",
      dataIndex: ["eventId", "title"], // Assuming eventId is populated and includes the event title
      key: "eventId",
    },
    {
      title: "Booked Date",
      dataIndex: "bookedAt",
      key: "bookedAt",
      render: (text) => new Date(text).toLocaleString(), // Format the date
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          /> */}
          <Popconfirm
            title="Are you sure to delete this booking?"
            onConfirm={() => deleteBooking(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={bookings} rowKey="_id" />

      {/* <Modal
        title="Edit Booking"
        open={isEditModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleEdit}
          autoComplete="off"
        >
          <Form.Item
            label="User Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile No."
            name="mobile"
            rules={[{ required: true, message: "Please input the mobile number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User Email"
            name="email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User Count"
            name="persons"
            rules={[{ required: true, message: "Please input the user count!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Event Name"
            name="eventId"
            rules={[{ required: false, message: "Please select the event!" }]}
          >
            <Input disabled value={editedBooking ? editedBooking.eventId.title : ""} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};

export default Booking;
