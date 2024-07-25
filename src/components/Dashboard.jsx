import * as React from "react";
import { useState, useEffect } from "react";
import { Layout, Menu, Badge, Button, theme, ConfigProvider } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";

const [items, setItems] = useState([]);
const { Header, Sider } = Layout;

useEffect(() => {
  axios
    .get("http://localhost:3000/users")
    .then((res) => {
      setItems(res.data);
      console.log(data);
    })
    .catch((error) => {
      console.error("There was an error fetching the data!", error);
    });
}, []);
let count = items;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { defaultAlgorithm, defaultSeed } = theme;
  const { token } = defaultSeed;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    console.log(collapsed);
    console.log(setCollapsed);
  };

  return (
    <ConfigProvider theme={{ token, algorithm: defaultAlgorithm }}>
      <Layout style={{ minHeight: "97vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          width={240}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ paddingTop: "50px" }}>
            <React.Fragment>
              <Link to="/teacher" style={{ color: "#F5F5F5" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Teachers" />
                </ListItemButton>
              </Link>
              <Link to="/student" style={{ color: "#F5F5F5" }}>
                <ListItemButton>
                  <ListItemIcon>
                    <PeopleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Students" />
                </ListItemButton>
              </Link>
            </React.Fragment>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              backgroundColor: "#001529",
              padding: 0,
              display: "flex",
              justifyContent: "space-between",
              // maxWidth: "1679.6px",
              paddingRight: "50px",
              alignItems: "center",
            }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{
                fontSize: "16px",
                color: "white",
                width: 64,
                height: 64,
              }}
            />
            <Link to="/profile" style={{ paddingTop: "10px" }}>
              <Badge count={count}>
                <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
              </Badge>
            </Link>
          </Header>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Dashboard;
