import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate } from "react-router-dom";
import { post, get } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sleep } from "../utils/functions";

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  let element = document.getElementById("log");

  const handlePost = async (e) => {
    e.preventDefault();
    if (user.name && user.password) {
      const response = await post("/auth/login", user);
      if (response.user) {
        localStorage.setItem("token", response.token);
        toast.info(response.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        element.classList.add("disabled");
        sleep(3000).then(() => {
          setLoginUser(response.user);
          navigate("/");
          element.classList.remove("disabled");
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      toast.error("Omple tots els camps", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "0",
      }}
    >
      <ToastContainer />
      <form
        className="ui form"
        style={{
          padding: "10px",
          border: "2px solid #999999",
          borderRadius: "10px",
          margin: "0",
        }}
      >
        <div className="field">
          <label>Nom</label>
          <input
            placeholder="Nom"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Contrasenya</label>
          <input
            placeholder="Contrasenya"
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
          />
        </div>
        <button
          className="ui button fluid primary"
          id="log"
          type="submit"
          onClick={handlePost}
        >
          Iniciar sessió
        </button>
      </form>
    </div>
  );
};

export default Login;
