import { Table } from "antd";
import React from "react";

const AntTable = () => {
  const students = [
    {
      name: "John Doe",
      age: 23,
      course: "React",
      key: 1,
    },
    {
      name: "Tom Smith",
      age: 25,
      course: "Angular",
      key: 2,
    },
    {
      name: "John Doe",
      age: 24,
      course: "Vue",
      key: 3,
    },
  ];

  const newStudents = students.map((student, index) => ({
    ...student,
    index: index + 1,
  }));

  console.log(newStudents);

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
  ];

  return (
    <div style={{ width: "50%" }}>
      <Table dataSource={students} columns={columns}></Table>
    </div>
  );
};

export default AntTable;
