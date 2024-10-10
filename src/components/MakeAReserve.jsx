import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sleep } from "../utils/functions";
import { post } from "../api/api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ca from "date-fns/locale/ca";

import {
  FormField,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  Dropdown,
} from "semantic-ui-react";
import CustomDatePicker from "./CustomDatePicker";

const MakeAReserve = ({ user }) => {
  const [boolReserve, setBoolreserve] = useState(false);
  const [existing, setexisting] = useState({});
  const [buttonState, setButtonState] = useState({});
  const [reserveName, setReserveName] = useState("");
  const [reserveHours, setReserveHours] = useState([]);
  const [reserveClass, setReserveClass] = useState("");
  const [reserveMonth, setReserveMonth] = useState("");
  const [reserveDay, setReserveDay] = useState("");
  const [reserveOwnerId, setReserveOwnerId] = useState(user.id);
  const [reservePublicName, setReservePublicName] = useState(user.name);
  const [reserveFullDate, setReserveFullDate] = useState("");

  const [checkbox, setCheckbox] = useState(false);

  const date = new Date();
  const formatter = new Intl.ListFormat("ca-ES", {
    style: "long",
    type: "conjunction",
  });
  let formatedDate = new Intl.DateTimeFormat("ca-ES", {
    calendar: "gregory",
    numberingSystem: "latn",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(date)
    .toString();

  const dayInt = date.getDate();
  const lastDay = dayInt + 14;

  async function handleCheckbox() {
    setCheckbox(!checkbox);
    if (checkbox) {
      setReservePublicName("Anònim");
    } else {
      setReservePublicName(await user.name);
    }
  }

  function handleHour(e) {
    const buttonId = e.target.id;
    setReserveHours((prevHour) => {
      const updatedHour = [...prevHour];
      const index = updatedHour.indexOf(buttonId);
      if (index === -1) {
        updatedHour.push(buttonId);
        setButtonState((prevState) => ({ ...prevState, [buttonId]: true }));
      } else {
        updatedHour.splice(index, 1);
        setButtonState((prevState) => ({ ...prevState, [buttonId]: false }));
      }
      return updatedHour;
    });
  }

  async function handlePost() {
    if (
      reserveHours.length > 1 &&
      reserveClass.length > 0 &&
      reserveName.length > 0
    ) {
      const completeReserveDate = new Date(reserveFullDate).setHours(
        reserveHours[0].charAt(0)
      );
      setReserveFullDate(completeReserveDate);
      const bodyResponse = {
        reserveHours: reserveHours,
        reserveClass: reserveClass,
        reserveDay: reserveDay,
        reserveMonth: reserveMonth,
        reserveOwnerId: await reserveOwnerId,
        reserveName: reserveName,
        reservePublicName: reservePublicName,
        reserveFullDate: reserveFullDate,
      };
      const response = await post("/reserve/new", bodyResponse);
      if (response.error) {
        setBoolreserve(true);
        setexisting(response.reserve);
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.info(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      toast.warn("Emplena tots els camps", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <div className="ui container">
      <ToastContainer />
      {boolReserve ? (
        <div className="ui message error">
          <div className="ui header">
            Ja hi ha una reserva activa amb aquestes dades:
          </div>
          <hr className="ui divider" />
          <table className="ui single line table">
            <thead></thead>
            <tbody>
              <tr>
                <td>Nom</td>
                <td>{existing.reserveName}</td>
              </tr>
              <tr>
                <td>Dia</td>
                <td>
                  {existing.reserveDay} de {existing.reserveMonth}
                </td>
              </tr>
              <tr>
                <td>Hores de reserva</td>
                <td>{formatter.format(existing.reserveHours)}</td>
              </tr>
              <tr>
                <td>Clase</td>
                <td>{existing.reserveClass}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      <div className="ui breadcrumb">
        <Link to="/" className="section">
          Inici
        </Link>
        <div className="divider">/</div>
        <div className="active section">Una nova reserva</div>
      </div>
      <h2 className="ui header">Realitza una nova reserva</h2>
      <div className="ui form">
        <div className="ui message field">
          <label>Name</label>
          <input
            type="text"
            value={reserveName}
            onChange={(e) => setReserveName(e.target.value)}
          />
        </div>
        <div className="ui message field">
          <label>Hora</label>
          <div>
            {[...Array(20)].map((_, index) => {
              const time = `${8 + Math.floor(index / 2)}:${
                index % 2 === 0 ? "00" : "30"
              }`;
              return (
                <button
                  key={time}
                  onClick={handleHour}
                  id={time}
                  className={`ui compact large button ${
                    buttonState[time] ? "green" : ""
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
        <div className="ui message field">
          <label>Classe</label>
          <Dropdown id="clase" button fluid text={"Classe " + reserveClass}>
            <DropdownMenu>
              {[1, 2, 3, 4].map((num) => (
                <DropdownItem
                  key={num}
                  text={`Clase ${num}`}
                  onClick={() => setReserveClass(num.toString())}
                />
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="ui message field">
          <div className="ui message yellow">
            <p>
              Només es poden fer reserves amb un màxim de 2 setmanes d'antelació
            </p>
            <p>Data actual: {formatedDate}</p>
          </div>
          <label>Day</label>
          <CustomDatePicker
            setReserveDay={setReserveDay}
            setReserveMonth={setReserveMonth}
            setReserveFullDate={setReserveFullDate}
          />
        </div>
        <form className="ui checkbox" onClick={handleCheckbox}>
          <input type="checkbox" checked={checkbox} />
          <label>Fes anònima la meva reserva</label>
        </form>{" "}
        <br /> <br />
        <div className="ui button green" onClick={handlePost}>
          Crear reserva
        </div>{" "}
        <br /> <br />
      </div>
    </div>
  );
};

export default MakeAReserve;
