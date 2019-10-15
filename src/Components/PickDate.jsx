import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import moment from "moment"
export default function PickDate(props) {


    const weekDays = moment.weekdaysShort();

    const [date, setDate] = useState(new Date());
    let weeks = [];
    let week = [];
    loadDates();

    function loadDates() {

        const days = moment(date).daysInMonth();
        const firstDay = moment(date).startOf("month").format("d");
        weeks = [];
        week = [];

        for (let i = 0; i < firstDay; i++) {
            //Add an empty date for the days before the month begins
            week.push("");
        }
        for (let i = 1; i <= days; i++) {
            week.push(i);
            if (moment(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + i, "YYYY-MM-DD HH:mm:ss").format("dddd") === "Saturday") {
                weeks.push(week);
                week = [];
            }
            else if (i === days) {
                weeks.push(week);
            }
        }
    }





    //Function clears the clicked class from the clicked td element
    function clearClickedClass(e) {
        let element = document.getElementsByClassName("clicked");
        if (element[0] != undefined) {
            element[0].classList.remove("clicked");
        }
    }
    function change() {
        props.onChange(date);
    }
    function returnDates() {
        return (
            weeks.map(n => (
                <tr>
                    {
                        n.map((i, index) => (
                            <td style={index === 6 ? { color: "red" } : {}} className={i === "" ? "empty" : "day"} onClick={e => {
                                if (i !== "") {
                                    clearClickedClass(e);
                                    e.currentTarget.classList.add("clicked");
                                    date.setDate(i);
                                    change();
                                }

                            }}>{i}</td>
                        ))
                    }
                </tr>
            ))

        )
    }
    return (

        <div className="pickDate">
            <div id="dateHeader">
                <button onClick={() => {
                    clearClickedClass();
                    setDate(new Date(date.setMonth(date.getMonth() - 1)));
                }}> {"<"}  </button>
                <span id="month">{moment(date).format("MMMM")}</span>
                <span id="year">{moment(date).format("YYYY")}</span>
                <button onClick={() => {
                    clearClickedClass();
                    setDate(new Date(date.setMonth(date.getMonth() + 1)));
                }}>></button>
            </div>
            <table>
                <tbody>
                    <tr>
                        {weekDays.map(day => (
                            <th>{day}</th>
                        ))}
                    </tr>
                    {returnDates()}
                </tbody>
            </table>

        </div>
    )
}
