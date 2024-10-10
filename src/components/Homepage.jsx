import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";

import { sleep } from "../utils/functions";

import { post, get } from "../api/api";

import { RiCalendarEventFill } from "react-icons/ri";

const Homepage = ({ setLoginUser, setToken, user }) => {
  const [reserves, setReserves] = useState([]);
  const date = new Date();
  const formatter = new Intl.ListFormat("ca-ES", {
    style: "long",
    type: "conjunction",
  });
  useEffect(() => {
    async function fetchData() {
      const response = await get("/reserve/reserves");
      setReserves(response);
    }
    fetchData();
  }, []);

  function remainingDays(reserveDate1) {
    let resDate = new Date(reserveDate1);
    let diferencia = resDate.getTime() - date.getTime();
    let diasRestantes = Math.ceil(diferencia / (1000 * 3600 * 24));

    return "Falten  " + diasRestantes + " dies";
  }

  function imageSelector(n) {
    switch (n) {
      case "1":
        return "https://firesvirtuals.cat/wp-content/uploads/2021/04/fotoINSTITUT-SA-PALOMERA-3-Robert-Ventura-scaled.jpg";
      case "2":
        return "https://firesvirtuals.cat/wp-content/uploads/2021/04/fotoINSTITUT-SA-PALOMERA-4-Robert-Ventura-scaled.jpg";
      case "3":
        return "";
      case "4":
        return "https://www.sapalomera.cat/wp-content/uploads/2022/11/20221026_170555_resized-300x225.jpg";
      default:
        break;
    }
  }
  return (
    <div className="ui container">
      <h2 className="ui header">Totes les reserves</h2>
      <div className="ui cards">
        {reserves
          .sort((a, b) => a.reserveDay - a.reserveDay)
          .map((reserve) => {
            return (
              <div
                key={reserve._id}
                className={`ui fluid ${
                  reserve.reserveClass === "1"
                    ? "blue"
                    : reserve.reserveClass === "2"
                    ? "red"
                    : reserve.reserveClass === "3"
                    ? "green"
                    : ""
                } card`}
              >
                <div className="content">
                  <div className="ui grid">
                    <div className="left floated five wide column">
                      <div className="ui header">
                        {" "}
                        <i className="ui icon building"></i>{" "}
                        {reserve.reserveName}
                      </div>{" "}
                    </div>
                    <div className="right floated five wide column ">
                      <div className="meta">{`${remainingDays(
                        reserve.reserveFullDate
                      )}`}</div>
                    </div>
                  </div>
                  <div className="ui divider"></div>
                  <div>
                    <div className="ui stackable center  two column grid">
                      <div className="middle aligned row">
                        <div className="column">
                          <div role="list" className="ui list">
                            <div role="listitem" className="item">
                              <i aria-hidden="true" className="user icon"></i>
                              <div className="content">
                                {reserve.reservePublicName}
                              </div>
                            </div>
                            <div role="listitem" className="item">
                              <i aria-hidden="true" className="marker icon"></i>
                              <div className="content">
                                Clase #{reserve.reserveClass}
                              </div>
                            </div>
                            <div role="listitem" className="item">
                              <i
                                aria-hidden="true"
                                className="calendar icon"
                              ></i>
                              <div className="content">
                                {`${reserve.reserveDay} de ${
                                  reserve.reserveMonth
                                } del ${date.getFullYear()} `}
                              </div>
                            </div>
                            <div role="listitem" className="item">
                              <i aria-hidden="true" className="clock icon"></i>
                              <div className="content">
                                {formatter.format(reserve.reserveHours)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="column">
                          <img
                            src={imageSelector(reserve.reserveClass)}
                            className="ui fluid rounded image"
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>{" "}
    </div>
  );
};

export default Homepage;
