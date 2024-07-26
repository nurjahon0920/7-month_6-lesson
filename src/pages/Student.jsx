import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import { Button, Input, Modal, Table, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Student = () => {
  const [items, setItems] = useState([]);
  const { register, control, handleSubmit, reset } = useForm();
  const [searchStudent, setSearchStudent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleSearchStudent = (e) => {
    setSearchStudent(e.target.value.toLowerCase());
  };

  const filteredData = items.filter((item) => {
    return (
      item.firstName.toLowerCase().includes(searchStudent) ||
      item.lastName.toLowerCase().includes(searchStudent) ||
      item.group.toLowerCase().includes(searchStudent)
    );
  });

  const onSubmit = (data) => {
    if (editItem) {
      axios
        .put(`http://localhost:3000/students/${editItem.id}`, data)
        .then((res) => {
          const updatedItems = items.map((item) =>
            item.id === editItem.id ? res.data : item
          );
          setItems(updatedItems);
          message.success("Student updated successfully");
          setEditItem(null);
        })
        .catch((error) => {
          console.error("There was an error updating the Student!", error);
          message.error("Failed to update Student");
        });
    } else {
      axios
        .post("http://localhost:3000/students", data)
        .then((res) => {
          setItems([...items, res.data]);
          message.success("Student added successfully");
        })
        .catch((error) => {
          console.error("There was an error adding the Student!", error);
          message.error("Failed to add Student");
        });
    }
    reset();
    setIsModalOpen(false);
  };

  const updateItem = (item) => {
    reset(item);
    setEditItem(item);
    setIsModalOpen(true);
  };

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:3000/students/${id}`)
      .then(() => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        message.success("Student deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the Student!", error);
        message.error("Failed to delete Student");
      });
  };

  const showModal = () => {
    reset();
    setEditItem(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="Update"
            onClick={() => updateItem(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            className="Delete"
            danger
            onClick={() => deleteItem(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ display: "flex" }} className="container">
      <Dashboard />
      <div
        style={{
          top: "100px",
          left: "400px",
          position: "absolute",
          flexDirection: "column",
          fontSize: "22px",
          gap: "15px",
          display: "flex",
        }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input.Search
            placeholder="Search"
            allowClear
            onChange={handleSearchStudent}
          />
          <Button onClick={showModal} type="primary">
            Add Student
          </Button>
        </div>
        <Table
          dataSource={filteredData}
          columns={columns}
          className="Table"></Table>
        <Modal
          title={editItem ? "Edit Student" : "Add Student"}
          open={isModalOpen}
          onOk={handleSubmit(onSubmit)}
          onCancel={handleCancel}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              paddingTop: "25px",
            }}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="First Name"
                  maxLength={20}
                  required
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Last Name"
                  maxLength={20}
                  required
                />
              )}
            />
            <Controller
              name="group"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="Group" maxLength={20} required />
              )}
            />
          </form>
          <DevTool control={control} />
        </Modal>
      </div>
    </div>
  );
};

export default Student;
