import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import { Table, Modal, Tooltip, Input, Form, Button, DatePicker } from "antd";
import usersData from "../data/UsersData";
import { setUserList, setUserToLocate } from "../store/actions/appActions";
import { Edit, Delete } from "../services/UserService";
import moment from "moment";
import UsersAccessGraph from "./UsersAccessGraph";
import _ from "lodash";

export default function UsersTable() {
  const dispatch = useDispatch();
  let userList = useSelector((state) => state.app.userList);
  let showMap = useSelector((state) => state.app.showMap);

  const [filteredUserList, setFilteredUserList] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isGraphicModalVisible, setIsGraphicModalVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToDraw, setUserToDraw] = useState(null);

  const [form] = Form.useForm();

  //TABLE STRUCTURE
  const data = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
      sorter: (a, b) => {
        return a.lastname.localeCompare(b.lastname);
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => {
        return a.email.localeCompare(b.email);
      },
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      sorter: (a, b) => {
        return a.dni.localeCompare(b.dni);
      },
    },

    {
      title: "Fecha de alta",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => {
        if (
          moment(a.date, "DD/MM/YYYY").isBefore(moment(b.date, "DD/MM/YYYY"))
        ) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "Domicilio",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => {
        return a.address.localeCompare(b.address);
      },
    },
    {
      title: "Acciones",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Editar">
            <EditOutlined
              onClick={() => {
                openEditModal(record);
              }}
            />
          </Tooltip>

          <Tooltip title="Borrar">
            <DeleteOutlined
              onClick={() => {
                openDeleteModal(record);
              }}
            />
          </Tooltip>

          <Tooltip title="Acceso semanal">
            <AreaChartOutlined
              onClick={() => {
                openGraphicModal(record);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(setUserList(usersData));
    setFilteredUserList(usersData);
  }, [dispatch]);

  useEffect(() => {
    if (userToEdit) {
      form.setFieldsValue({
        name: userToEdit.name,
        lastname: userToEdit.lastname,
        email: userToEdit.email,
        dni: userToEdit.dni,
        address: userToEdit.address,
        date: moment(userToEdit.date, "DD/MM/YYYY"),
      });
      setIsEditModalVisible(true);
    }
  }, [userToEdit, form]);

  useEffect(() => {
    setIsDeleteModalVisible(true);
  }, [userToDelete]);

  useEffect(() => {
    setIsGraphicModalVisible(true);
  }, [userToDraw]);

  const openEditModal = (user) => {
    setUserToEdit(user);
  };

  const onFinishEditing = (values) => {
    values.key = userToEdit.key;
    values.location = userToEdit.location;
    let newList = Edit(userList, values);
    const editedUserList = [...newList];
    dispatch(setUserList(newList));
    setFilteredUserList(editedUserList);
    handleEditCancel();
    updateMap(values);
  };

  const handleEditCancel = () => {
    setUserToEdit(null);
    setIsEditModalVisible(false);
  };

  const onFinishEditingFailed = (errorInfo) => {};

  const openDeleteModal = (user) => {
    setUserToDelete(user);
  };

  const handleDelete = () => {
    let newList = Delete(userList, userToDelete.key);
    const editedUserList = [...newList];
    dispatch(setUserList(newList));
    setFilteredUserList(editedUserList);
    handleDeleteCancel();
  };

  const handleDeleteCancel = () => {
    setUserToDelete(null);
    setIsDeleteModalVisible(false);
    updateMap();
  };

  const updateMap = (userData = {}) => {
    if (userList.length > 0) {
      let user = _.isEmpty(userData) ? userList[0] : userData;
      dispatch(
        setUserToLocate({
          lat: user.location.lat,
          lng: user.location.lng,
        })
      );
    } else {
      dispatch(
        setUserToLocate({
          lat: -32.210442,
          lng: -64.338899,
        })
      );
    }
  };

  const openGraphicModal = (user) => {
    setUserToDraw(user);
  };

  const handleGraphicCancel = () => {
    setUserToDraw(null);
    setIsGraphicModalVisible(false);
  };

  const search = (value) => {
    setFilteredUserList(userList);
    const filterTable = userList.filter((o) => {
      return Object.keys(o).some((k) => {
        return String(o[k]).toLowerCase().includes(value.toLowerCase());
      });
    });
    setFilteredUserList(filterTable);
  };

  const onRowClicked = (user) => {
    if (showMap) {
      dispatch(
        setUserToLocate({
          lat: user.location.lat,
          lng: user.location.lng,
        })
      );
    }
  };

  return (
    <div className="table-area">
      {userToDraw && (
        <Modal
          width={"45%"}
          visible={isGraphicModalVisible}
          title="Últimos accesos"
          onOk={handleGraphicCancel}
          onCancel={handleGraphicCancel}
          footer={[
            <Button key="back" onClick={handleGraphicCancel}>
              Cerrar
            </Button>,
          ]}
        >
          <UsersAccessGraph user={userToDraw} />
        </Modal>
      )}
      {userToDelete && (
        <Modal
          visible={isDeleteModalVisible}
          title="Borrar"
          onOk={handleDelete}
          onCancel={handleDeleteCancel}
          footer={[
            <Button key="back" onClick={handleDeleteCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={handleDelete}>
              Borrar
            </Button>,
          ]}
        >
          <p>
            Se eliminará a {userToDelete.name} {userToDelete.lastname} de la
            tabla
          </p>
        </Modal>
      )}
      {userToEdit && (
        <Modal
          title="Editar"
          visible={isEditModalVisible}
          onOk={form.submit}
          onCancel={handleEditCancel}
          destroyOnClose={true}
          forceRender={true}
          footer={[
            <Button key="back" onClick={handleEditCancel}>
              Cancelar
            </Button>,
            <Button
              key="submit"
              form="form"
              htmlType="submit"
              type="primary"
              onClick={form.submit}
            >
              Guardar
            </Button>,
          ]}
        >
          <Form
            form={form}
            name="basic"
            onFinish={onFinishEditing}
            onFinishFailed={onFinishEditingFailed}
            preserve={false}
          >
            <Form.Item
              shouldUpdate
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su nombre!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Apellido"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su apellido!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Por favor ingrese su email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="DNI"
              name="dni"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su dni!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Fecha de alta"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su fecha de alta!",
                },
              ]}
            >
              <DatePicker format={["DD/MM/YYYY", "DD/MM/YY"]} />
            </Form.Item>
            <Form.Item
              label="Domicilio"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su domicilio",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}

      <Input.Search
        style={{ border: "1px solid darkgrey", margin: "0 0 10px 0" }}
        placeholder="Buscar..."
        enterButton
        onSearch={(v) => search(v)}
      />
      <Table
        dataSource={filteredUserList}
        columns={data}
        onRow={(record) => ({
          onClick: () => {
            onRowClicked(record);
          },
        })}
      />
    </div>
  );
}
