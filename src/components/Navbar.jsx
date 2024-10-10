import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  RiUserShared2Fill,
  RiAddBoxFill,
  RiSettings4Fill,
  RiPassValidFill,
} from "react-icons/ri";
import { sleep } from "../utils/functions";
import {
  DropdownMenu,
  DropdownItem,
  MenuMenu,
  MenuItem,
  Button,
  Dropdown,
  Menu,
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Header,
  Image,
  Modal,
  FormField,
  Checkbox,
  Form,
} from "semantic-ui-react";
import { post } from "../api/api";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

const Navbar = ({ setLoginUser, setToken, user }) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [password, setPassword] = useState({
    id: user._id,
    password: "",
    newpassword: "",
    reenter: "",
  });

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,  
      [name]: value,
    });
    console.log(password);
  };
  const handleLogout = () => {
    toast.loading("Tancant sessió", {
      position: "top-right",
      autoClose: 2000,
      draggable: true,
    });
    sleep(3000).then(() => {
      setToken("");
      localStorage.removeItem("token");
      setLoginUser({});
    });
  };
  const changeThePassword = async () => {
    const response = await post("/user/change", password);
    toast.info(response.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  return (
    <div
      className="ui large  menu icon"
      style={{
        width: "100%",
        height: "auto",
        flexWrap: "wrap",
      }}
    >
      <ToastContainer />
      <Link to="/" className="item">
        Totes les reserves
      </Link>
      <div className="right menu">
        <Dropdown
          icon={
            <i className="icon">
              <RiSettings4Fill />
            </i>
          }
          item
          text="Opcions &nbsp;"
        >
          <DropdownMenu>
            <DropdownItem>
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                  <div className="ui icon button fluid">
                    <i className="icon">
                      <RiPassValidFill />
                    </i>
                    &nbsp; Canviar la contrasenya
                  </div>
                }
              >
                <ModalHeader>Canviar la contrasenya</ModalHeader>
                <ModalContent>
                  {" "}
                  <Form>
                    <FormField>
                      <label>Contrasenya actual</label>
                      <input
                        placeholder="Contrasenya actual"
                        name="password"
                        value={password.password}
                        onChange={handleChangePassword}
                      />
                    </FormField>
                    <FormField>
                      <label>Nova contrasenya</label>
                      <input
                        placeholder="Nova contrasenya"
                        name="newpassword"
                        value={password.newpassword}
                        onChange={handleChangePassword}
                      />{" "}
                    </FormField>
                    <FormField>
                      <label>Repeteix la contrasenya</label>
                      <input
                        placeholder="Repeteix la contrasenya"
                        name="reenter"
                        value={password.reenter}
                        onChange={handleChangePassword}
                      />{" "}
                    </FormField>
                    <Button type="submit" onClick={changeThePassword} positive>
                      Confirmar
                    </Button>
                  </Form>
                </ModalContent>
                <ModalActions>
                  <Button
                    content="Acceptar"
                    onClick={() => setOpen(false)}
                    secondary
                  />
                </ModalActions>
              </Modal>
            </DropdownItem>
            <DropdownItem>
              <div
                className="ui negative icon button fluid"
                onClick={handleLogout}
              >
                <i className="icon">
                  <RiUserShared2Fill />
                </i>
                &nbsp; Tancar sessió
              </div>
            </DropdownItem>{" "}
          </DropdownMenu>
        </Dropdown>

        <div className="item">
          <Link to="/nova-reserva">
            <div className="ui positive icon button fluid">
              <i className="icon">
                <RiAddBoxFill />
              </i>
              &nbsp; Nova reserva
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
