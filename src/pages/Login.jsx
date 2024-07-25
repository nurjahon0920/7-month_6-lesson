import { useState, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import "./style.css";
import {} from "@mui/material";
// import { SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Space } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { css } from "@emotion/css";
import { LoginOutlined } from "@mui/icons-material";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(
        .${rootPrefixCls}-btn-dangerous
      ) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;

  return (
    <div className="container py-5">
      <form onSubmit={loginHandleSubmit} className="login_form">
        <Input
          size="large"
          label="Username"
          type="text"
          placeholder="admin"
          allowClear
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password
          size="large"
          label="Password"
          type="password"
          placeholder="1111"
          // allowClear
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ConfigProvider
          button={{
            className: linearGradientButton,
          }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<LoginOutlined />}>
              Login
            </Button>
          </Space>
        </ConfigProvider>
      </form>
    </div>
  );
};

export default Login;
