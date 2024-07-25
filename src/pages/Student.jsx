import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import { Button, Flex, Input, Modal, Table, message } from "antd";

const Student = () => {
  const [items, setItems] = useState([]);
  const [searchStudent, setSearchStudent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [group, setGroup] = useState("");
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

  const [Teacher, setTeacher] = useState(items);

  const limit = 2;
  const page = 1;

  const firstIndex = limit * (page + 1);
  const lastIndex = limit * page;
  const paginatedTeachers = Teacher.slice(firstIndex, lastIndex);
  const pageCount = Math.ceil(paginatedTeachers.length / limit);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && group) {
      if (editItem) {
        axios
          .put(`http://localhost:3000/students/${editItem.id}`, {
            firstName,
            lastName,
            group,
          })
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
          .post("http://localhost:3000/students", {
            firstName,
            lastName,
            group,
          })
          .then((res) => {
            setItems([...items, res.data]);
            message.success("Student added successfully");
          })
          .catch((error) => {
            console.error("There was an error adding the Student!", error);
            message.error("Failed to add Student");
          });
      }
      setFirstName("");
      setLastName("");
      setGroup("");
      setIsModalOpen(false);
    } else {
      message.error("All fields are required");
    }
  };

  const updateItem = (item) => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setGroup(item.group);
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
    setFirstName("");
    setLastName("");
    setGroup("");
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
      <Flex
        vertical
        style={{
          top: "100px",
          left: "400px",
          position: "absolute",
          flexDirection: "column",
          fontSize: "22px",
          gap: "15px",
        }}>
        <Flex style={{ gap: "10px" }}>
          <Input.Search
            placeholder="Search"
            allowClear
            onChange={handleSearchStudent}
          />
          <Button onClick={showModal} type="primary">
            Add Item
          </Button>
        </Flex>
        <Table
          dataSource={filteredData}
          columns={columns}
          className="Table"></Table>
        <Modal
          title={editItem ? "Edit Student" : "Add Student"}
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={handleCancel}>
          <form onSubmit={handleSubmit}>
            <Input
              showCount
              maxLength={20}
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              showCount
              maxLength={20}
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Input
              showCount
              maxLength={20}
              type="text"
              name="group"
              placeholder="Group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              required
            />
          </form>
        </Modal>
      </Flex>
    </div>
  );
};

export default Student;
