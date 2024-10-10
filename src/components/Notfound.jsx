import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
export const Notfound = () => {
  const navigate = useNavigate();
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
      <div className="ui icon message" style={{ width: "auto" }}>
        <i aria-hidden="true" className="icon">
          <TbError404 />
        </i>
        <div className="content">
          <div className="header">Ooops!</div>
          <p>La pàgina que intentes sol·licitar no és al servidor</p>
          <div
            className="ui button secondary mini"
            onClick={() => navigate("/")}
          >
            Tornar
          </div>
        </div>
      </div>
    </div>
  );
};
