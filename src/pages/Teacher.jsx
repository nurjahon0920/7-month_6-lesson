import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import { Button, Flex, Input, Modal, Table, message } from "antd";

const Teacher = () => {
  const [items, setItems] = useState([]);
  const [searchTeacher, setSearchTeacher] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [level, setLevel] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/teachers")
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

  const handleSearchTeacher = (e) => {
    setSearchTeacher(e.target.value.toLowerCase());
  };

  const filteredData = items.filter((item) => {
    return (
      item.firstName.toLowerCase().includes(searchTeacher) ||
      item.lastName.toLowerCase().includes(searchTeacher) ||
      item.level.toLowerCase().includes(searchTeacher)
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && level) {
      if (editItem) {
        axios
          .put(`http://localhost:3000/teachers/${editItem.id}`, {
            firstName,
            lastName,
            level,
          })
          .then((res) => {
            const updatedItems = paginatedTeachers.map((item) =>
              item.id === editItem.id ? res.data : item
            );
            setItems(updatedItems);
            message.success("Teacher updated successfully");
            setEditItem(null);
          })
          .catch((error) => {
            console.error("There was an error updating the teacher!", error);
            message.error("Failed to update teacher");
          });
      } else {
        axios
          .post("http://localhost:3000/teachers", {
            firstName,
            lastName,
            level,
          })
          .then((res) => {
            setItems([...items, res.data]);
            message.success("Teacher added successfully");
          })
          .catch((error) => {
            console.error("There was an error adding the teacher!", error);
            message.error("Failed to add teacher");
          });
      }
      setFirstName("");
      setLastName("");
      setLevel("");
      setIsModalOpen(false);
    } else {
      message.error("All fields are required");
    }
  };

  const updateItem = (item) => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setLevel(item.level);
    setEditItem(item);
    setIsModalOpen(true);
  };

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:3000/teachers/${id}`)
      .then(() => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        message.success("Teacher deleted successfully");
      })
      .catch((error) => {
        console.error("There was an error deleting the teacher!", error);
        message.error("Failed to delete teacher");
      });
  };

  const showModal = () => {
    setFirstName("");
    setLastName("");
    setLevel("");
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
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
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
          fontSize: "22px",
          gap: "15px",
        }}>
        <Flex style={{ gap: "10px" }}>
          <Input.Search
            placeholder="Search"
            allowClear
            onChange={handleSearchTeacher}
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
          title={editItem ? "Edit Teacher" : "Add Teacher"}
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
              name="level"
              placeholder="Level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            />
          </form>
        </Modal>
      </Flex>
    </div>
  );
};

export default Teacher;
