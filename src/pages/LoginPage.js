import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../store/actions/appActions";
import { Form, Input, Button, Alert } from "antd";
import "antd/dist/antd.css";
import "../styles/LoginPage.css";
import { Login } from "../services/LoginService";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [showLoginError, setShowLoginError] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const formLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = (values) => {
    //change to promise on API CALL
    if (Login(values)) {
      setShowLoginError(false);
      dispatch(setLoggedUser(values.username));
      history.push("/users");
    } else {
      setShowLoginError(true);
      form.resetFields();
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div>
      <div className="App">
        <div className="login-box">
          <Form
            form={form}
            {...formLayout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {showLoginError && (
              <Alert
                className="login-error-message"
                message="Incorrect username or password!"
                type="error"
                showIcon
              />
            )}
            <Form.Item
              label="Usuario"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Ingrese su usuario!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Ingrese su contraseña!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit" size="large">
              Ingresar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
