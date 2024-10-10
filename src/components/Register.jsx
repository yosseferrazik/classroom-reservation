import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate } from "react-router-dom";
import { post } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlePost = async () => {
    const { name, email, password, reEnterPassword } = user;

    if (!name || !email || !password || !reEnterPassword) {
      toast.error("Per favor, completa tots els camps", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (password.length < 5 || reEnterPassword.length < 5) {
      toast.error("La contrasenya ha de tenir com a mínim 5 caràcters", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (password !== reEnterPassword) {
      toast.error("Les contrasenyes no coincideixen", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const response = await post("/auth/register", user);

    toast.info(response.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setUser({
      name: "",
      email: "",
      password: "",
      reEnterPassword: "",
    });

    navigate("/");
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
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className="field">
          <label>Contrasenya</label>
          <input
            placeholder="Contrasenya"
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
          />
          <label>Tornar a escriure la contrasenya</label>
          <input
            placeholder="Tornar a escriure la contrasenya"
            name="reEnterPassword"
            value={user.reEnterPassword}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div
          className="ui button fluid secondary"
          type="submit"
          onClick={handlePost}
        >
          Registrat
        </div>
      </form>
    </div>
  );
};

export default Register;
