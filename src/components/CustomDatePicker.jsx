import React, { useState, useCallback } from "react";
import "semantic-ui-css/semantic.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sleep } from "../utils/functions";
import { post } from "../api/api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ca from "date-fns/locale/ca";

const CustomDatePicker = ({
  setReserveDay = "",
  setReserveMonth = "",
  setReserveFullDate = "",
}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = useCallback(
    (date) => {
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        setSelectedDate(date);
        if (date) {
          let reserveDate = new Intl.DateTimeFormat("ca-ES", {
            calendar: "gregory",
            numberingSystem: "latn",
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(date);
          let splitedDate = reserveDate.split(" ");
          setReserveDay(splitedDate[0]);
          setReserveMonth(splitedDate[2]);
          setReserveFullDate(date);
        }
      } else {
        toast.warn("Nombre dies laborals", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    [setReserveDay, setReserveMonth, setReserveFullDate]
  );

  return (
    <div className="ui stackable center aligned two column grid">
      <div className="middle aligned row">
        <div className="column">
          <input
            type="text"
            value={
              selectedDate
                ? new Intl.DateTimeFormat("ca-ES", {
                    calendar: "gregory",
                    numberingSystem: "latn",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(selectedDate)
                : ""
            }
            onClick={() => {}}
            readOnly
            style={{ cursor: "pointer" }}
            placeholder="Selecciona una fecha y hora"
          />
        </div>
        <div className="column">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            maxDate={new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000)}
            placeholderText="Selecciona una fecha y hora"
            locale={ca}
            inline
            shouldCloseOnSelect={false}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomDatePicker;
