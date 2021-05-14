import React, { useState, useEffect } from "react";

import axios from "axios";

import "components/Application.scss";
import DayList from 'components/DayList';
import "components/Appointment"
import Appointment from "components/Appointment";
import {getAppointmentsForDay} from "helpers/selectors.js";
import {getInterview} from "helpers/selectors.js";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const appointments = getAppointmentsForDay(state, state.day);
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    axios.get('http://localhost:8001/api/days').then(response => {
      Promise.all([
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('http://localhost:8001/api/interviewers'),
      ]).then((all) => {
        // console.log("all[0]---------------------", all[0]); // first
        // console.log("all[1]----------!!!!!!!!!", all[1]); // second
        // const [first, second] = all;
        // console.log("promises.all", all);
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
    });
  }, []);

  // console.log("state.interviewers------********--------->>>>>", state.interviewers)

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });
  return (
    <main className="layout">
        <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
