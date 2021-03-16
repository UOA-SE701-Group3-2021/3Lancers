// import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import * as ReactBootStrap from "react-bootstrap"

let times;
const JournalCalendar = () => {
    times = [
        {time: "12:00 AM", activity: ""},
        {time: "1:00 AM", activity: "Sleep"},
        {time: "2:00 AM", activity: ""},
        {time: "3:00 AM", activity: ""},
        {time: "4:00 AM", activity: ""},
        {time: "5:00 AM", activity: ""},
        {time: "6:00 AM", activity: "Wake up"},
        {time: "7:00 AM", activity: "Coffee"},
        {time: "8:00 AM", activity: "Assignment"},
        {time: "9:00 AM", activity: ""},
        {time: "10:00 AM", activity: "Food"},
        {time: "11:00 AM", activity: "Gym"},
    ]
    // eslint-disable-next-line no-shadow
    const renderTable = (times, index) => (
            <tr key={index}>
                <td>{times.time}</td>
                <td>{times.activity}</td>
            </tr>
        )
return(
        <div>
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                <tr>
                    <td>Time</td>
                    <td>Activity</td>
                </tr>
                </thead>
                <tbody>
                {times.map(renderTable)}
                </tbody>
            </ReactBootStrap.Table>
        </div>
);
}
export default JournalCalendar;
